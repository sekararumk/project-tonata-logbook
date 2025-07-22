import React, { useState } from "react";

const TableContainer = () => {
  const [data, setData] = useState([
    { id: 1, date: "2025-07-20", name: "Sekar", title: "Logbook Entry 1" },
    { id: 2, date: "2025-07-21", name: "Arum", title: "Logbook Entry 2" },
  ]);

  const handleAdd = () => {
    const id = data.length + 1;
    const today = new Date().toISOString().split("T")[0];
    setData([
      ...data,
      {
        id,
        date: today,
        name: `User ${id}`,
        title: `Logbook Entry ${id}`,
      },
    ]);
  };

  const handleDelete = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  const handleEdit = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  return (
    <div className="bg-amber-50 min-h-screen p-6">
      <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-md mt-8">
        <h2 className="text-3xl text-secondary font-bold mb-4">Logbook Table</h2>
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={handleAdd}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-blue-900"
          >
            + Add Data
          </button>
        </div>

        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-center p-2 border">#</th>
              <th className="text-center p-2 border">Date</th>
              <th className="text-center p-2 border">Name</th>
              <th className="text-center p-2 border">Title</th>
              <th className="text-center p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{row.date}</td>
                <td className="p-2 border">{row.name}</td>
                <td className="p-2 border">{row.title}</td>
                <td className="p-2 border flex justify-evenly">
                  <button
                    onClick={() => handleEdit(row.id)}
                    className="text-yellow-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-end mt-3">
          <div className="text-sm">
            <button className="px-3 py-1 border rounded-l bg-white hover:bg-gray-100">
              Previous
            </button>
            <button className="px-3 py-1 border-t border-b bg-secondary text-white">
              1
            </button>
            <button className="px-3 py-1 border rounded-r bg-white hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableContainer;
