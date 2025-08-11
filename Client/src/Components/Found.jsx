import React from "react";

export default function ItemCard({ type, image, name, date }) {
  const isLost = type === "lost";

  return (
    <div
      className={`flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl shadow-lg text-white w-full max-w-md 
      ${isLost ? "bg-red-500" : "bg-green-500"}`}
    >
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-24 h-24 object-cover rounded-lg border border-white"
      />

      {/* Details */}
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm opacity-90">
          {isLost ? "Lost on" : "Found on"}: {date}
        </p>
      </div>
    </div>
  );
}
