import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { categories } from "@/data/products";

const Footer = () => (
  <footer className="bg-foreground mt-20">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <span className="text-2xl font-extrabold tracking-tight" style={{ color: "white" }}>
            Hi<span className="text-primary">Sense</span>
          </span>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Premium electronics for the modern Kenyan home. Quality you can trust, prices you'll love.
          </p>
          <a href="tel:+254731173066" className="flex items-center gap-2 mt-4 text-primary font-semibold text-sm">
            <Phone className="w-4 h-4" /> +254 731 173 066
          </a>
        </div>
        <div>
          <h4 className="font-bold mb-4" style={{ color: "white" }}>Categories</h4>
          <div className="flex flex-col gap-2">
            {categories.map(cat => (
              <Link key={cat} to={`/?category=${encodeURIComponent(cat)}`} className="text-sm hover:text-primary transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4" style={{ color: "white" }}>Order Now</h4>
          <div className="flex flex-col gap-3">
            <a href="https://wa.me/254731173066" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-whatsapp">
              Order via WhatsApp
            </a>
            <a href="tel:+254731173066" className="text-sm font-semibold text-call">
              Call to Order
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/20 mt-12 pt-6 text-center text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
        © {new Date().getFullYear()} Hisense Kenya. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
