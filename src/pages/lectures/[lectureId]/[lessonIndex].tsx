import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminPage from "@/pages/admin";
import Link from "next/link";

interface Lesson {
  title: string;
  description: string;
}

interface Lecture {
  week: string;
  lessons: Lesson[];
}

function LectureDetail() {
  const router = useRouter();
  const { lectureId, lessonIndex } = router.query;
  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        if (!lectureId || !lessonIndex) return;

        const response = await axios.get<Lecture>(`/api/lectures/${lectureId}`);
        const foundLecture = response.data;
        setLecture(foundLecture);

        const foundLesson = foundLecture.lessons[Number(lessonIndex)];
        setLesson(foundLesson);
      } catch (error) {
        console.error("강의자료를 불러오지 못했습니다", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLecture();
  }, [lectureId, lessonIndex]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!lecture || !lesson) {
    return <div>Not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
        <p className="text-lg text-gray-700">{lesson.description}</p>
        <div className="mt-8">
          <Link href="/admin" className="text-blue-600 hover:underline">
            Back to Admin
          </Link>
        </div>
        {/* <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button> */}
      </div>
    </div>
  );
}

export default function LectureDetailPage() {
  return <AdminPage content={<LectureDetail />} />;
}
