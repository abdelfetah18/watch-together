export default function GetStarted() {
    return (
        <div className="w-full flex flex-row items-center flex-grow my-28">
            <div className="w-full flex">
                <div className="flex flex-col w-3/5">
                    <div className="w-full flex flex-col">
                        <div className="w-3/4 text-4xl font-semibold dark:text-gray-50 text-indigo-600">{headline}</div>
                        <div className="w-full whitespace-pre text-lg leading-6 font-semibold text-indigo-700 dark:text-gray-300 pt-8 mb-12">{description}</div>
                        <a href="/user/sign_up" className="uppercase text-lg font-semibold my-8 px-16 py-2 bg-indigo-600 rounded-lg text-white w-fit cursor-pointer hover:bg-blue-700 duration-300">SIGN UP</a>
                    </div>
                </div>
                <div className="w-2/5">
                    <img className="w-full rounded-full" src="/hero_section.png" />
                </div>
            </div>
        </div>
    )
}

const headline = "Watch Together: Experience Shared Entertainment Like Never Before";
// const sub_heading = "Connect, Watch, and Discuss Your Favorite Videos in Real Time";
const description = "Watch-Together is the ultimate platform for shared video experiences.\nWhether you're miles apart or just next door, our innovative product\nbrings people together in a whole new way.";
