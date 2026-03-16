import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { codeSubmissions, diffLines, roastResults } from "@/db/schema";
import { openai } from "@/lib/openai";
import { publicProcedure, router } from "../index";

const roastModeSchema = z.enum(["subtle", "full_roast"]);

const languageSchema = z.enum([
	"javascript",
	"typescript",
	"python",
	"rust",
	"go",
	"java",
	"csharp",
	"cpp",
	"c",
	"ruby",
	"php",
	"swift",
	"kotlin",
	"sql",
	"html",
	"css",
	"json",
	"yaml",
	"markdown",
	"bash",
	"shell",
	"other",
]);

const createRoastSchema = z.object({
	code: z.string().min(1).max(10000),
	language: languageSchema,
	roastMode: roastModeSchema,
});

export const roastRouter = router({
	create: publicProcedure
		.input(createRoastSchema)
		.mutation(async ({ input }) => {
			const { code, language, roastMode } = input;

			const codePreview = code.split("\n").slice(0, 10).join("\n");

			const [submission] = await db
				.insert(codeSubmissions)
				.values({
					code,
					codePreview,
					language,
				})
				.returning();

			const isFullRoast = roastMode === "full_roast";

			const systemPrompt = isFullRoast
				? `You are a brutally honest, sarcastic code reviewer. Your goal is to roast the user's code as harshly as possible while still being technically accurate. Use humor, sarcasm, and memes. Be mean but fair. Give a score from 1-10 where 1 is absolutely terrible and 10 is still not good enough. Always find something to criticize.`
				: `You are a constructive code reviewer. Provide helpful, gentle feedback that points out issues without being overly harsh. Suggest improvements in a friendly way. Give a score from 1-10 where 1 needs work and 10 is good.`;

			const userPrompt = `Please review this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\`\n\nRespond with a JSON object containing:\n- "score": a number from 1-10\n- "roastText": your review/roast (2-4 sentences)\n- "issues": an array of issues found, each with "line" (line number or null), "severity" ("low", "medium", "high"), "description": what the issue is, and "suggestion" (how to fix it)\n- "improvements": an array of suggested code improvements, each with "originalCode", "suggestedCode", and "explanation"\n\nRespond ONLY with valid JSON, no other text.`;

			const completion = await openai.chat.completions.create({
				model: "gpt-4o-mini",
				messages: [
					{ role: "system", content: systemPrompt },
					{ role: "user", content: userPrompt },
				],
				response_format: { type: "json_object" },
			});

			const responseText = completion.choices[0]?.message?.content;
			if (!responseText) {
				throw new Error("Failed to get roast response");
			}

			const parsed = JSON.parse(responseText);

			const [roastResult] = await db
				.insert(roastResults)
				.values({
					submissionId: submission.id,
					roastMode,
					score: parsed.score,
					roastText: parsed.roastText,
					issues: parsed.issues || [],
				})
				.returning();

			if (parsed.improvements && parsed.improvements.length > 0) {
				const diffLinesData = parsed.improvements.map(
					(improvement: {
						originalCode: string;
						suggestedCode: string;
						explanation: string;
					}) => ({
						roastResultId: roastResult.id,
						lineNumber: 0,
						originalCode: improvement.originalCode,
						suggestedCode: improvement.suggestedCode,
						explanation: improvement.explanation,
					}),
				);

				await db.insert(diffLines).values(diffLinesData);
			}

			return { id: roastResult.id };
		}),

	getById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input }) => {
			const [result] = await db
				.select()
				.from(roastResults)
				.where(eq(roastResults.id, input.id))
				.limit(1);

			if (!result) {
				return null;
			}

			const [submission] = await db
				.select()
				.from(codeSubmissions)
				.where(eq(codeSubmissions.id, result.submissionId))
				.limit(1);

			const improvements = await db
				.select()
				.from(diffLines)
				.where(eq(diffLines.roastResultId, result.id));

			return {
				...result,
				submission,
				improvements,
			};
		}),
});

export type RoastRouter = typeof roastRouter;
