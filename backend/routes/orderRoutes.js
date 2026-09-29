import express from "express";

import {
  createOrder,
  getOrders,
  updateOrderStatus,
   trackOrder,
} from "../controllers/orderController.js";

import protectAdmin from "../middleware/authmiddleware.js";

const router = express.Router();

// Customer order
router.post("/", createOrder);

// Customer order tracking
router.get("/track/:id", trackOrder);
// Admin protected routes
router.get("/", protectAdmin, getOrders);

router.patch(
  "/:id/status",
  protectAdmin,
  updateOrderStatus
);

export default router;