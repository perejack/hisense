import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Phone, CreditCard, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductById, getProductsByCategory, formatPrice } from "@/data/products";

const PHONE = "+254731173066";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <Link to="/" className="text-primary font-semibold hover:underline">← Back to shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100);
  const savings = product.originalPrice - product.discountedPrice;
  const related = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);
  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in ordering: ${product.name} at ${formatPrice(product.discountedPrice)}`);
  const installmentMsg = encodeURIComponent(`Hi, I'd like to inquire about Lipa Pole Pole (installment plan) for: ${product.name} at ${formatPrice(product.discountedPrice)}`);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to all products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="sticky top-24 bg-muted/30 rounded-3xl p-8 md:p-12 flex items-center justify-center aspect-square border border-border/50">
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src={product.imageUrl}
                alt={product.name}
                className="w-4/5 h-4/5 object-contain"
              />
              <span className="absolute top-6 right-6 bg-destructive text-destructive-foreground text-sm font-bold px-4 py-2 rounded-full">
                Save {discount}%
              </span>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <span className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
              {product.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
              {product.name}
            </h1>

            <p className="text-muted-foreground leading-relaxed mb-8 text-base">
              {product.description}
            </p>

            {/* Pricing */}
            <div className="bg-accent/50 rounded-2xl p-6 mb-8 border border-primary/10">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-extrabold text-foreground">
                  {formatPrice(product.discountedPrice)}
                </span>
                <span className="text-lg text-muted-foreground line-through mb-1">
                  {formatPrice(product.originalPrice)}
                </span>
              </div>
              <p className="text-sm font-semibold text-primary">
                You save {formatPrice(savings)} with our exclusive discount!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mb-8">
              <a
                href={`https://wa.me/${PHONE.replace("+", "")}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp/90 text-card px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-whatsapp/20 hover:shadow-xl hover:shadow-whatsapp/30 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-6 h-6" />
                Order via WhatsApp
              </a>

              <a
                href={`tel:${PHONE}`}
                className="flex items-center justify-center gap-3 bg-call hover:bg-call/90 text-card px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-call/20 hover:shadow-xl hover:shadow-call/30 hover:-translate-y-0.5"
              >
                <Phone className="w-6 h-6" />
                Call to Order: {PHONE.replace("+254", "0")}
              </a>

              <a
                href={`https://wa.me/${PHONE.replace("+", "")}?text=${installmentMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-installment hover:bg-installment/90 text-card px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-installment/20 hover:shadow-xl hover:shadow-installment/30 hover:-translate-y-0.5"
              >
                <CreditCard className="w-6 h-6" />
                Lipa Pole Pole – Easy Installments
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: ShieldCheck, label: "Genuine Product" },
                { icon: Truck, label: "Fast Delivery" },
                { icon: RotateCcw, label: "Easy Returns" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 border border-border/50">
                  <Icon className="w-6 h-6 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground text-center">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-extrabold text-foreground mb-8">
              More in <span className="text-primary">{product.category}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
