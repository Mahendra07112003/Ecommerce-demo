import { Facebook, Twitter, Instagram } from "lucide-react";


export default function Footer() {
  return (
    <footer className="text-white mt-16" style={{ backgroundColor: "var(--primary-dark)" }}>
      <div className="mx-auto max-w-7xl px-8 py-10 grid gap-8 sm:md:grid-cols-3  justify-center">
        <div>
          <h4 className="font-semibold mb-3">Filters</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li>All</li>
            <li>Electronics</li>
            <li>Clothing</li>
            <li>Home</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">About Us</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex items-center gap-4">
              <Facebook size={20}  />
              <Twitter size={20} />
              <Instagram size={20} />
          </div>
        </div>
      </div>
      <div className="border-t border-blue-800">
        <div className="mx-auto max-w-7xl px-4 py-4 text-sm opacity-80">© 2024 American. All rights reserved.</div>
      </div>
    </footer>
  );
}

