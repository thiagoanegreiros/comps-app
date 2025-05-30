import React from "react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Main Page</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded shadow cursor-pointer hover:bg-blue-600 transition"
          onClick={() => navigate("/basic")}
        >
          Basic Storage Demo
        </button>

        <button
          className="bg-green-500 text-white py-2 px-4 rounded shadow cursor-pointer hover:bg-green-600 transition"
          onClick={() => navigate("/advanced")}
        >
          Advanced Storage Demo
        </button>

        <button
          className="bg-purple-500 text-white py-2 px-4 rounded shadow cursor-pointer hover:bg-purple-600 transition"
          onClick={() => navigate("/external")}
        >
          External Change Demo
        </button>
      </div>
    </div>
  );
};
