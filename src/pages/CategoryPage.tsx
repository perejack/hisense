import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, Grid3X3, LayoutList, ChevronRight, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories, categoryIcons, formatPrice } from "@/data/products";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
};

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "name">("name");

  const decodedCategory = categoryName ? decodeURIComponent(categoryName) : null;
  const isAllCategory = decodedCategory === "all";
  
  const categoryProducts = useMemo(() => {
    let filtered = decodedCategory && !isAllCategory
      ? products.filter((p) => p.category === decodedCategory)
      : products;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case "name":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    return filtered;
  }, [decodedCategory, searchQuery, sortBy]);

  const otherCategories = isAllCategory ? categories : categories.filter((c) => c !== decodedCategory);

  const categoryStats = useMemo(() => {
    const cats = decodedCategory && !isAllCategory ? [decodedCategory] : categories.slice(0, 3);
    return cats.map(cat => {
      const catProducts = products.filter(p => p.category === cat);
      const avgDiscount = catProducts.reduce((acc, p) => 
        acc + ((p.originalPrice - p.discountedPrice) / p.originalPrice), 0
      ) / catProducts.length;
      return {
        name: cat,
        count: catProducts.length,
        avgDiscount: Math.round(avgDiscount * 100),
        minPrice: Math.min(...catProducts.map(p => p.discountedPrice)),
        maxPrice: Math.max(...catProducts.map(p => p.discountedPrice)),
      };
    });
  }, [decodedCategory, isAllCategory]);

  if (decodedCategory && !categories.includes(decodedCategory) && !isAllCategory) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
          <Link to="/" className="text-primary font-semibold hover:underline">
            ← Back to all products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section for Category */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/20 pt-24 pb-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium">
                {decodedCategory || "All Products"}
              </span>
            </div>

            {/* Title Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>20% OFF Everything</span>
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
                  {!isAllCategory && decodedCategory ? (
                    <span className="flex items-center gap-4">
                      <span className="text-5xl md:text-6xl">{categoryIcons[decodedCategory] || "📦"}</span>
                      {decodedCategory}
                    </span>
                  ) : (
                    "All Products"
                  )}
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-2xl">
                  {decodedCategory && !isAllCategory
                    ? `Explore our premium collection of ${decodedCategory.toLowerCase()}. Quality meets innovation with exclusive discounts.`
                    : "Discover our complete range of premium Hisense electronics. From cutting-edge TVs to smart home appliances."
                  }
                </p>
              </div>

              {/* Stats Cards */}
              <div className="flex flex-wrap gap-3">
                {categoryStats.slice(0, 3).map((stat, idx) => (
                  <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
                    className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl px-5 py-4 min-w-[140px]"
                  >
                    <p className="text-2xl font-bold text-foreground">{stat.count}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Products</p>
                    <p className="text-sm text-primary font-semibold mt-1">Up to {stat.avgDiscount}% off</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="sticky top-[72px] z-30 bg-background/95 backdrop-blur-md border-b border-border/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={`Search ${decodedCategory?.toLowerCase() || 'products'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Sort Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-3 bg-card border border-border/50 rounded-xl hover:border-primary/50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Sort</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border/50 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="p-2">
                    {[
                      { value: "name", label: "Name (A-Z)" },
                      { value: "price-low", label: "Price: Low to High" },
                      { value: "price-high", label: "Price: High to Low" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value as any)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          sortBy === option.value 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "hover:bg-muted"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex bg-card border border-border/50 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>

              {/* Back Button */}
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Link>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-3 text-sm text-muted-foreground">
            Showing {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'}
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-12">
        {categoryProducts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {categoryProducts.map((product, i) => (
              <motion.div key={product.id} variants={itemVariants}>
                {viewMode === "grid" ? (
                  <ProductCard product={product} index={i} />
                ) : (
                  <ListViewCard product={product} />
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or browse other categories
            </p>
          </div>
        )}
      </section>

      {/* Other Categories Section */}
      {decodedCategory && !isAllCategory && (
        <section className="container mx-auto px-4 py-16 border-t border-border/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Explore Other <span className="text-primary">Categories</span>
            </h2>
            <p className="text-muted-foreground">Discover more premium Hisense products</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {otherCategories.map((cat, i) => {
              const count = products.filter((p) => p.category === cat).length;
              return (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => navigate(`/category/${encodeURIComponent(cat)}`)}
                  className="group relative overflow-hidden bg-card border border-border/50 rounded-2xl p-6 text-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[cat]}
                  </div>
                  <p className="font-semibold text-foreground text-sm mb-1">{cat}</p>
                  <p className="text-xs text-muted-foreground">{count} products</p>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              );
            })}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

// List View Card Component
const ListViewCard = ({ product }: { product: typeof products[0] }) => {
  const discount = Math.round(
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
  );

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col sm:flex-row gap-6 bg-card border border-border/50 rounded-2xl p-4 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative w-full sm:w-48 h-48 sm:h-36 bg-muted/50 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">
          -{discount}%
        </span>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              {product.category}
            </p>
            <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 max-w-xl">
              {product.description}
            </p>
          </div>
          
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-bold text-foreground">
              {formatPrice(product.discountedPrice)}
            </p>
            <p className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </p>
            <button className="mt-3 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryPage;
