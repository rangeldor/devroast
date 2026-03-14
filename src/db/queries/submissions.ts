import { asc, eq, sql } from "drizzle-orm";
import { db } from "../index";
import {
	codeSubmissions,
	diffLines,
	languageEnum,
	roastModeEnum,
	roastResults,
} from "../schema";

export interface Issue {
	line: number;
	severity: "error" | "warning" | "info";
	message: string;
	suggestion?: string;
}

export interface DiffInput {
	lineNumber: number;
	originalCode: string;
	suggestedCode: string;
	explanation: string;
}

export async function createSubmission(params: {
	code: string;
	language: string;
	ipHash?: string;
}) {
	const codePreview = params.code.slice(0, 200);

	const [submission] = await db
		.insert(codeSubmissions)
		.values({
			code: params.code,
			codePreview,
			language: sql`${languageEnum(params.language)}`,
			ipHash: params.ipHash,
		})
		.returning();

	return submission;
}

export async function createRoastResult(params: {
	submissionId: string;
	roastMode: "subtle" | "full_roast";
	score: number;
	roastText: string;
	issues: Issue[];
}) {
	const [result] = await db
		.insert(roastResults)
		.values({
			submissionId: params.submissionId,
			roastMode: sql`${roastModeEnum(params.roastMode)}`,
			score: params.score,
			roastText: params.roastText,
			issues: params.issues,
		})
		.returning();

	return result;
}

export async function createDiffLines(
	roastResultId: string,
	diffs: DiffInput[],
) {
	const values = diffs.map((diff) => ({
		roastResultId,
		lineNumber: diff.lineNumber,
		originalCode: diff.originalCode,
		suggestedCode: diff.suggestedCode,
		explanation: diff.explanation,
	}));

	const [result] = await db.insert(diffLines).values(values).returning();

	return result;
}

export async function getSubmissionWithResult(submissionId: string) {
	const result = await db
		.select({
			submission: codeSubmissions,
			roast: roastResults,
		})
		.from(codeSubmissions)
		.innerJoin(roastResults, eq(roastResults.submissionId, codeSubmissions.id))
		.where(eq(codeSubmissions.id, submissionId))
		.limit(1);

	return result[0] || null;
}

export async function getDiffsForRoastResult(roastResultId: string) {
	return db
		.select()
		.from(diffLines)
		.where(eq(diffLines.roastResultId, roastResultId))
		.orderBy(asc(diffLines.lineNumber));
}
