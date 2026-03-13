import { Button } from "@/components/ui/button";

export default function ComponentsPage() {
	return (
		<div className="min-h-screen bg-zinc-50 p-8">
			<div className="mx-auto max-w-4xl space-y-12">
				<h1 className="text-3xl font-bold text-zinc-900">Componentes UI</h1>

				<section className="space-y-4">
					<h2 className="text-xl font-semibold text-zinc-700">Button</h2>

					<div className="flex flex-wrap gap-4 rounded-lg border border-zinc-200 bg-white p-8">
						<h3 className="w-full text-sm font-medium text-zinc-500">
							Variants
						</h3>

						<div className="flex flex-wrap gap-4">
							<Button variant="primary">Primary</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="ghost">Ghost</Button>
						</div>
					</div>

					<div className="flex flex-wrap gap-4 rounded-lg border border-zinc-200 bg-white p-8">
						<h3 className="w-full text-sm font-medium text-zinc-500">Sizes</h3>

						<div className="flex flex-wrap items-center gap-4">
							<Button size="sm">Small</Button>
							<Button size="md">Medium</Button>
							<Button size="lg">Large</Button>
						</div>
					</div>

					<div className="flex flex-wrap gap-4 rounded-lg border border-zinc-200 bg-white p-8">
						<h3 className="w-full text-sm font-medium text-zinc-500">States</h3>

						<div className="flex flex-wrap gap-4">
							<Button>Default</Button>
							<Button disabled>Disabled</Button>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
