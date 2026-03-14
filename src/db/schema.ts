import {
	index,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const roastModeEnum = pgEnum("roast_mode", ["subtle", "full_roast"]);

export const languageEnum = pgEnum("language", [
	"javascript",
	"typescript",
	"python",
	"rust",
	"go",
	"java",
	"csharp",
	"cpp",
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
	"other",
]);

export const codeSubmissions = pgTable("code_submissions", {
	id: uuid("id").primaryKey().defaultRandom(),
	code: text("code").notNull(),
	codePreview: text("code_preview").notNull(),
	language: languageEnum("language").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	ipHash: varchar("ip_hash", { length: 64 }),
});

export const roastResults = pgTable(
	"roast_results",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		submissionId: uuid("submission_id")
			.notNull()
			.references(() => codeSubmissions.id, { onDelete: "cascade" }),
		roastMode: roastModeEnum("roast_mode").notNull(),
		score: integer("score").notNull(),
		roastText: text("roast_text").notNull(),
		issues: jsonb("issues").notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
	},
	(table) => ({
		scoreCreatedAtIdx: index("idx_roast_results_score_created_at").on(
			table.score,
			table.createdAt,
		),
	}),
);

export const diffLines = pgTable(
	"diff_lines",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		roastResultId: uuid("roast_result_id")
			.notNull()
			.references(() => roastResults.id, { onDelete: "cascade" }),
		lineNumber: integer("line_number").notNull(),
		originalCode: text("original_code").notNull(),
		suggestedCode: text("suggested_code").notNull(),
		explanation: text("explanation").notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
	},
	(table) => ({
		roastResultIdIdx: index("idx_diff_lines_roast_result_id").on(
			table.roastResultId,
		),
	}),
);

export type CodeSubmission = typeof codeSubmissions.$inferSelect;
export type NewCodeSubmission = typeof codeSubmissions.$inferInsert;
export type RoastResult = typeof roastResults.$inferSelect;
export type NewRoastResult = typeof roastResults.$inferInsert;
export type DiffLine = typeof diffLines.$inferSelect;
export type NewDiffLine = typeof diffLines.$inferInsert;
