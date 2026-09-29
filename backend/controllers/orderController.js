import Order from "../models/order.js";

//new function add
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update Status Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
    });
  }
};

//2 function added
export const trackOrder = async (req, res) => {
  try {
    const { phone } = req.query;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      phone: phone.trim(),
    }).select(
      "customerName items totalAmount status createdAt"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Track Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to track order",
    });
  }
};  

// Existing functions
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      items,
      totalAmount,
      deliveryAddress,
    } = req.body;

    if (
      !customerName ||
      !phone ||
      !items ||
      items.length === 0 ||
      !totalAmount ||
      !deliveryAddress
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required order details",
      });
    }

    const order = await Order.create({
      customerName,
      phone,
      items,
      totalAmount,
      deliveryAddress,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};