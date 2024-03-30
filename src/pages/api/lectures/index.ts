import connectToDatabase from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

interface Lesson {
  title: string;
  description: string;
  due: Date;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const client = await connectToDatabase();
      const database = client.db(process.env.DB_NAME);
      const collection = database.collection("lectures");

      const lectures = await collection.find({}).toArray();

      res.status(200).json(lectures);
    } catch (error) {
      console.error("Error fetching lectures:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const { week, title, description, due } = req.body;

      const client = await connectToDatabase();
      const database = client.db("comingsoon");
      const collection = database.collection("lectures");

      const existingLecture = await collection.findOne({ week });
      // 주차 정보가 이미 존재하는 경우 해당 주차의 레코드에 새로운 강의 추가
      if (existingLecture) {
        await collection.updateOne(
          { week },
          {
            $addToSet: {
              lessons: { title, description, due },
            },
          }
        );
      } else {
        // 주차 정보가 없는 경우 새로운 주차 레코드 생성
        await collection.insertOne({
          week,
          lessons: [{ title, description, due }],
        });
      }

      res.status(201).json({ message: "강의가 추가되었습니다." });
    } catch (error) {
      console.error("Error adding lecture:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
