import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiArrowLeft } from "react-icons/fi";

const dummyNews = [
  {
    id: 1,
    title: "New Lab Inauguration",
    description:
      "A brand new computer lab was inaugurated today with modern equipment.",
    image: "https://source.unsplash.com/400x250/?technology,lab",
    date: "2025-07-20",
  },
  {
    id: 2,
    title: "Cultural Fest",
    description:
      "Annual cultural fest will be held on August 20. All students are invited!",
    image: "https://source.unsplash.com/400x250/?culture,festival",
    date: "2025-07-15",
  },
  {
    id: 3,
    title: "Placement Drive",
    description: "Top companies will visit campus next week for placements.",
    image: "https://source.unsplash.com/400x250/?job,office",
    date: "2025-07-10",
  },
];

function News() {
  const [newsList, setNewsList] = useState(dummyNews);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newNews, setNewNews] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleDelete = (id) => {
    setNewsList(newsList.filter((news) => news.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit News ID: ${id}`);
  };

  const handleAddNews = () => {
    const newItem = {
      ...newNews,
      id: Date.now(),
      date: "2025-07-28", // Dummy publish date
    };
    setNewsList([newItem, ...newsList]);
    setNewNews({ title: "", description: "", image: "" });
    setShowForm(false);
  };

  const filteredNews = newsList.filter((news) =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h2 className="text-2xl font-semibold">News Section</h2>
        {!showForm && (
          <button
            className="flex items-center gap-2 bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 transition"
            onClick={() => setShowForm(true)}
          >
            <FiPlus /> Add News
          </button>
        )}
      </div>

      {showForm ? (
        <div className="bg-gray-800 p-6 rounded shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Add News</h3>
            <button
              onClick={() => setShowForm(false)}
              className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 transition"
            >
              <FiArrowLeft /> Back
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="News Title"
              value={newNews.title}
              onChange={(e) =>
                setNewNews({ ...newNews, title: e.target.value })
              }
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            />
            <textarea
              placeholder="Description / Context"
              value={newNews.description}
              onChange={(e) =>
                setNewNews({ ...newNews, description: e.target.value })
              }
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
              rows={4}
            ></textarea>
            <input
              type="text"
              placeholder="Image URL"
              value={newNews.image}
              onChange={(e) =>
                setNewNews({ ...newNews, image: e.target.value })
              }
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            />
            <button
              onClick={handleAddNews}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
            >
              Submit News
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((news) => (
              <div
                key={news.id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{news.title}</h3>
                    <p className="text-sm text-gray-300 mb-3">
                      {news.description}
                    </p>
                    <p className="text-xs text-gray-400 mb-4">
                      Published on: {news.date}
                    </p>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleEdit(news.id)}
                      className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition"
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(news.id)}
                      className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredNews.length === 0 && (
              <div className="text-center col-span-full text-gray-400">
                No news found.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default News;
