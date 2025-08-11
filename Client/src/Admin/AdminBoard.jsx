import React, { useState, useMemo } from "react";
import { Check, X, Search, Trash2, Calendar, Filter } from "lucide-react";

const mockItems = [
  {
    id: 1,
    name: "Red Backpack",
    type: "lost",
    date: "2025-08-05",
    approved: false,
    image: "https://via.placeholder.com/80"
  },
  {
    id: 2,
    name: "Gold Watch",
    type: "found",
    date: "2025-08-08",
    approved: true,
    image: "https://via.placeholder.com/80"
  },
  {
    id: 3,
    name: "Black Wallet",
    type: "lost",
    date: "2025-08-10",
    approved: false,
    image: "https://via.placeholder.com/80"
  }
];

export default function AdminDashboard() {
  const [items, setItems] = useState(mockItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = filterType ? item.type === filterType : true;
      const matchesDate = filterDate ? item.date === filterDate : true;
      return matchesSearch && matchesType && matchesDate;
    });
  }, [items, searchTerm, filterType, filterDate]);

  // Toggle Approval
  const toggleApproval = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, approved: !item.approved } : item
      )
    );
  };

  // Delete Item
  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (selectedItem?.id === id) setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow">
          <Search className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search by name..."
            className="outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter by type */}
        <select
          className="px-3 py-2 rounded-lg shadow bg-white"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        {/* Filter by date */}
        <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow">
          <Calendar className="text-gray-500 mr-2" size={20} />
          <input
            type="date"
            className="outline-none"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      {/* Item List */}
      <div className="grid gap-4">
        {filteredItems.length === 0 ? (
          <p className="text-gray-500">No items found.</p>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`flex items-center gap-4 p-4 rounded-lg shadow cursor-pointer border-2 transition ${
                selectedItem?.id === item.id
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="font-bold">{item.name}</h2>
                <p className="text-sm text-gray-500">
                  {item.type === "lost" ? "Lost" : "Found"} on {item.date}
                </p>
              </div>

              {/* Approve toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleApproval(item.id);
                }}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                  item.approved
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {item.approved ? <Check size={16} /> : <X size={16} />}
                {item.approved ? "Approved" : "Pending"}
              </button>

              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(item.id);
                }}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
              >
                <Trash2 size={16} className="text-red-600" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
