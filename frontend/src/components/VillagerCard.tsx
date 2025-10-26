import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Eye } from 'lucide-react';

interface VillagerCardProps {
  id: string | number;
  name: string;
  village?: string;
  district?: string;
  photo?: string;
  description?: string;
  mobile?: string;
  phone?: string;
  craftsSpecialty?: string;
  categories?: string[];
  summary?: string;
}

const VillagerCard: React.FC<VillagerCardProps> = ({ 
  id, 
  name,
  village,
  district,
  photo,
  description,
  mobile,
  phone,
  craftsSpecialty,
  categories,
  summary
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  // Use phone or mobile (backend sends 'phone', mock data uses 'mobile')
  const contactNumber = phone || mobile;
  // Use description or summary (backend sends 'summary', mock data uses 'description')
  const displayDescription = description || summary;
  // Use categories or craftsSpecialty
  const crafts = categories?.join(', ') || craftsSpecialty;

  const handleContactClick = () => {
    setShowMobile(!showMobile);
  };

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-200/10 hover:border-primary-300/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photo Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-cream-100">
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-linear-to-br from-cream-200 to-primary-200/20 animate-pulse"></div>
        )}
        
        <img 
          src={photo} 
          alt={name}
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
            {/* View Profile Button */}
            <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-brown-600 hover:bg-primary-500 hover:text-brown-800 transition-all duration-300">
              <Eye className="w-4 h-4" />
            </button>
          </div>
          
          {/* Contact Button Overlay */}
          <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <button 
              onClick={handleContactClick}
              className="w-full py-2 rounded-lg font-body font-semibold transition-all duration-200 shadow-lg backdrop-blur-sm bg-brown-800 text-white hover:bg-brown-900"
            >
              {showMobile ? contactNumber : 'CONTACT HIM'}
            </button>
          </div>
        </div>

        {/* Specialty Badge */}
        {crafts && (
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-brown-800 text-xs font-body font-semibold px-3 py-1 rounded-full shadow-md">
              {crafts}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Villager Info */}
        <div className="space-y-2">
          <Link to={`/villager/${id}`} className="block">
            <h3 className="font-headline text-xl font-bold text-brown-800 group-hover:text-brown-700 transition-colors duration-200">
              {name}
            </h3>
          </Link>
          
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-brown-500" />
            <p className="font-body text-sm text-brown-600">
              {village ? `${village}${district ? `, ${district}` : ''}` : 'Location'}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h4 className="font-body font-semibold text-brown-800 text-sm">Arts & Crafts:</h4>
          <p className="font-body text-brown-700 text-sm leading-relaxed line-clamp-3">
            {displayDescription || 'No description available'}
          </p>
        </div>
        
        {/* Contact Button */}
        <div className="pt-2">
          <button 
            onClick={handleContactClick}
            className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-body font-semibold transition-all duration-200 shadow-md hover:shadow-lg ${
              showMobile 
                ? 'bg-green-600 text-white' 
                : 'bg-primary-500 text-brown-800 hover:bg-brown-800 hover:text-white'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>{showMobile ? contactNumber : 'Contact Him'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VillagerCard;