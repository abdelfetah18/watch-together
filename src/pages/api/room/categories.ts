import { roomCategoryRepository } from "@/repositories";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res) {
    if (req.method != "GET") {
        res.status(405).json({ status: "error", message: "Method not supported" });
    }

    const room_categories = await roomCategoryRepository.listAll();
    res.status(200).json({ status: "success", data: room_categories });
}
