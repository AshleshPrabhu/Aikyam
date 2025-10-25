import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  Share2,
  Star,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Award,
  MapPin,
  Phone,
  MessageCircle,
  ChevronRight,
  Plus,
  Minus,
  Loader2,
  Check,
  Info
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { useCart } from '../../contexts/CartContext';

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

interface ProductDetail extends Item {
  description?: string;
  images?: string[];
  category?: string;
  materials?: string[];
  dimensions?: string;
  weight?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
}

interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  images?: string[];
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'description' | 'reviews' | 'shipping'>('description');
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [justAdded, setJustAdded] = useState(false);
  
  const { addToCart, isInCart } = useCart();

  // Mock function to fetch product details
  // TODO: Replace with actual API call when backend endpoint is ready
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        
        // Mock API call - replace with actual backend call
        // const response = await fetch(`/api/items/${id}`);
        // const data = await response.json();
        
        // Mock product data
        const mockProduct: ProductDetail = {
          id: parseInt(id || '1'),
          name: "Handwoven Kashmiri Pashmina Shawl",
          amount: 8500,
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          images: [
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1566212893617-6f30b2e6e0a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          ],
          quantity: 5,
          sellerId: 1,
          seller: { 
            id: 1, 
            name: "Rajesh Kumar", 
            phone: "+91-9876543210" 
          },
          description: "This exquisite Kashmiri Pashmina shawl is handwoven by skilled artisans in the pristine valleys of Kashmir. Made from the finest cashmere wool, this shawl represents centuries of traditional craftsmanship. Each piece is unique, featuring intricate patterns that tell the story of Kashmir's rich cultural heritage. The soft, luxurious texture and warmth make it perfect for both special occasions and everyday elegance.",
          category: "Textiles",
          materials: ["100% Pure Cashmere", "Natural Dyes", "Traditional Weaving"],
          dimensions: "200cm x 70cm",
          weight: "150 grams",
          rating: 4.8,
          reviewCount: 156,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          reviews: [
            {
              id: 1,
              userId: 1,
              userName: "Priya Sharma",
              rating: 5,
              comment: "Absolutely beautiful shawl! The quality is exceptional and the craftsmanship is evident in every thread. Highly recommended!",
              createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 2,
              userId: 2,
              userName: "Amit Verma",
              rating: 4,
              comment: "Great product, very soft and warm. Perfect for the winter season. Fast delivery too!",
              createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
            }
          ]
        };

        setProduct(mockProduct);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  // Mock related products
  useEffect(() => {
    const mockRelatedProducts = [
      {
        id: 2,
        title: 'Blue Pottery Decorative Vase Set',
        price: 3200,
        originalPrice: 4500,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        artisan: { name: 'Priya Sharma', location: 'Jaipur, Rajasthan' },
        category: 'Pottery',
        rating: 4.6,
        reviewCount: 89,
        isWishlisted: false
      },
      {
        id: 3,
        title: 'Brass Handicraft Dancing Ganesha',
        price: 5600,
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        artisan: { name: 'Vikram Patel', location: 'Moradabad, UP' },
        category: 'Metalwork',
        rating: 4.9,
        reviewCount: 234,
        isWishlisted: false
      }
    ];
    setRelatedProducts(mockRelatedProducts);
  }, []);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Add multiple quantities if user selected more than 1
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.amount,
        image: product.image,
        artisan: product.seller?.name || 'Unknown Artisan'
      });
    }
    
    // Show "added" feedback
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuyNow = () => {
    console.log(`Buy now: ${quantity} items`);
    // TODO: Implement buy now functionality
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    console.log(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
    // TODO: Implement wishlist functionality
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out this amazing craft: ${product?.name}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-200">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary-700 mx-auto" />
            <p className="font-body text-brown-600">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-cream-200">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <p className="font-body text-red-600">{error || 'Product not found'}</p>
            <Link to="/products" className="btn btn-primary">
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-200">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-primary-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm font-body">
            <Link to="/" className="text-brown-600 hover:text-primary-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-brown-400" />
            <Link to="/products" className="text-brown-600 hover:text-primary-700 transition-colors">
              Products
            </Link>
            <ChevronRight className="w-4 h-4 text-brown-400" />
            <span className="text-brown-800 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg border border-primary-200/20">
              <img
                src={product.images?.[selectedImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? 'border-primary-500 shadow-md'
                        : 'border-primary-200/30 hover:border-primary-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs font-body font-semibold px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-800 leading-tight">
                    {product.name}
                  </h1>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleWishlistToggle}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      isWishlisted
                        ? 'bg-red-50 border-red-200 text-red-600'
                        : 'bg-white border-primary-200/30 text-brown-600 hover:border-red-200 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 bg-white border-2 border-primary-200/30 text-brown-600 rounded-xl hover:border-primary-300 hover:text-primary-700 transition-all duration-200"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-body text-brown-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline space-x-3">
                  <span className="font-headline text-3xl font-bold text-brown-800">
                    ₹{product.amount.toLocaleString()}
                  </span>
                  <span className="font-body text-green-600 font-medium">
                    Free shipping
                  </span>
                </div>
                <p className="font-body text-sm text-brown-600">
                  Inclusive of all taxes
                </p>
              </div>
            </div>

            {/* Artisan Info */}
            <div className="bg-white rounded-2xl p-6 border border-primary-200/20">
              <h3 className="font-headline text-lg font-bold text-brown-800 mb-4">ARTISAN INFO</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-brown-800 font-body font-bold text-lg">
                    {product.seller?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-body font-semibold text-brown-800">{product.seller?.name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1 text-brown-600">
                      <MapPin className="w-4 h-4" />
                      <span className="font-body text-sm">Kashmir, India</span>
                    </div>
                    <div className="flex items-center space-x-1 text-brown-600">
                      <Award className="w-4 h-4" />
                      <span className="font-body text-sm">Verified Artisan</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                {product.quantity > 0 ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="font-body text-green-600 font-medium">
                      In Stock ({product.quantity} available)
                    </span>
                  </>
                ) : (
                  <>
                    <Info className="w-5 h-5 text-red-600" />
                    <span className="font-body text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="font-body font-semibold text-brown-800">Quantity:</span>
                <div className="flex items-center border-2 border-primary-200/30 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-primary-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4 text-brown-600" />
                  </button>
                  <span className="px-4 py-2 font-body font-semibold text-brown-800 bg-white min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                    className="p-2 hover:bg-primary-100 transition-colors"
                    disabled={quantity >= product.quantity}
                  >
                    <Plus className="w-4 h-4 text-brown-600" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.quantity === 0}
                    className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-body font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      justAdded || isInCart(product.id)
                        ? 'bg-green-600 text-white border-2 border-green-600'
                        : 'bg-white border-2 border-brown-800 text-brown-800 hover:bg-brown-800 hover:text-white'
                    }`}
                  >
                    {justAdded || isInCart(product.id) ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <ShoppingCart className="w-5 h-5" />
                    )}
                    <span>
                      {justAdded ? 'ADDED!' : isInCart(product.id) ? 'IN CART' : 'ADD TO CART'}
                    </span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={product.quantity === 0}
                    className="bg-brown-800 text-white px-6 py-3 rounded-xl font-body font-semibold hover:bg-brown-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white rounded-lg border border-primary-200/20">
                <Truck className="w-6 h-6 text-primary-700 mx-auto mb-2" />
                <span className="font-body text-xs text-brown-700 font-medium">Free Shipping</span>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-primary-200/20">
                <RotateCcw className="w-6 h-6 text-primary-700 mx-auto mb-2" />
                <span className="font-body text-xs text-brown-700 font-medium">Easy Returns</span>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-primary-200/20">
                <Shield className="w-6 h-6 text-primary-700 mx-auto mb-2" />
                <span className="font-body text-xs text-brown-700 font-medium">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl border border-primary-200/20 overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-primary-200/20">
              <div className="flex">
                {[
                  { key: 'description', label: 'Description' },
                  { key: 'reviews', label: `Reviews (${product.reviewCount})` },
                  { key: 'shipping', label: 'Shipping & Returns' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key as any)}
                    className={`px-6 py-4 font-body font-semibold transition-colors border-b-2 ${
                      selectedTab === tab.key
                        ? 'text-primary-700 border-primary-700 bg-primary-50'
                        : 'text-brown-600 border-transparent hover:text-primary-700 hover:bg-primary-25'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 lg:p-8">
              {selectedTab === 'description' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-headline text-xl font-bold text-brown-800 mb-4">PRODUCT DESCRIPTION</h3>
                    <p className="font-body text-brown-700 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-body font-semibold text-brown-800 mb-3">Materials</h4>
                      <ul className="space-y-2">
                        {product.materials?.map((material, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            <span className="font-body text-brown-700">{material}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-body font-semibold text-brown-800 mb-3">Specifications</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-body text-brown-600">Dimensions:</span>
                          <span className="font-body text-brown-800">{product.dimensions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-body text-brown-600">Weight:</span>
                          <span className="font-body text-brown-800">{product.weight}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-body text-brown-600">Category:</span>
                          <span className="font-body text-brown-800">{product.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-headline text-xl font-bold text-brown-800 mb-4">CUSTOMER REVIEWS</h3>
                    
                    {/* Reviews Summary */}
                    <div className="bg-cream-100 rounded-xl p-6 mb-6">
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="font-headline text-3xl font-bold text-brown-800">{product.rating}</div>
                          <div className="flex items-center justify-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating || 0)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="font-body text-sm text-brown-600 mt-1">
                            {product.reviewCount} reviews
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-4">
                      {product.reviews?.map((review) => (
                        <div key={review.id} className="border-b border-primary-200/20 pb-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                              <span className="text-brown-800 font-body font-semibold text-sm">
                                {review.userName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="font-body font-semibold text-brown-800">{review.userName}</span>
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="font-body text-sm text-brown-600">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="font-body text-brown-700">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'shipping' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-headline text-xl font-bold text-brown-800 mb-4">SHIPPING & RETURNS</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-body font-semibold text-brown-800 mb-3 flex items-center space-x-2">
                          <Truck className="w-5 h-5 text-primary-700" />
                          <span>Shipping Information</span>
                        </h4>
                        <ul className="space-y-2 font-body text-brown-700">
                          <li>• Free shipping on all orders</li>
                          <li>• Delivery within 5-7 business days</li>
                          <li>• Express shipping available</li>
                          <li>• International shipping available</li>
                          <li>• Secure packaging guaranteed</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-body font-semibold text-brown-800 mb-3 flex items-center space-x-2">
                          <RotateCcw className="w-5 h-5 text-primary-700" />
                          <span>Return Policy</span>
                        </h4>
                        <ul className="space-y-2 font-body text-brown-700">
                          <li>• 30-day return policy</li>
                          <li>• Items must be in original condition</li>
                          <li>• Free return shipping</li>
                          <li>• Full refund guaranteed</li>
                          <li>• Easy online return process</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="text-center space-y-4 mb-8">
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-brown-800">
                RELATED
                <span className="text-primary-700"> CRAFTS</span>
              </h2>
              <p className="font-body text-brown-600 max-w-2xl mx-auto">
                Discover more beautiful handmade products that complement your selection
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToWishlist={(id: number) => console.log('Wishlist:', id)}
                  onAddToCart={(id: number) => console.log('Cart:', id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;