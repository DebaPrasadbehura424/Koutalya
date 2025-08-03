import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);

  const handleNews = async () => {
    try {
      const res = await axios.get("http://localhost:1950/news/all");
      setNews(res.data);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  useEffect(() => {
    handleNews();
  }, []);

  return (
    <div className="bg-gray-50 py-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Latest News
        </h1>
        <div className="grid gap-4 md:grid-cols-2">
          {news.length > 0 ? (
            news.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <img
                  src={item.imageURL}
                  alt={item.title}
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x120?text=No+Image"; // Fallback image
                  }}
                />
                <div className="p-3">
                  <h2 className="text-base font-semibold text-blue-900 mb-1 line-clamp-1">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-xs line-clamp-2">
                    {item.context}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-2">
              No news available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
