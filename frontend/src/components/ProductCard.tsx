import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, MapPin, Eye, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
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
  onAddToWishlist?: (id: number) => void;
  onAddToCart?: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  title, 
  price, 
  originalPrice,
  image, 
  artisan, 
  category,
  rating,
  reviewCount,
  isWishlisted = false,
  onAddToWishlist,
  onAddToCart
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  
  const { addToCart, isInCart } = useCart();

  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    addToCart({
      id,
      name: title,
      price,
      image,
      artisan: artisan.name,
      originalPrice
    });
    
    // Call the optional onAddToCart prop if provided
    onAddToCart?.(id);
    
    // Show "added" feedback
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const inCart = isInCart(id);

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-200/10 hover:border-primary-300/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-linear-to-br from-cream-200 to-primary-200/20 animate-pulse"></div>
        )}
        
        <img 
          src={image} 
          alt={title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay Actions */}
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            {/* Wishlist Button */}
            <button 
              onClick={() => onAddToWishlist?.(id)}
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                isWishlisted 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 backdrop-blur-sm text-brown-600 hover:bg-red-50 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            
            {/* Quick View Button */}
            <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-brown-600 hover:bg-primary-500 hover:text-brown-800 transition-all duration-300">
              <Eye className="w-4 h-4" />
            </button>
          </div>
          
          {/* Quick Add to Cart */}
          <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <button 
              onClick={handleAddToCart}
              className={`w-full py-2 rounded-lg font-body font-semibold transition-all duration-200 shadow-lg backdrop-blur-sm ${
                inCart || justAdded
                  ? 'bg-green-600 text-white'
                  : 'bg-brown-800 text-white hover:bg-brown-900'
              }`}
            >
              {justAdded ? 'ADDED!' : inCart ? 'IN CART' : 'ADD TO CART'}
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          <span className="bg-white/90 backdrop-blur-sm text-brown-800 text-xs font-body font-semibold px-3 py-1 rounded-full shadow-md">
            {category}
          </span>
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs font-body font-semibold px-3 py-1 rounded-full shadow-md">
              {discountPercentage}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Artisan Info */}
        <div className="flex items-center space-x-3">
          {artisan.avatar ? (
            <img 
              src={artisan.avatar} 
              alt={artisan.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-primary-300/30"
            />
          ) : (
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-brown-800 font-body font-semibold text-sm">
                {artisan.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-body text-sm font-medium text-brown-800 truncate">
              {artisan.name}
            </p>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-brown-500" />
              <p className="font-body text-xs text-brown-500 truncate">
                {artisan.location}
              </p>
            </div>
          </div>
        </div>

        {/* Product Title */}
        <Link to={`/product/${id}`} className="block">
          <h3 className="font-body font-semibold text-brown-800 text-lg leading-tight group-hover:text-brown-700 transition-colors duration-200 line-clamp-2 min-h-14">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${
                  i < Math.floor(rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <span className="font-body text-sm text-brown-500">
            {rating.toFixed(1)} ({reviewCount})
          </span>
        </div>
        
        {/* Price and Cart */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-headline text-xl font-bold text-brown-800">
                ₹{price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="font-body text-sm text-brown-500 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="font-body text-xs text-brown-500">
              Free shipping available
            </p>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className={`p-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg group ${
              inCart || justAdded
                ? 'bg-green-600 text-white'
                : 'bg-primary-500 text-brown-800 hover:bg-brown-800 hover:text-white'
            }`}
          >
            {justAdded || inCart ? (
              <Check className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            ) : (
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;