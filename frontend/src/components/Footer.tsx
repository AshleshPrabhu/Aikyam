import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart,
  ArrowRight
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brown-800 text-cream-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-brown-800 font-headline text-2xl font-bold">A</span>
            </div>
            <span className="font-headline text-3xl font-bold text-cream-100 tracking-wide">
                AIKYAM
              </span>
            </Link>
            
            <p className="font-body text-cream-200/80 leading-relaxed">
              Connecting artisans with the world, one craft at a time. 
              Discover authentic handmade treasures and support traditional craftsmanship.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-cream-200/10 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Facebook className="w-5 h-5 group-hover:text-brown-800" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-cream-200/10 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 group-hover:text-brown-800" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-cream-200/10 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 group-hover:text-brown-800" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-cream-200/10 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Youtube className="w-5 h-5 group-hover:text-brown-800" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-headline text-xl font-bold text-primary-400 tracking-wide">
              QUICK LINKS
            </h3>
            <ul className="space-y-3">
              {['Products', 'Artisans', 'Categories', 'New Arrivals', 'Best Sellers', 'Gift Cards'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="font-body text-cream-200/80 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-6">
            <h3 className="font-headline text-xl font-bold text-primary-400 tracking-wide">
              SUPPORT
            </h3>
            <ul className="space-y-3">
              {['Help Center', 'Shipping Info', 'Returns', 'Size Guide', 'Track Order', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/support/${item.toLowerCase().replace(' ', '-')}`}
                    className="font-body text-cream-200/80 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-headline text-xl font-bold text-primary-400 tracking-wide">
              GET IN TOUCH
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1 shrink-0" />
                <div className="font-body text-cream-200/80">
                  <p>123 Craft Street</p>
                  <p>Artisan District</p>
                  <p>Mumbai, Maharashtra 400001</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 shrink-0" />
                <a 
                  href="tel:+911234567890" 
                  className="font-body text-cream-200/80 hover:text-primary-400 transition-colors duration-200"
                >
                  +91 12345 67890
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 shrink-0" />
                <a 
                  href="mailto:support@aikyam.com" 
                  className="font-body text-cream-200/80 hover:text-primary-400 transition-colors duration-200"
                >
                  support@aikyam.com
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-cream-200/5 rounded-xl p-4 space-y-3">
              <h4 className="font-body font-semibold text-primary-400">Stay Updated</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="flex-1 px-3 py-2 bg-cream-200/10 border border-cream-200/20 rounded-l-lg text-cream-100 placeholder-cream-200/60 focus:outline-none focus:border-primary-400 font-body text-sm"
                />
                <button className="bg-primary-500 text-brown-800 px-4 py-2 rounded-r-lg hover:bg-brown-800 hover:text-white transition-colors duration-200">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream-200/20 pt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="font-body text-cream-200/80 text-center md:text-left">
                © {currentYear} Aikyam. All rights reserved.
              </p>
              <div className="flex items-center space-x-1 text-cream-200/80">
                <span className="font-body text-sm">Made with</span>
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span className="font-body text-sm">for artisans</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <Link 
                to="/privacy-policy" 
                className="font-body text-cream-200/80 hover:text-primary-400 transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms-of-service" 
                className="font-body text-cream-200/80 hover:text-primary-400 transition-colors duration-200 text-sm"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies-policy" 
                className="font-body text-cream-200/80 hover:text-primary-400 transition-colors duration-200 text-sm"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;