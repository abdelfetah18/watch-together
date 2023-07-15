import { FaCamera } from "react-icons/fa";
import { generateToken} from "@/utils/encryption.js";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export async function getServerSideProps({ req, query }){
    var user = req.user;
    const token_data = { type:"session", data:{ user_id: user.data.user_id } };
    const access_token = generateToken(token_data);

    if(user.type == "setup"){
        return {
            props:{ new_access_token: access_token }
        }
    }else{
        return {
            redirect: {
                destination: '/profile',
                permanent: false
            }
        }
    }
}

export default function Setup({ user, new_access_token }){
    const [cookies, setCookies, removeCookies] = useCookies(['access_token']);
    const [progress,setProgress] = useState(0);
    const [profile_image_url,setProfileImageUrl] = useState("");
    const [disableNext,setDisableNext] = useState(true);
    const [disableSkip,setDisableSkip] = useState(true);
    const profile_image = useRef();
    const progressBar = useRef();

    function uploadProfileImage(){
        profile_image.current.click();
    }

    function onImageSelected(evt){
        var file = profile_image.current.files[0];
        var form = new FormData();
        form.append("profile_image",file);
        axios.post("/api/user/update_profile_image",form,{ headers:{ "authorization":user.access_token,"Content-Type": "multipart/form-data" }, onUploadProgress: pEvt => {
            var p = ((pEvt.loaded / pEvt.total)*100).toFixed();
            progressBar.current.style.width = p+"%";
            setProgress(p);
        }}).then((res) => {
            setProfileImageUrl(res.data.data.profile_image.url);
            progressBar.current.style.width = "0%";
            setProgress(0);
            setDisableNext(false);
        }).catch((err) => {
            console.log({ err });
        });
    }

    useEffect(() => {
        setCookies("access_token",new_access_token,{ path:"/" });
        setDisableSkip(false);
    },[]);

    return (
        <div className="w-screen h-screen bg-gray-900 flex flex-col items-center justify-center">
            <div className="w-1/2 h-4/5 flex flex-col items-center">
                <div className="w-11/12 text-center text-white font-mono text-2xl">Welcom Abdelfetah to Our new Website!</div>
                <div className="w-11/12 flex flex-col items-center">
                    <div className="text-white font-mono">Please chose a image for your profile:</div>
                    <div className="w-40 h-40 flex flex-col items-center relative m-5">
                        <img alt="profile_image" className="h-40 w-40 rounded-full" src={profile_image_url.length > 0 ? profile_image_url : "/uprofile_1_1ser.png"} />
                        <div className="cursor-pointer text-green-500 absolute bottom-0 right-0 h-10 w-10 bg-blue-500 rounded-full flex flex-col items-center justify-center">
                            <input ref={profile_image} onChange={onImageSelected} className="hidden" type={"file"} />
                            <FaCamera onClick={uploadProfileImage} className="text-white" />
                        </div>
                    </div>
                    <div className="my-10 text-center text-white font-mono text-2xl">Abdelfetah</div>
                </div>
                <div className={"w-1/2 flex-col"+(parseInt(progress) == 0 ? " hidden" : " flex")}>
                    <div ref={progressBar} className={"h-1 rounded-lg bg-red-500 w-0"}></div>
                    <div className="text-center text-white font-mono text-sm mb-10">{progress}%</div>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-between">
                    <a href={"/profile"}>
                        <button type="button" disabled={disableSkip} className={"mx-4 px-4 py-1 border-2 rounded-lg font-mono font-bold cursor-pointer"+(disableSkip ? " border-blue-900 text-blue-900" : " border-blue-500 text-blue-500")}>Skip</button>
                    </a>
                    <a href={"/profile"}>
                        <button type="button" disabled={disableNext} className={"mx-4 px-4 py-1 rounded-lg font-mono font-bold cursor-pointer"+(disableNext ? " bg-blue-900 text-gray-400" : " bg-blue-500 text-white")}>Next</button>
                    </a>
                </div>            
            </div>
        </div>
    )
}