import React, { useState } from "react";
import { Package, Palette, Scale, Ruler, Upload, Calendar, ListChecks } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function LostItemForm() {
  const [formData, setFormData] = useState({
    type: "",
    date: "",
    itemName: "",
    image: null,
    color: "",
    weight: "",
    size: "",
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, image: file });
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageClick = () => {
    document.getElementById("hiddenFileInput").click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.type ||
      !formData.date ||
      !formData.itemName ||
      !formData.image ||
      !formData.color ||
      !formData.weight ||
      !formData.size
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success(`${formData.type} item details submitted!`);
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Report Lost/Found Item</h2>

        {/* Type */}
        <div className="mb-4 flex items-center border rounded-lg px-3 py-2">
          <ListChecks className="text-gray-500 mr-2" size={20} />
          <select
            name="type"
            className="flex-1 outline-none bg-transparent"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>

        {/* Date */}
        <div className="mb-4 flex items-center border rounded-lg px-3 py-2">
          <Calendar className="text-gray-500 mr-2" size={20} />
          <input
            type="date"
            name="date"
            className="flex-1 outline-none bg-transparent"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {/* Item Name */}
        <div className="mb-4 flex items-center border rounded-lg px-3 py-2">
          <Package className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            name="itemName"
            placeholder="Item Name"
            className="flex-1 outline-none"
            value={formData.itemName}
            onChange={handleChange}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Item Image</label>
          <div
            onClick={handleImageClick}
            className="w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <Upload size={30} />
                <span>Click to upload</span>
              </div>
            )}
          </div>
          <input
            type="file"
            id="hiddenFileInput"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </div>

        {/* Color */}
        <div className="mb-4 flex items-center border rounded-lg px-3 py-2">
          <Palette className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            name="color"
            placeholder="Color"
            className="flex-1 outline-none"
            value={formData.color}
            onChange={handleChange}
          />
        </div>

        {/* Weight */}
        <div className="mb-4 flex items-center border rounded-lg px-3 py-2">
          <Scale className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            name="weight"
            placeholder="Weight"
            className="flex-1 outline-none"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>

        {/* Size */}
        <div className="mb-4 flex items-center border rounded-lg px-3 py-2">
          <Ruler className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            name="size"
            placeholder="Size"
            className="flex-1 outline-none"
            value={formData.size}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Item
        </button>
      </form>
    </div>
  );
}
