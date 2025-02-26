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
    <div>
      <input
        value={originalUrl}
        onChange={(e) => {
          setOriginalUrl(e.target.value);
        }}
        type="text"
        name="originalUrl"
        id="originalUrl"
        placeholder="Enter URL to be shorten"
      />
      <button
        onClick={handleSubmit}
        type="button"
        className="text-xl bg-cyan-600"
      >
        Shorten URL
      </button>
    </div>
  );
}

export default App;
