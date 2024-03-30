import connectToDatabase from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  try {
    const client = await connectToDatabase();
    const database = client.db("comingsoon");
    const collection = database.collection("users");

    switch (method) {
      case "GET":
        const member = await collection.findOne({ studentId: id });
        res.status(200).json(member);
        break;
      case "POST":
        const { name, studentId, grade } = req.body;
        const result = await collection.insertOne({
          name: name,
          studentId: studentId,
          grade: grade,
        });
        res.status(201).json(result);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
