import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import UserInfo from "@/components/my_profile/UserInfo";
import client from "@/database/client.mjs";
import { motion, useAnimation } from "framer-motion";

export async function getServerSideProps({ req, query }){
    var user_id = req.user.data.user_id;
    var user = await client.getUser(user_id);

    return {
        props:{ user }
    }
}

export default function Create({ user }){
    var [name,setName] = useState("");
    var [description,setDescription] = useState("");
    var [password,setPassword] = useState("");
    var [privacy,setPrivacy] = useState("public");
    var [alertMsg,setAlertMsg] = useState({});
    var [created_room,setCreatedRoom] = useState({ _id:null });
    var createRoomAnim = useAnimation();
    var choseImageAnim = useAnimation();
    var imageInput = useRef();
    var [progress,setProgress] = useState(0);
    var progressBar = useRef();
    var [profile_image_url,setProfileImageUrl] = useState("");
    var [isNext,setIsNext] = useState(false);
    
    useEffect(() => {
        
        
    },[]);

    function createRoom(){
        axios.post("/api/room/create",{ name,description,privacy,password },{
            headers:{
                authorization:user.access_token
            }
        }).then((response) => {
            setAlertMsg(response.data);
            if(response.data.status == "success"){
                setCreatedRoom(response.data.data);
                choseImageAnim.set({
                    x:-100
                })
                createRoomAnim.start({
                    x: 100,
                    opacity:0,
                    transition:{
                        duration: 0.5
                    }
                }).then(() => {
                    createRoomAnim.set({
                        display:"none",
                    });
                    choseImageAnim.start({
                        display:"flex",
                        opacity:1,
                        x:0,
                        transition:{
                            duration: 0.5
                        }
                    }).then(() => {
            
                    });
                });
            }else{
                console.log(response.data);
            }
        })
    }

    function uploadImage(){
        var file = imageInput.current.files[0];
        var form = new FormData();
        form.append("room_id",created_room._id);
        form.append("profile_image",file);
        axios.post("/api/room/upload_profile_image",form,{ headers:{ "authorization":user.access_token,"Content-Type": "multipart/form-data" }, onUploadProgress: pEvt => {
            var p = ((pEvt.loaded / pEvt.total)*100).toFixed();
            progressBar.current.style.width = p+"%";
            setProgress(p);
        }}).then((res) => {
            setProfileImageUrl(res.data.data.profile_image.url);
            progressBar.current.style.width = "0%";
            setProgress(0);
            setIsNext(true);
        }).catch((err) => {
            console.log({ err });
        });
    }

    return(
        <div className="h-screen w-screen flex flex-col items-center bg-gray-900">
            <UserInfo user={user} />
            <div className="w-11/12 flex flex-row flex-grow items-center flex-wrap">
                <motion.div animate={choseImageAnim} className="hidden opacity-0 w-1/2 flex-grow flex-col items-center justify-center my-5">
                    <div className="flex flex-col items-center relative">
                        <img alt="profile_image" className="h-40 w-40 rounded-full object-cover" src={profile_image_url.length > 0 ? profile_image_url : "/user.png"} />
                        <input className="hidden" ref={imageInput} onChange={uploadImage} type="file" />
                        <div onClick={(evt) => imageInput.current.click()} className="absolute bottom-4 right-2 bg-blue-500 p-2 rounded-full cursor-pointer">
                            <FaCamera className="text-white" />
                        </div>
                    </div>
                    <div className={"w-1/2 flex-col my-4"+(parseInt(progress) == 0 ? " hidden" : " flex")}>
                        <div ref={progressBar} className={"h-1 rounded-lg bg-red-500 w-0"}></div>
                        <div className="text-center text-white font-mono text-sm">{progress}%</div>
                    </div>
                    <div className="w-11/12 flex flex-col items-center">
                        <div className="mt-4 font-mono text-gray-300">Chose a profile image</div>
                        <div className="mt-4 mb-10 font-semibold text-white">or</div>
                        <a href={"/room/"+created_room._id}>
                            <div className="text-gray-200 font-semibold bg-sky-800 hover:bg-sky-700 px-16 py-2 cursor-pointer rounded-lg">{isNext ? "Next" : "Skip"}</div>
                        </a>
                    </div>
                </motion.div>
                <motion.div animate={createRoomAnim} className="w-1/4 flex-grow flex opacity-1 flex-col items-center justify-center my-5">
                    <div className={"w-1/4 px-4 text-red-600 font-semibold text-sm"+(alertMsg.status ? "" : " hidden")}>{alertMsg.message}</div>
                    <input className="my-2 rounded-lg px-4 py-2 w-1/4 bg-gray-800 text-gray-200 outline-none" onChange={(evt) => setName(evt.target.value)} value={name} placeholder="Room name" />
                    <input className="my-2 rounded-lg px-4 py-2 w-1/4 bg-gray-800 text-gray-200 outline-none" onChange={(evt) => setDescription(evt.target.value)} value={description} placeholder="Room description"/>
                    <div className="w-1/4 flex flex-row items-center my-2">
                        <div className="font-semibold text-gray-400 mr-4">Privacy:</div>
                        <select className="flex-grow rounded-lg outline-none px-4 py-2 font-semibold bg-gray-800 text-gray-300" onChange={(evt) => setPrivacy(evt.target.value)} defaultValue={privacy} >
                            <option value={"public"}>Public</option>
                            <option value={"private"}>Private</option>
                        </select>
                    </div>
                    {
                        privacy === "private" ? (<input className="my-2 rounded-lg px-4 py-2 w-1/4 bg-gray-800 text-gray-200 outline-none" type="password" onChange={(evt) => setPassword(evt.target.value)} value={password} placeholder="Room password"/>
                        ) : ""
                    }

                    <div className="w-11/12 flex flex-col items-center mt-12">
                        <div onClick={createRoom} className="text-gray-200 font-semibold bg-sky-800 hover:bg-sky-700 px-16 py-2 cursor-pointer rounded-lg">Next</div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}