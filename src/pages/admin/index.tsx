import Link from "next/link";
import React, { ReactNode, useState } from "react";

interface PageProps {
  content: ReactNode;
}

export default function AdminPage({ content }: PageProps) {
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
          <Link
            href="/admin/member"
            className="block py-2.5 px-4 text-gray-300 hover:bg-gray-700"
          >
            회원 관리
          </Link>
          <Link
            href="/admin/assignment"
            className="block py-2.5 px-4 text-gray-300 hover:bg-gray-700"
          >
            과제 관리
          </Link>
        </nav>
      </div>
      <main className="flex-1 p-7">
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-semibold">{content}</h1>
        </div>
      </main>
    </div>
  );
}
