import "dotenv/config";
import { faker } from "@faker-js/faker";
import { sql } from "drizzle-orm";
import { db } from "./index";
import { codeSubmissions, diffLines, roastResults } from "./schema";

const languages = [
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
] as const;

const codeTemplates: Record<string, string[]> = {
	javascript: [
		"function process(items) { let result = []; for (let i = 0; i < items.length; i++) { if (items[i]) result.push(items[i]); } return result; }",
		"const fetchData = async () => { const res = await fetch(url); const data = await res.json(); return data; };",
		"const x = 1; const y = 2; const z = 3; console.log(x + y + z);",
		"function add(a, b) { return a + b; } const result = add(1, 2);",
		"for (let i = 0; i < 10; i++) { console.log(i); }",
	],
	typescript: [
		"interface User { name: string; age: number; } const user: User = { name: 'John', age: 25 };",
		"type Result<T> = { success: boolean; data?: T; error?: string; };",
		"const process = (items: string[]): string[] => items.map(x => x.toUpperCase());",
		"async function fetchUser(id: string): Promise<User> { const res = await fetch('/api/users/' + id); return res.json(); }",
		"const handler = (event: Event) => { console.log(event.target); };",
	],
	python: [
		"def process(data): result = [] for item in data: if item > 0: result.append(item * 2) return result",
		"x = 1 y = 2 z = 3 print(x + y + z)",
		"class User: def __init__(self, name): self.name = name def get_name(self): return self.name",
		"for i in range(10): print(i)",
		"data = [1, 2, 3, 4, 5] result = [x * 2 for x in data if x > 2]",
	],
	rust: [
		'fn main() { let x = 5; let y = 10; println!("{}", x + y); }',
		"fn process(items: Vec<i32>) -> Vec<i32> { items.iter().map(|x| x * 2).collect() }",
		'let mut count = 0; while count < 5 { println!("{}", count); count += 1; }',
		"struct User { name: String, age: u32 }",
		"fn add(a: i32, b: i32) -> i32 { a + b }",
	],
	go: [
		"func add(a int, b int) int { return a + b }",
		"func process(items []int) []int { result := make([]int, 0) for _, v := range items { if v > 0 { result = append(result, v * 2) } } return result }",
		'func main() { fmt.Println("Hello") }',
		"type User struct { Name string Age int }",
		"for i := 0; i < 10; i++ { fmt.Println(i) }",
	],
	java: [
		'public class Main { public static void main(String[] args) { System.out.println("Hello"); } }',
		"public int add(int a, int b) { return a + b; }",
		"for (int i = 0; i < 10; i++) { System.out.println(i); }",
		"public class User { private String name; public String getName() { return this.name; } }",
		"List<Integer> list = new ArrayList<>(); list.add(1); list.add(2);",
	],
	csharp: [
		"public int Add(int a, int b) { return a + b; }",
		"public class User { public string Name { get; set; } }",
		"for (int i = 0; i < 10; i++) { Console.WriteLine(i); }",
		"var result = items.Where(x => x > 0).Select(x => x * 2);",
		"async Task<string> GetData() { var client = new HttpClient(); return await client.GetStringAsync(url); }",
	],
	cpp: [
		"int add(int a, int b) { return a + b; }",
		"int main() { std::vector<int> v = {1, 2, 3}; for (auto x : v) std::cout << x << std::endl; return 0; }",
		"for (int i = 0; i < 10; i++) { std::cout << i << std::endl; }",
		"class User { public: string name; int age; };",
		"int* createArray() { int* arr = new int[10]; return arr; }",
	],
	ruby: [
		"def add(a, b) a + b end",
		"items = [1, 2, 3, 4, 5]; result = items.select { |x| x > 2 }.map { |x| x * 2 }",
		"class User attr_accessor :name def initialize(name) @name = name end end",
		"10.times { |i| puts i }",
		"data = { 'key' => 'value' }",
	],
	php: [
		"function add($a, $b) { return $a + $b; }",
		"$items = [1, 2, 3, 4, 5]; $result = array_map(fn($x) => $x * 2, array_filter($items, fn($x) => $x > 2));",
		"class User { public $name; public function __construct($name) { $this->name = $name; } }",
		"for ($i = 0; $i < 10; $i++) { echo $i; }",
		"$data = ['key' => 'value'];",
	],
	swift: [
		"func add(a: Int, b: Int) -> Int { return a + b }",
		"let items = [1, 2, 3, 4, 5]; let result = items.filter { $0 > 2 }.map { $0 * 2 }",
		"struct User { var name: String; var age: Int }",
		"for i in 0..<10 { print(i) }",
		"class ViewController: UIViewController { override func viewDidLoad() { super.viewDidLoad() } }",
	],
	kotlin: [
		"fun add(a: Int, b: Int): Int = a + b",
		"val items = listOf(1, 2, 3, 4, 5); val result = items.filter { it > 2 }.map { it * 2 }",
		"data class User(val name: String, val age: Int)",
		"for (i in 0 until 10) { println(i) }",
		'fun main() { println("Hello") }',
	],
	sql: [
		"SELECT * FROM users WHERE id = 1",
		"INSERT INTO users (name, email) VALUES ('John', 'john@example.com')",
		"UPDATE users SET name = 'Jane' WHERE id = 1",
		"DELETE FROM users WHERE id = 1",
		"SELECT name, COUNT(*) FROM users GROUP BY name",
	],
	html: [
		"<div><h1>Hello</h1><p>World</p></div>",
		"<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>",
		"<form><input type='text'/><button>Submit</button></form>",
		"<table><tr><td>Cell</td></tr></table>",
		"<img src='image.jpg' alt='Image'/>",
	],
	css: [
		".container { display: flex; justify-content: center; align-items: center; }",
		".card { padding: 20px; margin: 10px; border: 1px solid #ccc; }",
		"body { font-family: Arial; font-size: 16px; color: #333; }",
		".btn { background: blue; color: white; padding: 10px 20px; }",
		".grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }",
	],
};

const roastTemplates = {
	subtle: [
		"Here's a gentle suggestion: consider using {suggestion} for better readability.",
		"Not bad, but you could improve by {suggestion}.",
		"This works! Minor tip: {suggestion} would make it cleaner.",
		"Functionally correct. Consider {suggestion} for optimization.",
		"Nice approach! One small improvement: {suggestion}.",
	],
	full_roast: [
		"Wow. Just... wow. {roast}. This is why we can't have nice things.",
		"I've seen better code in a Hello World tutorial. {roast}",
		"Please, for the love of all that is holy, {roast}. My eyes!",
		"This code is so bad that even your compiler is crying. {roast}",
		"Are you trying to break the universe? {roast} At least use {suggestion}.",
	],
};

const roasts = {
	subtle: [
		"using a more descriptive variable name",
		"extracting this into a separate function",
		"adding proper error handling",
		"using modern syntax like arrow functions",
		"considering async/await instead of callbacks",
		"adding type annotations where appropriate",
		"using proper naming conventions",
		"extracting magic numbers into constants",
		"adding input validation",
		"using a more efficient algorithm",
	],
	full_roast: [
		"this code is an affront to computer science",
		"your variable names look like my cat walked on the keyboard",
		"this would fail a basic coding interview",
		"the person who wrote this should be banned from computers",
		"this is an absolute tragedy of code",
		"even my grandmother writes better code",
		"this would make Dijkstra spin in his grave",
		"the indentation is giving me nightmares",
		"this code smells worse than my uncle's cooking",
		"delete this immediately and start over",
	],
};

const issueTemplates = [
	{
		severity: "error",
		message: "Unused variable '{var}'",
		suggestion: "Remove or use '{var}'",
	},
	{
		severity: "error",
		message: "Hardcoded value detected",
		suggestion: "Use a configuration constant",
	},
	{
		severity: "warning",
		message: "Missing error handling",
		suggestion: "Add try-catch block",
	},
	{
		severity: "warning",
		message: "Potential null reference",
		suggestion: "Add null check",
	},
	{
		severity: "warning",
		message: "Loop could be simplified",
		suggestion: "Use built-in methods",
	},
	{
		severity: "info",
		message: "Consider adding documentation",
		suggestion: "Add JSDoc/comments",
	},
	{
		severity: "info",
		message: "Magic number found",
		suggestion: "Extract to named constant",
	},
	{
		severity: "warning",
		message: "Function is too long",
		suggestion: "Split into smaller functions",
	},
	{
		severity: "error",
		message: "Security vulnerability: SQL injection risk",
		suggestion: "Use parameterized queries",
	},
	{
		severity: "warning",
		message: "Performance: redundant operation",
		suggestion: "Optimize the algorithm",
	},
];

function generateCode(language: string): string {
	const templates = codeTemplates[language] || codeTemplates.javascript;
	const selectedTemplate = faker.helpers.arrayElement(templates);

	const additionalLines = faker.number.int({ min: 2, max: 5 });
	const lines = [selectedTemplate];

	for (let i = 0; i < additionalLines; i++) {
		const randomTemplate = faker.helpers.arrayElement(templates);
		lines.push(randomTemplate);
	}

	return lines.join("\n");
}

function generateIssues(): Array<{
	line: number;
	severity: string;
	message: string;
	suggestion?: string;
}> {
	const count = faker.number.int({ min: 1, max: 4 });
	const issues: Array<{
		line: number;
		severity: string;
		message: string;
		suggestion?: string;
	}> = [];
	const usedTemplates = new Set<number>();

	for (let i = 0; i < count; i++) {
		let idx: number;
		do {
			idx = faker.number.int({ min: 0, max: issueTemplates.length - 1 });
		} while (usedTemplates.has(idx));
		usedTemplates.add(idx);

		const template = issueTemplates[idx];
		const varName = faker.helpers.arrayElement([
			"x",
			"data",
			"result",
			"item",
			"temp",
		]);
		issues.push({
			line: faker.number.int({ min: 1, max: 10 }),
			severity: template.severity,
			message: template.message.replace("{var}", varName),
			suggestion: template.suggestion?.replace("{var}", varName),
		});
	}

	return issues;
}

function generateDiffs(): Array<{
	lineNumber: number;
	originalCode: string;
	suggestedCode: string;
	explanation: string;
}> {
	const count = faker.number.int({ min: 0, max: 2 });
	const diffs: Array<{
		lineNumber: number;
		originalCode: string;
		suggestedCode: string;
		explanation: string;
	}> = [];

	for (let i = 0; i < count; i++) {
		diffs.push({
			lineNumber: faker.number.int({ min: 1, max: 10 }),
			originalCode: "const x = 1;",
			suggestedCode: "const X_CONSTANT = 1;",
			explanation: faker.helpers.arrayElement([
				"Use meaningful variable names",
				"Follow naming conventions",
				"Make code self-documenting",
				"Improve readability",
			]),
		});
	}

	return diffs;
}

function generateRoastText(mode: "subtle" | "full_roast"): string {
	const templates = roastTemplates[mode];
	const hints = roasts[mode];
	const template = faker.helpers.arrayElement(templates);

	if (mode === "subtle") {
		const suggestion = faker.helpers.arrayElement(hints);
		return template.replace("{suggestion}", suggestion);
	} else {
		const roast = faker.helpers.arrayElement(hints);
		const suggestion = faker.helpers.arrayElement(roasts.subtle);
		return template
			.replace("{roast}", roast)
			.replace("{suggestion}", suggestion);
	}
}

export async function seed() {
	console.log("🌱 Seeding database with 100 roasts...");

	const targetCount = 100;
	const batchSize = 10;

	for (let batch = 0; batch < targetCount / batchSize; batch++) {
		console.log(
			`  Processing batch ${batch + 1}/${targetCount / batchSize}...`,
		);

		const submissions = [];
		const results = [];

		for (let i = 0; i < batchSize; i++) {
			const language = faker.helpers.arrayElement(languages);
			const code = generateCode(language);
			const score = faker.number.int({ min: 1, max: 10 });
			const roastMode = score <= 5 ? "full_roast" : "subtle";

			submissions.push({
				code,
				codePreview: code,
				language: sql`${language}::language`,
				ipHash: faker.string.alphanumeric(8),
			});

			results.push({
				roastMode: sql`${roastMode}::roast_mode`,
				score,
				roastText: generateRoastText(roastMode),
				issues: generateIssues(),
			});
		}

		const created = await db
			.insert(codeSubmissions)
			.values(submissions)
			.returning();

		for (let i = 0; i < created.length; i++) {
			const roastResult = await db
				.insert(roastResults)
				.values({
					submissionId: created[i].id,
					roastMode: results[i].roastMode,
					score: results[i].score,
					roastText: results[i].roastText,
					issues: results[i].issues,
				})
				.returning();

			const diffs = generateDiffs();
			if (diffs.length > 0) {
				await db.insert(diffLines).values(
					diffs.map((d) => ({
						roastResultId: roastResult[0].id,
						lineNumber: d.lineNumber,
						originalCode: d.originalCode,
						suggestedCode: d.suggestedCode,
						explanation: d.explanation,
					})),
				);
			}
		}
	}

	const count = await db
		.select({ count: sql<number>`count(*)` })
		.from(roastResults);
	console.log(`✅ Seed completed! Total roasts: ${count[0].count}`);
}
