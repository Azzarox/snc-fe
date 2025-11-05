const PageWrapper = ({ children }: React.PropsWithChildren) => {
    return <>
        <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4 md:p-10 bg-background" >
            <div className="w-full max-w-sm">
                {children}
            </div>
        </div>
    </>
}

export default PageWrapper