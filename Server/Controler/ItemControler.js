import Item from "../Database/Item";

// ADD LOST/FOUND ITEM
export const addItem = async (req, res) => {
  try {

    const userId = req.user;
    const { ItemName, itemDetails, status, date,looserId, founderId} = req.body;

    // Validation
    if (!ItemName || !itemDetails || !status) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // File check (optional)
    let imageUrl = "";
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; // Public path
    }

    // Create new item
    const item = await LostFoundItem.create({
      ItemName,
      itemDetails:itemDetails,
      status, // "lost" or "found"
      image: imageUrl,
      date: date || new Date(),
      founderId:founderId,
      looserId:looserId,
    });

    res.status(201).json({
      message: "Item added successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 1️⃣ Update isApproved status
export const updateApprovalStatus = async (req, res) => {
  try {
    const { itemId } = req.params; // Get ID from URL
    const { isApproved } = req.body; // Get status from request body

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { isApproved, updatedOn: Date.now() },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: `Item approval status updated to ${isApproved}`,
      item: updatedItem,
    });
  } catch (error) {
    console.error("Error updating approval status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 2️⃣ Update isFound status
export const updateFoundStatus = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { isFound } = req.body;

    const updateData = {
      isFound,
      updatedOn: Date.now(),
    };

    // If found, set foundDate
    if (isFound) {
      updateData.foundDate = new Date();
    }

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      updateData,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: `Item found status updated to ${isFound}`,
      item: updatedItem,
    });
  } catch (error) {
    console.error("Error updating found status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all items with pagination
export const getAllItems = async (req, res) => {
  try {
    // Extract query parameters
    let { page = 1, limit = 10, search = "", isApproved, isFound } = req.query;

    // Ensure numeric
    page = parseInt(page);
    limit = parseInt(limit);

    // Build filter object
    let filter = {};

    if (search) {
      filter.itemName = { $regex: search, $options: "i" }; // case-insensitive
    }

    if (isApproved !== undefined) {
      filter.isApproved = isApproved === "true";
    }

    if (isFound !== undefined) {
      filter.isFound = isFound === "true";
    }

    // Count total items
    const totalItems = await Item.countDocuments(filter);

    // Fetch paginated items
    const items = await Item.find(filter)
      .populate("looserId", "fullName email")
      .populate("founderId", "fullName email")
      .sort({ updatedOn: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      items,
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch items",
      error: error.message,
    });
  }
};
