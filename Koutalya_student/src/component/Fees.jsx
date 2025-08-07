import React, { useEffect, useState } from "react";
import axios from "axios";

function Fees() {
  const [feesData, setFeesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [bankRef, setBankRef] = useState("");
  const [payFor, setPayFor] = useState("course");

  const studentId = sessionStorage.getItem("studentId");
  const feesId = sessionStorage.getItem("feesId");

  useEffect(() => {
    fetchFees();
  }, [studentId]);

  const fetchFees = () => {
    axios
      .get(`http://localhost:1950/api/students/fees/${studentId}`)
      .then((res) => {
        setFeesData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handlePayment = () => {
    const transactionDate = new Date().toISOString().split("T")[0];
    const mode = "Online";
    const payload = {
      amountPaid: amount,
      bankRefNo: bankRef,
      payFor,
      mode,
      trasanctionDate: transactionDate,
    };

    axios
      .put(
        `http://localhost:1950/api/students/fees/pay/${feesId}/${payFor}/${mode}`,
        payload
      )
      .then((res) => {
        alert("Payment Successful");
        fetchFees();
        setAmount("");
        setBankRef("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading || !feesData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Fees Dashboard</h1>

      {/* Dues Section */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">
          Your Dues
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
          <div>
            Semester: <strong>{feesData.semester}</strong>
          </div>
          <div>Course Dues: ₹{feesData.courseDues}</div>
          <div>Hostel Dues: ₹{feesData.hostelDues}</div>
          <div>Transport Dues: ₹{feesData.transportDues}</div>
          <div>Fine: ₹{feesData.fine}</div>
          <div className="text-red-600 font-bold">
            Total Dues: ₹{feesData.totalDues}
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">
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
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">
          Transaction History
        </h2>
        {feesData.transactionData?.length > 0 ? (
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Reference No</th>
                <th className="px-4 py-2">For</th>
                <th className="px-4 py-2">Mode</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {feesData.transactionData.map((tx, i) => (
                <tr key={i} className="border-t">
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
          <p>No transactions yet.</p>
        )}
      </div>
    </div>
  );
}

export default Fees;
