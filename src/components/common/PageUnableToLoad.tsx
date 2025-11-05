"use client"

import { AlertCircle, RotateCcw } from "lucide-react"
import { Button } from "@shadcn/components/ui/button"
import PageContainer from "./PageContainer"

interface UnableToLoadProps {
    title?: string
    message?: string
    onRetry?: () => void
    onGoBack?: () => void
}

export function UnableToLoad({
    title = "Unable to Load Data",
    message = "We couldn't fetch the information you're looking for. Please try again.",
    onRetry = () => window.location.reload(),
    onGoBack = () => window.history.back(),
}: UnableToLoadProps) {


    return (
        <PageContainer>
            <div className="flex flex-col items-center justify-center gap-6 px-4 text-center max-w-md">

                <AlertCircle className="h-16 w-16 text-muted-foreground" />

                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
                    <p className="text-muted-foreground text-sm">{message}</p>
                </div>

                <div className="flex gap-3 pt-2">
                    {onRetry && (
                        <Button onClick={onRetry} variant="default" className="gap-2 cursor-pointer">
                            <RotateCcw className="h-4 w-4" />
                            Retry
                        </Button>
                    )}
                    {onGoBack && (
                        <Button onClick={onGoBack} variant="outline" className="cursor-pointer">
                            Go Back
                        </Button>
                    )}
                </div>
            </div>
        </PageContainer>

    )
}
{/* <div className="flex items-center justify-center min-h-[calc(100 - 4rem)] bg-background">
            <div className="flex flex-col items-center justify-center gap-6 px-4 text-center max-w-md">
                <AlertCircle className="h-16 w-16 text-muted-foreground" />

                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
                    <p className="text-muted-foreground text-sm">{message}</p>
                </div>

                <div className="flex gap-3 pt-2">
                    {onRetry && (
                        <Button onClick={onRetry} variant="default" className="gap-2 cursor-pointer">
                            <RotateCcw className="h-4 w-4" />
                            Retry
                        </Button>
                    )}
                    {onGoBack && (
                        <Button onClick={onGoBack} variant="outline" className="cursor-pointer">
                            Go Back
                        </Button>
                    )}
                </div>
            </div>
        </div> */}