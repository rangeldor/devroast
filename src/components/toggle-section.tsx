"use client";

import { useState } from "react";

import { ToggleRoot } from "@/components/ui/toggle";

interface ToggleSectionProps {
	initialState?: boolean;
}

export function ToggleSection({ initialState = false }: ToggleSectionProps) {
	const [toggleOn, setToggleOn] = useState(initialState);

	return (
		<section className="space-y-4">
			<h2 className="font-mono text-xl font-semibold text-foreground">
				// toggle
			</h2>
			<div className="flex flex-wrap items-center gap-8 rounded-lg border border-border bg-card p-8">
				<ToggleRoot checked={toggleOn} onCheckedChange={setToggleOn}>
					roast mode
				</ToggleRoot>
				<ToggleRoot
					checked={!toggleOn}
					onCheckedChange={(checked) => setToggleOn(!checked)}
				>
					roast mode
				</ToggleRoot>
			</div>
		</section>
	);
}
