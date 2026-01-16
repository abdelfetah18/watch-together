interface AppLoadingProps {
    title: string;
    description: string;
}

export default function AppLoading({ title, description }: AppLoadingProps) {
    return (
        <div className="w-full h-screen dark:bg-dark-gray flex flex-col items-center justify-center">
            <div className="w-96 flex flex-col items-center gap-4">
                <img className="w-16 object-contain animate-pulse" src="/logo.png" alt="logo" />
                <div className="flex flex-col items-center gap-2">
                    <div className="text-white text-center">{title}</div>
                    <div className="text-gray-400 text-center text-sm">{description}</div>
                </div>
            </div>
        </div>
    )
}