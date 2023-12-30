export default function Footer() {
    return (
        <div className="flex flex-col w-full bg-indigo-100 dark:bg-gray-800 rounded-t-lg items-center mt-20">
            <div className="flex flex-row items-center my-5">
                <div className="flex flex-row items-center text-indigo-600 dark:text-indigo-50 text-sm">
                    <div className="font-semibold text-sm uppercase">© 2023 Coded and Designed By </div>
                    <a href="https://github.com/abdelfetah18" className="ml-2 font-bold text-blue-500 hover:text-blue-700 duration-300">AbdelfetahDev</a>
                </div>
            </div>
        </div>
    )
}