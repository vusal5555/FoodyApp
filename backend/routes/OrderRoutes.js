import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();
import {
  createOrder,
  getMyOrders,
  updateOrderToPaid,
  getAllOrders,
  getOrderById,
  updateOrderToDeliver,
} from "../controllers/OrderController.js";

router.route("/").post(protect, createOrder).get(protect, admin, getAllOrders);
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDeliver);

export default router;
