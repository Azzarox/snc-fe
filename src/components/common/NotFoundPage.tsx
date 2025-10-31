import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from '@shadcn/components/ui/empty';

export function NotFoundPage() {
	return (
		<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
			<Empty>
				<EmptyHeader>
					<EmptyTitle className="text-4xl">
						404 - Not Found
					</EmptyTitle>
					<EmptyDescription className="text-xl">
						The page you&apos;re looking for doesn&apos;t exist.
					</EmptyDescription>
				</EmptyHeader>
			</Empty>
		</div>
	);
}

export default NotFoundPage;
