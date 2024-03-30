import type { NextApiRequest, NextApiResponse } from "next";

interface LoginData {
  studentId: string;
  password: string;
  isAdmin: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { studentId, password, isAdmin }: LoginData = req.body;

      if (
        studentId === process.env.ADMIN_ID &&
        password === process.env.ADMIN_PASSWORD &&
        isAdmin
      ) {
        res.status(200).json({ message: "관리자 로그인 성공" });
      } else {
        res.status(401).json({ message: "관리자 로그인 실패" });
      }
    } catch (error) {
      res.status(500).json({ message: "서버 오류" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
