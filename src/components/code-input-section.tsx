"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ToggleRoot } from "@/components/ui/toggle";

const sampleCode = `// paste your code here...`;

export function CodeInputSection() {
	const [roastMode, setRoastMode] = useState(true);
	const [code, setCode] = useState(sampleCode);

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

			<div className="flex h-[360px] w-full flex-col rounded-lg border border-border-primary bg-input">
				<div className="flex h-10 items-center gap-3 border-b border-border-primary px-4">
					<span className="h-3 w-3 rounded-full bg-red-accent" />
					<span className="h-3 w-3 rounded-full bg-amber-accent" />
					<span className="h-3 w-3 rounded-full bg-green-primary" />
				</div>
				<textarea
					className="flex-1 resize-none bg-input px-3 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
					placeholder="// paste your code here..."
					value={code}
					onChange={(e) => setCode(e.target.value)}
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
				<Button size="lg" variant="primary">
					$ roast_my_code
				</Button>
			</div>

			<div className="flex items-center justify-center gap-6">
				<span className="font-mono text-xs text-muted-foreground">
					2,847 codes roasted
				</span>
				<span className="text-muted-foreground">·</span>
				<span className="font-mono text-xs text-muted-foreground">
					avg score: 4.2/10
				</span>
			</div>
		</section>
	);
}
