import React from "react";
import { useStorage } from "../hooks/useStorage";
import { storage } from "../core/storage/localStorageHandler";

// Start polling only once (colocar isso no index.tsx ou App.tsx futuramente seria melhor)
storage.startPolling();

const SetterComponent = () => {
  const [, setValue] = useStorage<string>("shared-key", "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Setter Component</h2>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Type something..."
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

const ViewerComponent = () => {
  const [value] = useStorage<string>("shared-key", "");

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Viewer Component</h2>
      <p className="text-lg">
        Current Value:{" "}
        <span className="font-bold text-blue-600">{value}</span>
      </p>
    </div>
  );
};

const Storage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">LocalStorage Demo</h1>
      <SetterComponent />
      <ViewerComponent />
    </div>
  );
};

export default Storage;
