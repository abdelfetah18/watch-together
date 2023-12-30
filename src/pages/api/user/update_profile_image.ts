import { Formidable } from "formidable";
import client from "@/database/client";

export const config = {
    api: {
        bodyParser: false
    }
};

export default function handler(req, res): void {
    if (req.method == "POST") {
        let form = new Formidable();
        form.parse(req, async (err, fields, files) => {
            fields;
            if (err) {
                res.status(200).json({
                    status: "error",
                    message: "something went wrong!"
                });
            } else {
                let userSession: UserSession = req.userSession;
                // @ts-ignore
                let asset = await client.uploadProfile(files["profile_image"].filepath, userSession.user_id);

                res.status(200).json({
                    status: "success",
                    message: "uploaded successfuly!",
                    data: asset,
                });
            }
        });
    } else {
        res.status(405).json({
            status: "error",
            message: "method not found!"
        });
    }
}
