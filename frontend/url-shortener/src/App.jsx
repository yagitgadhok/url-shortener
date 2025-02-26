import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");

  const handleSubmit = () => {
    console.log("url:", originalUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <input
        value={originalUrl}
        onChange={(e) => {
          setOriginalUrl(e.target.value);
        }}
        type="text"
        name="originalUrl"
        id="originalUrl"
        placeholder="Enter URL to be shorten"
        className="w-full max-w-md p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
      />
      <button
        onClick={handleSubmit}
        type="button"
        className="w-full max-w-md p-3 text-xl text-white bg-cyan-600 rounded-lg shadow-md hover:bg-cyan-700"
      >
        Shorten URL
      </button>
    </div>
  );
}

export default App;
