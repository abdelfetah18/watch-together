import { Formidable } from "formidable";
import client from "@/database/client.mjs";

export const config = {
    api: {
      bodyParser: false
    }
};

export default function handler(req, res) {
    if(req.method == "POST"){
        let form = new Formidable();
        form.parse(req,async ( err,fields, files) => {
            if(err){
                res.status(200).json({
                    status:"error",
                    message:"something went wrong!"
                });
            }else{
                let asset = await client.uploadImage(files["image"].filepath);

                res.status(200).json({
                    status:"success",
                    message:"uploaded successfuly!",
                    data:asset.image,
                });
            }
        });
    }else{
        res.status(405).json({
            status:"error",
            message:"method not found!"
        });
    }
}
  