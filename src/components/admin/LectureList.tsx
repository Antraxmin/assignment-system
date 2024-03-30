import { useState, useEffect } from "react";
import axios from "axios";
import router from "next/router";

interface Lecture {
  _id: string;
  week: string;
  lessons: Lesson[];
}

interface Lesson {
  title: string;
  description: string;
}

export default function LectureList() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get("/api/lectures");
        setLectures(response.data);
      } catch (error) {
        console.error("Error fetching lectures:", error);
        setError("강의 정보를 가져오는 도중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  const [openCategory, setOpenCategory] = useState<number | null>(null);

  const toggleCategory = (categoryIndex: number) => {
    setOpenCategory((prevIndex) =>
      prevIndex === categoryIndex ? null : categoryIndex
    );
  };

  const handleLessonClick = (lectureId: string, lessonIndex: number) => {
    router.push(`/lectures/${lectureId}/${lessonIndex}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {lectures.map((lecture, index) => (
        <div key={index} className="mb-4">
          <button
            onClick={() => toggleCategory(index)}
            className="w-full text-left bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md focus:outline-none"
          >
            {lecture.week}
          </button>
          {openCategory === index && (
            <div className="mt-2 border border-gray-300 rounded-md">
              {lecture.lessons.map((lesson, lessonIndex) => (
                <div
                  key={lessonIndex}
                  onClick={() => handleLessonClick(lecture._id, lessonIndex)}
                  className="p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                >
                  <h3 className="text-lg font-semibold cursor-pointer">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-gray-600">{lesson.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
