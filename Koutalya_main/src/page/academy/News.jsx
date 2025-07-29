import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiPlus, FiArrowLeft } from "react-icons/fi";

const API_URL = "http://localhost:1950/news";

function News() {
  const [newsList, setNewsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    context: "",
    imageURL: "",
  });

  // Fetch all news
  const fetchNews = async () => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      setNewsList(res.data);
    } catch (err) {
      console.error("Error fetching news", err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Submit (Add or Edit)
  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(`${API_URL}/edit/${editId}`, formData);
      } else {
        await axios.post(`${API_URL}/create`, formData);
      }
      setFormData({ title: "", context: "", imageURL: "" });
      setEditId(null);
      setShowForm(false);
      fetchNews();
    } catch (err) {
      console.error("Error saving news", err);
    }
  };

  // Delete News
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news?")) return;
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      fetchNews();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Prepare form for editing
  const handleEdit = (news) => {
    setFormData({
      title: news.title,
      context: news.context,
      imageURL: news.imageURL,
    });
    setEditId(news.id);
    setShowForm(true);
  };

  // Filter search
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
            onClick={() => {
              setShowForm(true);
              setFormData({ title: "", context: "", imageURL: "" });
              setEditId(null);
            }}
          >
            <FiPlus /> Add News
          </button>
        )}
      </div>

      {showForm ? (
        <div className="bg-gray-800 p-6 rounded shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              {editId ? "Edit News" : "Add News"}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setFormData({ title: "", context: "", imageURL: "" });
                setEditId(null);
              }}
              className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 transition"
            >
              <FiArrowLeft /> Back
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="News Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            />
            <textarea
              placeholder="News Description / Context"
              value={formData.context}
              onChange={(e) =>
                setFormData({ ...formData, context: e.target.value })
              }
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
              rows={4}
            ></textarea>
            <input
              type="text"
              placeholder="Image URL"
              value={formData.imageURL}
              onChange={(e) =>
                setFormData({ ...formData, imageURL: e.target.value })
              }
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
            >
              {editId ? "Update News" : "Submit News"}
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
                  src={news.imageURL}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{news.title}</h3>
                    <p className="text-sm text-gray-300 mb-3">{news.context}</p>
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      onClick={() => handleEdit(news)}
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
