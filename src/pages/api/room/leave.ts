export default async function handler(_, res) {
    res.status(405).json({
        status: "error",
        message: "method not found!"
    });
}
