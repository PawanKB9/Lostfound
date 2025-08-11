import React from "react";
import ItemCard from "../Components/Found";


export default function LostAndFoundList() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold mb-4">Lost & Found Items</h1>

      {/* Lost Item Card */}
      <ItemCard
        type="lost"
        image="https://via.placeholder.com/150"
        name="Red Backpack"
        date="2025-08-05"
      />

      {/* Found Item Card */}
      <ItemCard
        type="found"
        image="https://via.placeholder.com/150"
        name="Gold Watch"
        date="2025-08-08"
      />
    </div>
  );
}
