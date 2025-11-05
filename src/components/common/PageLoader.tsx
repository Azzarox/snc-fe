import { Loader2 } from "lucide-react"

const PageLoader = () => {
    return (<div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>)
}

export default PageLoader;

// TODO: Add unable to load page html 