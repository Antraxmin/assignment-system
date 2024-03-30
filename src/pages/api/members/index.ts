import connectToDatabase from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await connectToDatabase();
  const database = client.db(process.env.DB_NAME);
  const collection = database.collection("users");
  if (req.method === "POST") {
    const { name, studentId, grade } = req.body;

    try {
      const result = await collection.insertOne({
        name: name,
        studentId: studentId,
        grade: grade,
      });

      res.status(201).json(result);
    } catch (error) {
      console.error("Error adding member:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
