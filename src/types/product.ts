export type Category = "Electronics" | "Clothing" | "Home";

export interface Product {
  id: string;
  title: string;
  price: number;
  category: Category;
  description: string;
  imageUrl: string;
  rating?: number; // 0-5
}

