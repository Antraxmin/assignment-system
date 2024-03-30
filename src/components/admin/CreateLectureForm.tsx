import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function CreateLectureForm() {
  const [lectureInfo, setLectureInfo] = useState({
    week: "",
    due: new Date(),
    title: "",
    description: "",
  });

  const router = useRouter();

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setLectureInfo({ ...lectureInfo, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      console.log(lectureInfo);
      await axios.post("/api/lectures", lectureInfo);
      router.push("/admin/lecture");
    } catch (error) {
      console.error("Error creating lecture:", error);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-md">
      <h1 className="text-2xl font-bold mb-8">강의자료 등록하기</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            주차
          </label>
          <input
            type="text"
            id="week"
            name="week"
            value={lectureInfo.week}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={lectureInfo.title}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            내용
          </label>
          <textarea
            id="description"
            name="description"
            value={lectureInfo.description}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded mt-4 text-sm"
        >
          등록
        </button>
      </form>
    </div>
  );
}
