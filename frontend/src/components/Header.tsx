import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu, X, Heart } from 'lucide-react';
import AuthDialog from './AuthDialog';
// import Cart from './Cart';
// import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  isLoggedIn?: boolean;
  userProfile?: {
    name: string;
    avatar?: string;
  };
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn = false, userProfile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  // const [isCartOpen, setIsCartOpen] = useState(false);
  
  // const { getTotalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality will be implemented later
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white shadow-sm border-b border-primary-200/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-headline text-2xl font-bold">A</span>
            </div>
            <span className="font-headline text-3xl font-bold text-brown-800 tracking-wide">
              AIKYAM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/regions" 
              className="font-body font-medium text-brown-700 hover:text-primary-700 transition-colors duration-200"
            >
              REGIONS
            </Link>
            {/* <Link 
              to="/orders" 
              className="font-body font-medium text-brown-700 hover:text-primary-700 transition-colors duration-200"
            >
              ORDERS
            </Link> */}
            <Link 
              to="/support" 
              className="font-body font-medium text-brown-700 hover:text-primary-700 transition-colors duration-200"
            >
              SUPPORT
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Search your favorite regions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-12 pr-4 rounded-lg border border-primary-200/30 focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-200/20 bg-white font-body"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brown-600" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 px-3 py-1 rounded-md hover:bg-primary-700 hover:text-white transition-colors duration-200"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button className="p-2 text-brown-700 hover:text-primary-700 transition-colors duration-200">
              <Heart className="w-5 h-5" />
            </button>

            {/* Cart */}
            {/* <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-brown-700 hover:text-primary-700 transition-colors duration-200"
            >
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-body font-semibold">
                  {getTotalItems() > 99 ? '99+' : getTotalItems()}
                </span>
              )}
            </button> */}

            {/* Auth Section */}
            {isLoggedIn && userProfile ? (
              <div className="flex items-center space-x-2">
                {userProfile.avatar ? (
                  <img 
                    src={userProfile.avatar} 
                    alt={userProfile.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary-200"
                  />
                ) : (
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-brown-800" />
                  </div>
                )}
                <Link 
                  to="/profile"
                  className="hidden sm:block font-body font-medium text-brown-800 hover:text-primary-700 transition-colors duration-200"
                >
                  {userProfile.name}
                </Link>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthDialogOpen(true)}
                className="bg-primary-500 text-brown-800 px-6 py-3 rounded-lg font-body font-semibold hover:bg-primary-700 hover:text-white transition-all duration-300 shadow-lg text-sm"
              >
                SIGN IN
              </button>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-brown-700 hover:text-primary-700"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-primary-200/20 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4 relative">
              <input
                type="text"
                placeholder="Search authentic crafts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-12 pr-4 rounded-lg border border-primary-200/30 focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-200/20 bg-white font-body"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brown-600" />
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-3">
              <Link 
                to="/regions" 
                className="block font-body font-medium text-brown-700 hover:text-primary-700 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                REGIONS
              </Link>
              {/* <Link 
                to="/orders" 
                className="block font-body font-medium text-brown-700 hover:text-primary-700 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ORDERS
              </Link> */}
              <Link 
                to="/support" 
                className="block font-body font-medium text-brown-700 hover:text-primary-700 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SUPPORT
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Auth Dialog */}
      <AuthDialog 
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
        initialMode="signin"
      />

      {/* Cart */}
      {/* <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      /> */}
    </header>
  );
};



export default Header;