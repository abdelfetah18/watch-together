import { Formidable } from "formidable";

export const config = {
    api: {
        bodyParser: false
    }
};

import { NextApiRequest, NextApiResponse } from "next";
import { roomRepository } from "@/repositories";

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
    if (req.method == "POST") {
        var form = new Formidable();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.status(200).json({
                    status: "error",
                    message: "something went wrong!"
                });
            } else {
                var room_id = fields.room_id;

                // @ts-ignore
                var asset = await roomRepository.uploadProfileImage(room_id, files["profile_image"].filepath);

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
