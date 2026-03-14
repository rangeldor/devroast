import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schema.ts",
	out: "./src/db/migrations",
	dbCredentials: {
		url:
			process.env.DATABASE_URL ||
			"postgresql://devroast:devroast@localhost:5432/devroast",
	},
	verbose: true,
	strict: true,
});
