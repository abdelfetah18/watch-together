export default function GetStarted(){
    return(
        <div className="flex flex-row items-center w-full flex-wrap my-20">
            <div className="flex flex-col w-2/3 items-center py-10">
                <div className="w-11/12 flex flex-col">
                    <div className="font-bold text-xl font-mono w-11/12 text-[#ebebeb] py-4">Watch Together</div>
                    <div className="w-2/3 text-base font-mono px-4 text-[#ebebeb] py-2">
                        you can watch a youtube video with your friends at the same time.
                        and having a control over all your friends start/pause a video
                        or even change a video.
                    </div>
                    <a href="/user/sign_up" className="my-4 px-4 py-2 bg-blue-600 rounded-lg font-mono font-bold text-white w-fit cursor-pointer">Get Started</a>
                </div>
            </div>
            <div className="flex flex-col items-center w-1/3 py-10">
                <div className="flex flex-col w-full items-center">
                <img alt="image" className="w-full rounded-lg" src="/watch.png" />
                </div>
            </div>
        </div>
    )
}