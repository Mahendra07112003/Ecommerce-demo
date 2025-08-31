const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Create order (simulate checkout) - customer
router.post("/", auth(), async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, delivery } = req.body; // items: [{ productId, quantity }]
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: "No items" });

    const productIds = items.map((i) => i.productId);
    const dbProducts = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(dbProducts.map((p) => [p._id.toString(), p]));

    const orderItems = [];
    let subtotal = 0;
    for (const i of items) {
      const p = productMap.get(String(i.productId));
      if (!p) return res.status(400).json({ error: "Product not found" });
      const qty = Math.max(1, Number(i.quantity) || 1);
      subtotal += p.price * qty;
      orderItems.push({ product: p._id, name: p.name, price: p.price, quantity: qty, imageUrl: p.imageUrl });
    }

    const order = await Order.create({ user: userId, items: orderItems, subtotal, delivery });
    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get my orders
router.get("/me", auth(), async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json({ orders });
});

// Admin: list all orders
router.get("/", auth("admin"), async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).populate("user", "name email");
  res.json({ orders });
});

module.exports = router;

