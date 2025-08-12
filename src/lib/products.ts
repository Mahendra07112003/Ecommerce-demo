import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "running-shoes",
    title: "Running Shoes",
    price: 99,
    category: "Clothing",
    description: "Lightweight running shoes engineered for comfort and speed.",
    imageUrl: "/images/running shoes.png",
    rating: 4.5,
  },
  {
    id: "wireless-headphones",
    title: "Wireless Headphones",
    price: 199,
    category: "Electronics",
    description: "Noise-cancelling over-ear headphones with 30h battery life.",
    imageUrl: "/images/headphones.png",
    rating: 4.7,
  },
  {
    id: "backpack",
    title: "Backpack",
    price: 89,
    category: "Home",
    description: "Durable everyday backpack with multiple compartments.",
    imageUrl: "/images/backpack.png",
    rating: 4.2,
  },
  {
    id: "smartwatch",
    title: "Smartwatch",
    price: 249,
    category: "Electronics",
    description: "Track your health metrics and notifications on the go.",
    imageUrl: "/images/smartwatch.png",
    rating: 4.6,
  },
  {
    id: "sunglasses",
    title: "Sunglasses",
    price: 149,
    category: "Clothing",
    description: "Polarized lenses with UV protection and a classic frame.",
    imageUrl: "/images/sunglasses.png",
    rating: 4.1,
  },
  {
    id: "digital-camera",
    title: "Digital Camera",
    price: 499,
    category: "Electronics",
    description: "Compact mirrorless camera for high-quality photos.",
    imageUrl: "/images/camera.png",
    rating: 4.4,
  },
  {
    id: "t-shirt",
    title: "T-shirt",
    price: 29,
    category: "Clothing",
    description: "Soft cotton t-shirt with a relaxed fit.",
    imageUrl: "/images/tshirt.png",
    rating: 4.0,
  },
  {
    id: "smartphone",
    title: "Smartphone",
    price: 699,
    category: "Electronics",
    description: "Flagship smartphone with stunning display and great cameras.",
    imageUrl: "/images/smartphone.png",
    rating: 4.8,
  },
];

export const categories = ["All", "Electronics", "Clothing", "Home"] as const;

