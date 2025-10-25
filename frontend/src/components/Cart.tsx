import React from 'react';
import { 
  X, 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowRight,
  // Heart,
  // Star
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCart();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleProceedToPayment = () => {
    // TODO: Implement payment integration
    console.log('Proceeding to payment with items:', items);
    alert('Payment functionality will be implemented soon!');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - only for mobile */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className={`fixed top-0 right-0 h-full bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } w-full lg:w-1/2`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary-200/20 bg-cream-25">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-brown-800 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-headline text-xl font-bold text-brown-800">Shopping Cart</h2>
              <p className="font-body text-sm text-brown-600">
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 bg-white rounded-lg hover:bg-cream-25 transition-colors border border-primary-200/20"
          >
            <X className="w-5 h-5 text-brown-600" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            /* Empty Cart */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-brown-400" />
              </div>
              <h3 className="font-headline text-lg font-bold text-brown-800 mb-2">
                Your cart is empty
              </h3>
              <p className="font-body text-brown-600 mb-6 max-w-sm">
                Discover amazing handcrafted items and add them to your cart to get started.
              </p>
              <button
                onClick={onClose}
                className="bg-brown-800 text-white px-6 py-3 rounded-lg font-body font-semibold hover:bg-brown-900 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-white border border-primary-200/20 rounded-lg p-4 shadow-sm">
                    <div className="flex space-x-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-cream-100 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-body font-semibold text-brown-800 truncate">
                              {item.name}
                            </h3>
                            <p className="font-body text-sm text-brown-600 mb-2">
                              by {item.artisan}
                            </p>
                            
                            {/* Price */}
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="font-headline text-lg font-bold text-brown-800">
                                ₹{item.price.toLocaleString()}
                              </span>
                              {item.originalPrice && item.originalPrice > item.price && (
                                <>
                                  <span className="font-body text-sm text-brown-500 line-through">
                                    ₹{item.originalPrice.toLocaleString()}
                                  </span>
                                  <span className="font-body text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-brown-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-cream-100 rounded-lg flex items-center justify-center hover:bg-cream-200 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-brown-600" />
                            </button>
                            <span className="font-body font-semibold text-brown-800 min-w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-cream-100 rounded-lg flex items-center justify-center hover:bg-cream-200 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-brown-600" />
                            </button>
                          </div>
                          
                          {/* Subtotal */}
                          <span className="font-headline text-lg font-bold text-brown-800">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Cart Summary & Actions */}
              <div className="border-t border-primary-200/20 bg-cream-25 p-4 space-y-4">
                {/* Clear Cart Button */}
                <button
                  onClick={clearCart}
                  className="w-full text-red-600 hover:text-red-700 font-body text-sm underline"
                >
                  Clear entire cart
                </button>
                
                {/* Price Summary */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-brown-600">Subtotal ({getTotalItems()} items)</span>
                    <span className="font-body font-semibold text-brown-800">
                      ₹{getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-brown-600">Shipping</span>
                    <span className="font-body text-green-600 font-semibold">FREE</span>
                  </div>
                  <div className="border-t border-primary-200/20 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-headline text-lg font-bold text-brown-800">Total</span>
                      <span className="font-headline text-xl font-bold text-brown-800">
                        ₹{getTotalPrice().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleProceedToPayment}
                    className="w-full bg-brown-800 text-white py-4 font-body font-semibold text-lg hover:bg-brown-900 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="w-full bg-white text-brown-800 py-3 border border-primary-200/30 font-body font-semibold hover:bg-cream-25 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;