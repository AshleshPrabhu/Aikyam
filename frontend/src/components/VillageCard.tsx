import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users } from 'lucide-react';

interface VillageCardProps {
  id: number;
  name: string;
  image: string;
  description: string;
  artisanCount?: number;
  region?: string;
}

const VillageCard: React.FC<VillageCardProps> = ({ 
  id, 
  name,
  image,
  description,
  artisanCount,
  region
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link to={`/village/${id}/villagers`}>
      <div 
        className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-200/10 hover:border-primary-300/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-4/3 overflow-hidden bg-cream-100">
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-linear-to-br from-cream-200 to-primary-200/20 animate-pulse"></div>
          )}
          
          <img 
            src={image} 
            alt={`${name} village crafts`}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                <span className="font-body text-sm font-semibold text-brown-800">
                  Explore Village →
                </span>
              </div>
            </div>
          </div>

          {/* Region Badge */}
          {region && (
            <div className="absolute top-3 left-3">
              <span className="bg-white/90 backdrop-blur-sm text-brown-800 text-xs font-body font-semibold px-3 py-1 rounded-full shadow-md">
                {region}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Village Name */}
          <div className="space-y-1">
            <h3 className="font-headline text-xl font-bold text-brown-800 group-hover:text-brown-700 transition-colors duration-200">
              {name}
            </h3>
            
            {region && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-brown-500" />
                <p className="font-body text-xs text-brown-500">
                  {region}
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-body font-semibold text-brown-800 text-sm">Famous Artworks:</h4>
            <p className="font-body text-brown-700 text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>
          
          {/* Artisan Count */}
          {artisanCount && (
            <div className="flex items-center space-x-2 pt-2 border-t border-primary-200/20">
              <Users className="w-4 h-4 text-primary-700" />
              <span className="font-body text-sm text-brown-600">
                {artisanCount} {artisanCount === 1 ? 'artisan' : 'artisans'}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default VillageCard;