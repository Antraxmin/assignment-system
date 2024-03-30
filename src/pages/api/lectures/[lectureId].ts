import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/utils/db";
import { ObjectId } from "mongodb";

interface Lesson {
  title: string;
  description: string;
}

interface Lecture {
  week: string;
  lessons: Lesson[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lectureId = Array.isArray(req.query.lectureId)
    ? req.query.lectureId[0]
    : req.query.lectureId;

  if (!lectureId) {
    return res.status(400).json({ error: "Lecture ID is required" });
  }

  const objectId = ObjectId.createFromHexString(lectureId);

  if (req.method === "GET") {
    try {
      const client = await connectToDatabase();
      const database = client.db(process.env.DB_NAME);
      const collection = database.collection<Lecture>("lectures");

      const foundLecture = await collection.findOne({ _id: objectId });

      if (!foundLecture) {
        return res
          .status(404)
          .json({ error: "해당하는 강의를 찾지 못했습니다" });
      }

      res.status(200).json(foundLecture);
    } catch (error) {
      console.error("강의자료를 불러오지 못했습니다", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
