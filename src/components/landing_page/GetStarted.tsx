export default function GetStarted() {
    return (
        <div className="w-full flex flex-row items-center">
            <div className="w-full flex">
                <div className="flex flex-col w-3/5">
                    <div className="w-full flex flex-col gap-4">
                        <div className="w-3/4 text-4xl font-semibold dark:text-gray-50 text-gray-900 leading-snug whitespace-pre-line">{headline}</div>
                        <a href="/user/sign_up" className="uppercase font-medium px-20 py-2 bg-indigo-600 rounded-lg text-white w-fit cursor-pointer hover:bg-blue-700 active:scale-110 duration-300">Get Started</a>
                        <div className="w-full whitespace-pre text-lg leading-6 text-gray-700 dark:text-gray-300">{description}</div>
                    </div>
                </div>
                <div className="w-2/5">
                    <img className="w-full rounded-full" src="/hero_section.png" />
                </div>
            </div>
        </div>
    )
}

const headline = "Watch Together: Experience\nShared Entertainment Like\nNever Before";
// const sub_heading = "Connect, Watch, and Discuss Your Favorite Videos in Real Time";
const description = "Watch-Together is the ultimate platform for shared video experiences.\nWhether you're miles apart or just next door, our innovative product\nbrings people together in a whole new way.";
