import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { 
  // Filter, 
  Search, 
  Grid3x3, 
  List, 
  SlidersHorizontal,
  // ChevronDown,
  X,
  Loader2
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { mockProducts } from '../../services/productService';

// Types based on backend schema
interface Item {
  id: number;
  name: string;
  amount: number;
  image: string;
  quantity: number;
  sellerId: number;
  seller?: {
    id: number;
    name: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Transformed interface for ProductCard
interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  artisan: {
    name: string;
    location: string;
    avatar?: string;
  };
  category: string;
  rating: number;
  reviewCount: number;
  isWishlisted?: boolean;
}

const categories = [
  'All Categories',
  'Textiles',
  'Pottery',
  'Metalwork',
  'Paintings',
  'Woodwork',
  'Embroidery',
  'Jewelry',
  'Home Decor',
  'Traditional Art'
];

const sortOptions = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' }
];

const priceRanges = [
  { min: 0, max: 1000, label: 'Under ₹1,000' },
  { min: 1000, max: 5000, label: '₹1,000 - ₹5,000' },
  { min: 5000, max: 10000, label: '₹5,000 - ₹10,000' },
  { min: 10000, max: 25000, label: '₹10,000 - ₹25,000' },
  { min: 25000, max: 999999, label: 'Above ₹25,000' }
];

const Products: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPriceRange, setSelectedPriceRange] = useState<any>(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock function to transform Item to Product (since we don't have all data yet)
  const transformItemToProduct = (item: Item): Product => {
    const categories = ['Textiles', 'Pottery', 'Metalwork', 'Paintings', 'Woodwork', 'Embroidery'];
    const locations = ['Mumbai, Maharashtra', 'Delhi, NCR', 'Jaipur, Rajasthan', 'Kolkata, West Bengal', 'Chennai, Tamil Nadu'];
    
    return {
      id: item.id,
      title: item.name,
      price: item.amount,
      originalPrice: item.amount > 2000 ? Math.floor(item.amount * 1.3) : undefined,
      image: item.image,
      artisan: {
        name: item.seller?.name || `Artisan ${item.sellerId}`,
        location: locations[Math.floor(Math.random() * locations.length)],
        avatar: undefined
      },
      category: categories[Math.floor(Math.random() * categories.length)],
      rating: 4.0 + Math.random() * 1.0,
      reviewCount: Math.floor(Math.random() * 200) + 10,
      isWishlisted: false
    };
  };

  // Note: Backend currently only has getItems by sellerId, 
  // We'll need to add getAllItems endpoint later
  useEffect(() => {
    // For now, we'll use mock data that follows our backend schema structure
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // TODO: Replace with actual API call when getAllItems endpoint is ready
        // const response = await fetch('/api/items');
        // const data = await response.json();
        
        // Using mock data from service
        setItems(mockProducts);
        const transformedProducts = mockProducts.map(transformItemToProduct);
        setFilteredProducts(transformedProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort logic
  useEffect(() => {
    let filtered = [...items];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All Categories') {
      // This would need category field in backend
      // For now, we'll filter randomly
    }

    // Price range filter
    if (selectedPriceRange) {
      filtered = filtered.filter(item =>
        item.amount >= selectedPriceRange.min && item.amount <= selectedPriceRange.max
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.amount - b.amount);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        break;
    }

    const transformedFiltered = filtered.map(transformItemToProduct);
    setFilteredProducts(transformedFiltered);
  }, [items, searchQuery, selectedCategory, selectedPriceRange, sortBy]);

  const handleAddToWishlist = (productId: number) => {
    console.log('Added to wishlist:', productId);
    // TODO: Implement wishlist functionality
  };

  const handleAddToCart = (productId: number) => {
    console.log('Added to cart:', productId);
    // TODO: Implement cart functionality
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedPriceRange(null);
    setSortBy('relevance');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-200">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary-700 mx-auto" />
            <p className="font-body text-brown-600">Loading amazing crafts...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream-200">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <p className="font-body text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-200">
      <Header />
      
      {/* Page Header */}
      <section className="bg-white border-b border-primary-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-brown-800">
              DISCOVER
              <span className="text-primary-700"> AUTHENTIC CRAFTS</span>
            </h1>
            <p className="font-body text-lg text-brown-600 max-w-3xl mx-auto">
              Explore our curated collection of handmade treasures, each piece telling 
              a unique story of tradition, skill, and cultural heritage.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-80 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-primary-200/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline text-xl font-bold text-brown-800">FILTERS</h2>
                <button 
                  onClick={clearFilters}
                  className="font-body text-sm text-primary-700 hover:text-brown-800 transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="space-y-3 mb-6">
                <label className="font-body font-semibold text-brown-800 block">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-10"
                  />
                  <Search className="absolute left-60 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brown-500" />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-3 mb-6">
                <label className="font-body font-semibold text-brown-800 block">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="font-body font-semibold text-brown-800 block">Price Range</label>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={selectedPriceRange?.min === range.min}
                        onChange={() => setSelectedPriceRange(range)}
                        className="w-4 h-4 text-primary-700 border-brown-300 focus:ring-primary-200"
                      />
                      <span className="font-body text-sm text-brown-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-primary-200/30 font-body font-medium text-brown-700 hover:bg-primary-50 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                </button>
                
                <div className="flex items-center space-x-2 text-brown-600 font-body text-sm">
                  <span>{filteredProducts.length} products found</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort */}
                <div className="flex items-center space-x-2">
                  <span className="font-body text-sm text-brown-700 hidden sm:block">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input text-sm py-2 min-w-40"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-1 bg-white rounded-lg border border-primary-200/30 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-primary-500 text-brown-800' 
                        : 'text-brown-600 hover:bg-primary-100'
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-primary-500 text-brown-800' 
                        : 'text-brown-600 hover:bg-primary-100'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-white rounded-2xl p-6 shadow-md border border-primary-200/20 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-headline text-lg font-bold text-brown-800">FILTERS</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1 hover:bg-brown-100 rounded-md transition-colors"
                  >
                    <X className="w-5 h-5 text-brown-600" />
                  </button>
                </div>
                
                {/* Mobile filter content - same as desktop but in mobile layout */}
                <div className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brown-500" />
                  </div>

                  {/* Categories */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <div className="flex space-x-2">
                    <button onClick={clearFilters} className="btn btn-secondary flex-1">
                      Clear Filters
                    </button>
                    <button 
                      onClick={() => setShowFilters(false)} 
                      className="btn btn-primary flex-1"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="space-y-4">
                  <div className="w-24 h-24 bg-primary-200/30 rounded-full flex items-center justify-center mx-auto">
                    <Search className="w-8 h-8 text-brown-600" />
                  </div>
                  <h3 className="font-headline text-xl font-bold text-brown-800">No products found</h3>
                  <p className="font-body text-brown-600">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                  <button onClick={clearFilters} className="btn btn-primary">
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' 
                  : 'space-y-6'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onAddToWishlist={handleAddToWishlist}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className="btn btn-secondary px-8">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;