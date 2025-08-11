import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    lostDate: {
      type: Date,
      default: null,
    },
    foundDate: {
      type: Date,
      default: null,
    },
    itemDetails: {
      color: { type: String, trim: true },
      size: { type: String, trim: true },
      weight: { type: String, trim: true },
    },
    looserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    founderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    imgUrl: {
      type: String,
      required: true, // Cloudinary URL
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isFound: {
      type: Boolean,
      default: false,
    },
    updatedOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // will automatically add createdAt & updatedAt
  }
);

export default mongoose.model("Item", itemSchema);
