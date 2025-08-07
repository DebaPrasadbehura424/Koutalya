import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function FeesCheckStudent() {
  const { studentId, feesId } = useParams();
  const [feesData, setFeesData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [amount, setAmount] = useState("");
  const [bankRef, setBankRef] = useState("");
  const [payFor, setPayFor] = useState("course");
  const [paymentMode, setPaymentMode] = useState("online");

  useEffect(() => {
    fetchFeesData();
  }, [studentId]);

  const fetchFeesData = () => {
    axios
      .get(`http://localhost:1950/api/students/fees/${studentId}`)
      .then((res) => {
        setFeesData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching fee data:", err);
        setLoading(false);
      });
  };

  const handlePayment = () => {
    const transactionDate = new Date().toISOString().split("T")[0];

    const payload = {
      amountPaid: amount,
      bankRefNo: bankRef,
      payFor,
      trasanctionDate: transactionDate,
      mode: paymentMode,
    };
    const mode = paymentMode;

    axios
      .put(
        `http://localhost:1950/api/students/fees/pay/${feesId}/${payFor}/${mode}`,
        payload
      )
      .then((res) => {
        alert("Payment Successful");
        fetchFeesData();
        setAmount("");
        setBankRef("");
        setPayFor("course");
        setPaymentMode("online");
      })
      .catch((err) => {
        console.error("Payment error:", err);
        alert("Payment failed. Check console for details.");
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-medium">
        Loading Fees...
      </div>
    );
  }

  if (!feesData) {
    return (
      <div className="text-center mt-10 text-red-600">
        No fees data found for this ID.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-16">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Student Fees Detail
      </h1>

      {/* Fees Summary */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h3 className="text-sm font-semibold">Semester</h3>
            <p className="text-lg">{feesData.semester}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Course Dues</h3>
            <p className="text-lg">₹{feesData.courseDues}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Hostel Dues</h3>
            <p className="text-lg">₹{feesData.hostelDues}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Transport Dues</h3>
            <p className="text-lg">₹{feesData.transportDues}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Fine</h3>
            <p className="text-lg text-red-500">₹{feesData.fine}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Total Dues</h3>
            <p className="text-lg font-bold text-red-600">
              ₹{feesData.totalDues}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          Make a Payment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Pay For</label>
            <select
              value={payFor}
              onChange={(e) => setPayFor(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="course">Course</option>
              <option value="hostel">Hostel</option>
              <option value="fine">Fine</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter amount"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">
              Bank Reference No
            </label>
            <input
              type="text"
              value={bankRef}
              onChange={(e) => setBankRef(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              placeholder="e.g., TXN123456"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Payment Mode</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              onClick={handlePayment}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Submit Payment
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          Transaction History
        </h2>
        {feesData.transactionData?.length > 0 ? (
          <table className="w-full table-auto text-gray-700">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount Paid</th>
                <th className="px-4 py-2">Reference No</th>
                <th className="px-4 py-2">For</th>
                <th className="px-4 py-2">Mode</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {feesData.transactionData.map((tx, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{tx.trasanctionDate}</td>
                  <td className="px-4 py-2">₹{tx.amountPaid}</td>
                  <td className="px-4 py-2">{tx.bankRefNo}</td>
                  <td className="px-4 py-2">{tx.payFor}</td>
                  <td className="px-4 py-2">{tx.mode}</td>
                  <td
                    className={`px-4 py-2 font-bold ${
                      tx.status === "Paid" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No transactions yet.</p>
        )}
      </div>
    </div>
  );
}

export default FeesCheckStudent;
