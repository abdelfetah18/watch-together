export default function UserInfo({ user }){
    return(
        <div className="bg-gray-800 flex flex-row justify-center items-center py-4 px-16 rounded-b-full">
            <img alt="profile_image" className="h-10 w-10 rounded-full" src={user.profile_image ? user.profile_image :"/profile_1_1.png"} />
            <div className="font-mono text-gray-50 font-medium text-base ml-4">{user.username}</div>
        </div>
    )
}