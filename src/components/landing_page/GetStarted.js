const headline = "Watch Together: Experience Shared Entertainment Like Never Before";
const sub_heading = "Connect, Watch, and Discuss Your Favorite Videos in Real Time";
const description = "Watch Together is the perfect way to stay connected with friends and family, even when you're not in the same place. With Watch Together, you can watch your favorite videos together, and chat about them as you watch. This is a great way to share your favorite movies, TV shows, and YouTube videos with the people you care about.";

export default function GetStarted(){
    return(
        <div className="w-full px-20 flex flex-row items-center flex-grow flex-wrap bg-black/40">
            <div className="flex flex-col w-2/3">
                <div className="w-5/6  flex flex-col">
                    <div className="text-4xl font-mono font-extrabold text-gray-50">{headline}</div>
                    <div className="text-lg font-semibold font-mono text-gray-100 py-4">{sub_heading}</div>
                    <div className="w-4/5 text-base font-thin font-mono text-gray-200 pt-4 pb-8">{description}</div>
                    <a href="/user/sign_up" className="my-8 px-8 py-2 bg-blue-600 rounded-lg font-mono text-white w-fit cursor-pointer hover:bg-blue-700 duration-300">Get Started</a>
                </div>
            </div>
            <div className="flex flex-col items-center w-1/3 py-10 hidden">
                <div className="flex flex-col w-full items-center">
                <img alt="image" className="w-full rounded-lg" src="/banner.png" />
                </div>
            </div>
        </div>
    )
}