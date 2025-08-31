const express = require("express");
const multer = require("multer");
const { auth } = require("../middleware/auth");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });
const router = express.Router();

router.post("/", auth("admin"), upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file" });
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: "ecom-demo" }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      stream.end(req.file.buffer);
    });
    return res.status(201).json({ url: uploadResult.secure_url });
  } catch (err) {
    return res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;

