import axios from "axios";
import React, { useEffect, useState } from "react";

const Notification = () => {
  const [notice, setNotice] = useState([]);

  const handleNotice = async () => {
    try {
      const res = await axios.get("http://localhost:1950/notice/all");
      setNotice(res.data);
    } catch (err) {
      console.error("Error fetching notices:", err);
    }
  };

  useEffect(() => {
    handleNotice();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Notifications
        </h1>
        <div className="space-y-4">
          {notice.length > 0 ? (
            notice.map((item) => (
              <div
                key={item.noticeId}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 max-w-sm mx-auto"
              >
                <h2 className="text-lg font-semibold text-blue-900">
                  {item.noticeList}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(item.setDate)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No notifications available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
