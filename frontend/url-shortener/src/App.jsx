import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = () => {
    axios
      .post("https://url-shortener-odbp.onrender.com/api/short", {
        originalUrl,
      })
      .then((res) => {
        setShortUrl(res.data);
        console.log("data:", res);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-cyan-600">URL Shortener</h1>
      <br />
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
      {shortUrl && (
        <div className="mt-6 text-center">
          <p className="text-lg bold font-medium">Shortened URL:</p>
          <a
            href={shortUrl.shortUrl}
            className="text-blue-400 underline mt-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortUrl.shortUrl}
          </a>
          {shortUrl && <img src={shortUrl.qrCodeImg} alt="linkQR" />}
        </div>
      )}
    </div>
  );
}

export default App;
