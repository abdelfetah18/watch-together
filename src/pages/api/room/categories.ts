import client from "@/database/client";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res) {
    if (req.method != "GET") {
        res.status(405).json({ status: "error", message: "Method not supported" });
    }
    let room_categories = await client.getRoomCategories();
    res.status(200).json({ status: "success", data: room_categories });
}
