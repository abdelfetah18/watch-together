import formidable, { Formidable } from "formidable";
import client from "@/database/client";

export const config = {
    api: {
        bodyParser: false
    }
};

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
    if (req.method == "POST") {
        let form = new Formidable();
        form.parse(req, async (err, fields, files: formidable.Files<string>) => {
            fields;
            if (err) {
                res.status(200).json({
                    status: "error",
                    message: "something went wrong!"
                });
            } else {
                // @ts-ignore
                let asset = await client.uploadImage(files["image"].filepath);

                res.status(200).json({
                    status: "success",
                    message: "uploaded successfuly!",
                    data: asset.image,
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
