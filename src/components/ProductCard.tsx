import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, ShoppingBag } from "lucide-react";
import { Product, formatPrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const discount = Math.round(
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="group bg-card rounded-2xl overflow-hidden hover-lift border border-border/50 flex flex-col">
        <Link
          to={`/product/${product.id}`}
          className="relative aspect-square bg-muted/50 p-6 flex items-center justify-center overflow-hidden"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-bold px-2.5 py-1 rounded-full">
            -{discount}%
          </span>
        </Link>

        <div className="p-5 flex flex-col flex-1">
          <p className="text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">
            {product.category}
          </p>
          <h3 className="font-semibold text-sm text-foreground leading-snug mb-3 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-xl font-extrabold text-foreground">
              {formatPrice(product.discountedPrice)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          </div>

          <div className="mt-auto flex gap-2">
            <Link
              to={`/product/${product.id}`}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Eye className="w-4 h-4" />
              View Details
            </Link>
            <Link
              to={`/product/${product.id}`}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
