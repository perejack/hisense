import { motion } from "framer-motion";
import { categories } from "@/data/products";

import catTelevisions from "@/assets/cat-televisions.jpg";
import catAirConditioners from "@/assets/cat-air-conditioners.jpg";
import catAudio from "@/assets/cat-audio.jpg";
import catFreezers from "@/assets/cat-freezers.jpg";
import catKitchen from "@/assets/cat-kitchen.jpg";
import catRefrigerators from "@/assets/cat-refrigerators.jpg";
import catWashing from "@/assets/cat-washing.jpg";

const categoryImages: Record<string, string> = {
  "Televisions": catTelevisions,
  "Air Conditioners": catAirConditioners,
  "Audio": catAudio,
  "Freezers": catFreezers,
  "Kitchen Appliances": catKitchen,
  "Refrigerators": catRefrigerators,
  "Washing Machines": catWashing,
};

interface CategoryBarProps {
  selected: string | null;
  onSelect: (cat: string | null) => void;
}

const CategoryBar = ({ selected, onSelect }: CategoryBarProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      <button
        onClick={() => onSelect(null)}
        className={`flex-shrink-0 flex flex-col items-center gap-2 transition-all duration-300 group ${
          selected === null ? "" : "opacity-70 hover:opacity-100"
        }`}
      >
        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 flex items-center justify-center bg-muted ${
          selected === null
            ? "border-primary shadow-lg shadow-primary/20 ring-2 ring-primary/30"
            : "border-border/50 hover:border-primary/50"
        }`}>
          <span className="text-3xl">🏠</span>
        </div>
        <span className={`text-xs font-semibold text-center leading-tight ${
          selected === null ? "text-primary" : "text-muted-foreground"
        }`}>
          All
        </span>
      </button>

      {categories.map((cat, i) => (
        <motion.button
          key={cat}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onSelect(cat === selected ? null : cat)}
          className={`flex-shrink-0 flex flex-col items-center gap-2 transition-all duration-300 group ${
            selected === cat ? "" : "opacity-70 hover:opacity-100"
          }`}
        >
          <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
            selected === cat
              ? "border-primary shadow-lg shadow-primary/20 ring-2 ring-primary/30"
              : "border-border/50 hover:border-primary/50"
          }`}>
            <img
              src={categoryImages[cat]}
              alt={cat}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              width={96}
              height={96}
            />
          </div>
          <span className={`text-xs font-semibold text-center leading-tight max-w-[96px] ${
            selected === cat ? "text-primary" : "text-muted-foreground"
          }`}>
            {cat}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryBar;
