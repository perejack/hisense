import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categories, categoryIcons, getProductsByCategory } from "@/data/products";

// Import category images
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
};

const CategoriesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/20 pt-24 pb-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Link */}
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {/* Title */}
            <div className="text-center max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              >
                <Sparkles className="w-4 h-4" />
                <span>20% OFF All Categories</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
                Browse <span className="text-primary">Categories</span>
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Explore our wide range of premium Hisense electronics. Click on any category to view products.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {categories.map((cat, i) => {
            const catProducts = getProductsByCategory(cat);
            const avgDiscount = Math.round(
              catProducts.reduce((acc, p) => 
                acc + ((p.originalPrice - p.discountedPrice) / p.originalPrice), 0
              ) / catProducts.length * 100
            );
            
            return (
              <motion.div
                key={cat}
                variants={itemVariants}
                className="group"
              >
                <div className="relative overflow-hidden bg-card border border-border/50 rounded-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={categoryImages[cat]}
                      alt={cat}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-lg">
                      {categoryIcons[cat]}
                    </div>
                    
                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4 bg-destructive/90 backdrop-blur-sm text-destructive-foreground text-xs font-bold px-3 py-1.5 rounded-full">
                      Up to {avgDiscount}% OFF
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {cat}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {catProducts.length} products available
                    </p>
                    
                    {/* View Products Button */}
                    <Link
                      to={`/category/${encodeURIComponent(cat)}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 group/btn"
                    >
                      View Products
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Products Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            to="/category/all"
            className="inline-flex items-center gap-3 px-8 py-4 bg-card border-2 border-border/50 hover:border-primary/50 rounded-xl font-bold text-lg transition-all duration-300 group"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoriesPage;
