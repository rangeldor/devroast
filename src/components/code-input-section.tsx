"use client";

import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { MetricsDisplay } from "@/components/metrics-display";
import { MetricsSkeleton } from "@/components/metrics-skeleton";
import { Button } from "@/components/ui/button";
import {
	CodeEditor,
	type Language,
	type Theme,
} from "@/components/ui/code-editor";
import { ToggleRoot } from "@/components/ui/toggle";
import { trpc } from "@/lib/trpc/client";

const sampleCode = `// paste your code here...`;
const MAX_CODE_LENGTH = 2000;

function MetricsSection() {
	const { data } = trpc.metrics.getStats.useQuery();
	if (!data) return <MetricsSkeleton />;
	return <MetricsDisplay data={data} />;
}

export function CodeInputSection() {
	const router = useRouter();
	const [roastMode, setRoastMode] = useState(true);
	const [code, setCode] = useState(sampleCode);
	const [language, setLanguage] = useState<Language>("javascript");
	const [theme, setTheme] = useState<Theme>("dark");

	const isOverLimit = code.length > MAX_CODE_LENGTH;

	const createRoast = trpc.roast.create.useMutation({
		onSuccess: (data) => {
			router.push(`/result/${data.id}`);
		},
	});

	const handleSubmit = () => {
		if (code.trim() && code.trim() !== sampleCode) {
			createRoast.mutate({
				code,
				language,
				roastMode: roastMode ? "full_roast" : "subtle",
			});
		}
	};

	return (
		<section className="flex w-full max-w-4xl flex-col gap-8">
			<div className="flex items-center gap-3">
				<span className="font-mono text-4xl font-bold text-green-primary">
					$
				</span>
				<span className="font-mono text-4xl font-bold text-foreground">
					paste your code. get roasted.
				</span>
			</div>
			<p className="font-mono text-sm text-muted-foreground">
				// drop your code below and we&apos;ll rate it — brutally honest or full
				roast mode
			</p>

			<div className="flex h-[360px] w-full flex-col rounded-lg border border-border-primary bg-input overflow-hidden">
				<CodeEditor
					value={code}
					onChange={setCode}
					language={language}
					theme={theme}
					onLanguageChange={setLanguage}
					onThemeChange={setTheme}
					placeholder="// paste your code here..."
					maxLength={MAX_CODE_LENGTH}
				/>
			</div>

			<div className="flex w-full items-center justify-between gap-8">
				<div className="flex items-center gap-4">
					<ToggleRoot checked={roastMode} onCheckedChange={setRoastMode}>
						roast mode
					</ToggleRoot>
					<span className="font-mono text-xs text-muted-foreground">
						// maximum sarcasm enabled
					</span>
				</div>
				<Button
					size="lg"
					variant="primary"
					disabled={isOverLimit || createRoast.isPending}
					onClick={handleSubmit}
				>
					{createRoast.isPending ? "$ roasting..." : "$ roast_my_code"}
				</Button>
			</div>

			<div className="flex items-center justify-center gap-6">
				<Suspense fallback={<MetricsSkeleton />}>
					<MetricsSection />
				</Suspense>
			</div>
		</section>
	);
}
