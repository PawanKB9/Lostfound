import express from "express";
import { addItem, getAllItems } from "../Controler/ItemControler.js";
import { upload } from "../Database/ImageUpload.js";
import { auth } from "../Auth/UserAuth.js";

const router = express.Router();

router.post("/items", auth, upload.single("image"), addItem);

// PATCH request to update approval
router.patch("/:itemId/approval", updateApprovalStatus);

// PATCH request to update found status
router.patch("/:itemId/found", updateFoundStatus);

// get all items getAllItems
router.get("/items", getAllItems);


export default router;
