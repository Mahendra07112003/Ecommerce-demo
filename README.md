# 🛍️ Ecommerce Demo

A responsive e-commerce web application built with **Next.js 14**, **TypeScript**, and **Tailwind CSS** as part of the **Whatbytes Frontend Assignment**.  
It features product listing, filtering, search, product detail pages, and a functional shopping cart with persistent state.

🚀 **Live Demo:** [View on Vercel](https://ecommerce-demo-black-seven.vercel.app/)

---

## 📌 Features

### **Home Page (/**)
- Responsive product grid: **3 columns** on desktop, **2** on tablet, **1** on mobile.
- Category filter and price range slider.
- Search bar with instant filtering.
- URL-based filters (e.g., `?category=electronics&price=0-500&q=phone`).
- Quick "Add to Cart" button on each product card.
- Dynamic badge count for cart items.

### **Product Detail Page (/product/[id])**
- Large product image display.
- Product title, price, description, category.
- Quantity selector and add-to-cart button.
- Optional star rating display.

### **Cart Page (/cart)**
- List of all items added to cart.
- Quantity update controls.
- Remove item option.
- Price summary.
- State persisted in **localStorage**.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [lucide-react](https://lucide.dev/)
- **State Management:** Zustand
- **Deployment:** [Vercel](https://vercel.com/)

---

## 📂 Folder Structure

```
src/
 ├── app/                # App Router pages
 │    ├── cart/           # Cart page
 │    ├── product/[id]/   # Product detail page
 │    ├── layout.tsx      # Root layout
 │    ├── page.tsx        # Home page
 │    └── globals.css     # Global styles
 ├── components/          # Reusable UI components
 ├── lib/                 # Product data and helpers
 ├── store/               # State management files
 └── types/               # TypeScript type definitions
public/
 ├── images/              # Product images
 └── icons                # UI icons
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/Ecommerce-demo.git
cd Ecommerce-demo
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create env file
Copy `.env.example` to `.env` and fill values.

### 4️⃣ Run the development servers
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build for Production
```bash
npm run build
npm run start
```

---

## 🔌 Backend API (Express + MongoDB)

Runs alongside Next.js via `npm run dev`. Standalone:

```bash
npm run start:server
```

### REST Endpoints
- `POST /api/auth/register` – create user (admin or customer)
- `POST /api/auth/login` – login, sets cookie and returns token
- `POST /api/auth/logout` – clear session
- `GET /api/products` – list products (q, category, minPrice, maxPrice)
- `GET /api/products/:id` – product detail
- `POST /api/products` – create (admin)
- `PUT /api/products/:id` – update (admin)
- `DELETE /api/products/:id` – delete (admin)
- `POST /api/orders` – create order (customer)
- `GET /api/orders/me` – my orders
- `GET /api/orders` – all orders (admin)
- `GET /api/cart` – get my cart
- `POST /api/cart/items` – add/update item
- `DELETE /api/cart/items/:productId` – remove item
- `DELETE /api/cart` – clear cart
- `POST /api/upload` – upload image (admin, optional Cloudinary)

### Environment Variables
See `.env.example` for all required variables:
- `MONGO_URI`, `JWT_SECRET`, `PORT`, `CLIENT_ORIGIN`, `NEXT_PUBLIC_API_BASE_URL`, and optional Cloudinary credentials.

---

## 📜 Assignment Requirements Fulfilled
- ✅ Product listing with responsive design.
- ✅ Filters (category, price).
- ✅ Search functionality.
- ✅ Product detail page.
- ✅ Shopping cart with persistent state.
- ✅ Dynamic routing with Next.js.
- ✅ Deployment to Vercel.

---

## 📄 License
This project is licensed under the MIT License.

---
