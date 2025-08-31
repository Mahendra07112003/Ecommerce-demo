const express = require("express");
const Product = require("../models/Product");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Public list with optional search and filters
router.get("/", async (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;
  const filter = {};
  if (q) filter.name = { $regex: String(q), $options: "i" };
  if (category) filter.category = String(category);
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json({ products });
});

// Public detail
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json({ product });
});

// Admin create
router.post("/", auth("admin"), async (req, res) => {
  try {
    const created = await Product.create(req.body);
    res.status(201).json({ product: created });
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

// Admin update
router.put("/:id", auth("admin"), async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json({ product: updated });
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

// Admin delete
router.delete("/:id", auth("admin"), async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

module.exports = router;

