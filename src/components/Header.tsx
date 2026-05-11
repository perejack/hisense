import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { categories } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-foreground">
            Hi<span className="text-primary">Sense</span>
          </span>
          <span className="text-xs font-medium text-muted-foreground hidden sm:block">Kenya</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {categories.slice(0, 5).map((cat) => (
            <Link
              key={cat}
              to={`/?category=${encodeURIComponent(cat)}`}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {cat}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+254731173066"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            <Phone className="w-4 h-4" />
            +254 731 173 066
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/?category=${encodeURIComponent(cat)}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary py-2 transition-colors"
                >
                  {cat}
                </Link>
              ))}
              <a
                href="tel:+254731173066"
                className="flex items-center gap-2 text-sm font-semibold text-primary pt-2 border-t border-border"
              >
                <Phone className="w-4 h-4" />
                +254 731 173 066
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
