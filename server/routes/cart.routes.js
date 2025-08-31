const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Get my cart
router.get("/", auth(), async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
  if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });
  res.json({ cart });
});

// Add/update item
router.post("/items", auth(), async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ error: "Product not found" });
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });
  const idx = cart.items.findIndex((i) => i.product.toString() === productId);
  if (idx >= 0) cart.items[idx].quantity = Math.max(1, Number(quantity) || 1);
  else cart.items.push({ product: productId, quantity: Math.max(1, Number(quantity) || 1) });
  await cart.save();
  res.json({ cart });
});

// Remove item
router.delete("/items/:productId", auth(), async (req, res) => {
  const productId = req.params.productId;
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ error: "Cart not found" });
  cart.items = cart.items.filter((i) => i.product.toString() !== productId);
  await cart.save();
  res.json({ cart });
});

// Clear cart
router.delete("/", auth(), async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  res.json({ ok: true });
});

module.exports = router;

