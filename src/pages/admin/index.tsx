import React, { useState } from "react";

export default function AdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <div className="md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-4 focus:outline-none focus:bg-gray-700"
        >
          <svg
            className="h-6 w-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block md:w-64 lg:w-64 bg-gray-800 shadow-xl h-full`}
      >
        <h2 className="text-white text-xl font-semibold p-4">
          관리자 대시보드
        </h2>
        <nav>
          <a
            href="#"
            className="block py-2.5 px-4 text-gray-300 hover:bg-gray-700"
          >
            회원 관리
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 text-gray-300 hover:bg-gray-700"
          >
            과제 관리
          </a>
        </nav>
      </div>
      <main className="flex-1 p-7">
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-semibold">대시보드 홈</h1>
        </div>
      </main>
    </div>
  );
}
