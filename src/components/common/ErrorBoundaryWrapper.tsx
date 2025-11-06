import { isDev } from '@/services/utils/getEnvironmentMode';
import { Button } from '@shadcn/components/ui/button';
import React, { useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router';

function ErrorFallback({
	error,
	resetErrorBoundary,
}: {
	error: Error;
	resetErrorBoundary: () => void;
}) {

	return (
		<div className="flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<div>
				<div className="mx-auto h-12 w-12 text-primary" />
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					Oops! Something went wrong.
				</h1>
				{isDev && (
					<>
						<h3 className="mt-4 scroll-m-20 text-2xl font-semibold tracking-tight text-red-500">
							Error: {error.message}
						</h3>
						<small className="italic text-red-400">
							This error shows only on DEV mode
						</small>
					</>
				)}
				<p className="mt-4 text-muted-foreground">
					An unexpected error has occurred.
				</p>
				<div className="mt-6">
					<Button
						className="cursor-pointer"
						onClick={resetErrorBoundary}
					>
						{' '}
						Try again
					</Button>
				</div>
			</div>
		</div>
	);
}

export const ErrorBoundaryWrapper = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const location = useLocation();
	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => {
				window.location.reload();
			}}
			resetKeys={[location.pathname]}
		>
			{children}
		</ErrorBoundary>
	);
};
