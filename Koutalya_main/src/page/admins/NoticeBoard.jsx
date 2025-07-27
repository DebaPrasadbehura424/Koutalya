import React, { useState, useEffect } from "react";
import axios from "axios";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [allNotices, setAllNotices] = useState([]);
  const [newNotice, setNewNotice] = useState("");
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const res = await axios.get("http://localhost:1950/notice/all");
    setNotices(res.data);
    setAllNotices(res.data);
  };

  const createNotice = async () => {
    if (!newNotice.trim()) return;
    await axios.post("http://localhost:1950/notice/create", {
      noticeList: newNotice,
    });
    setNewNotice("");
    fetchNotices();
  };

  const deleteNotice = async (id) => {
    await axios.delete(`http://localhost:1950/notice/delete/${id}`);
    fetchNotices();
  };

  const updateNotice = async (id) => {
    if (!editContent.trim()) return;
    await axios.patch(`http://localhost:1950/notice/edit/${id}`, {
      noticeList: editContent,
    });
    setEditId(null);
    setEditContent("");
    fetchNotices();
  };

  const handleSearchChange = (value) => {
    setSearchInput(value);
    if (!value.trim()) {
      setNotices(allNotices);
    } else {
      const filtered = allNotices.filter((note) =>
        note.noticeList.toLowerCase().includes(value.toLowerCase())
      );
      setNotices(filtered);
    }
  };

  const resetFilter = () => {
    setSearchInput("");
    setNotices(allNotices);
  };

  return (
    <div
      className="max-w-4xl mx-auto p-4 space-y-6"
      style={{ backgroundColor: "#101828", minHeight: "100vh", color: "white" }}
    >
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Write a new notice..."
          value={newNotice}
          onChange={(e) => setNewNotice(e.target.value)}
          className="flex-1 border rounded p-2 bg-gray-900 text-white"
        />
        <button
          onClick={createNotice}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-2 mt-6">
        <input
          type="text"
          placeholder="Search notices..."
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="flex-1 border rounded p-2 bg-gray-900 text-white"
        />
        <button
          onClick={resetFilter}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.noticeId}
            className="border border-gray-700 p-3 rounded shadow-sm flex flex-col sm:flex-row sm:items-center justify-between bg-gray-900"
            style={{ maxHeight: "120px", overflowY: "auto" }}
          >
            <div className="flex-1 pr-4">
              {editId === notice.noticeId ? (
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full border rounded p-2 bg-black text-white"
                />
              ) : (
                <p className="text-lg font-medium break-words">
                  {notice.noticeList}
                </p>
              )}
              <p className="text-sm text-gray-400">
                Created: {notice.setDate.slice(0, 10)}
              </p>
            </div>
            <div className="mt-2 sm:mt-0 sm:ml-4 flex gap-2">
              {editId === notice.noticeId ? (
                <button
                  onClick={() => updateNotice(notice.noticeId)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditId(notice.noticeId);
                    setEditContent(notice.noticeList);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteNotice(notice.noticeId)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
