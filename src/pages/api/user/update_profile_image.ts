import { Formidable } from "formidable";
import { userRepository } from "@/repositories";

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
                const asset = await userRepository.uploadProfileImage(userSession.user_id, files["profile_image"].filepath);

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
