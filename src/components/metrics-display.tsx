"use client";

import NumberFlow, { continuous } from "@number-flow/react";
import { useEffect, useState } from "react";

interface MetricCardProps {
	value: number;
	label: string;
	suffix?: string;
}

function MetricCard({ value, label, suffix = "" }: MetricCardProps) {
	const [localValue, setLocalValue] = useState(0);

	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	return (
		<div className="flex items-center gap-2">
			<NumberFlow
				value={localValue}
				plugins={[continuous]}
				className="font-mono text-lg font-bold text-foreground"
			/>
			<span className="font-mono text-xs text-muted-foreground">
				{label}
				{suffix}
			</span>
		</div>
	);
}

interface MetricsDisplayProps {
	data: {
		totalRoasts: number;
		avgScore: number;
	};
}

export function MetricsDisplay({ data }: MetricsDisplayProps) {
	return (
		<div className="flex items-center justify-center gap-8">
			<MetricCard value={data.totalRoasts} label="codes roasted" />
			<span className="text-muted-foreground">·</span>
			<MetricCard value={data.avgScore} label="avg score" suffix="/10" />
		</div>
	);
}
