import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

interface RegionCardProps {
  id: number;
  name: string;
  image: string;
  villageCount?: number;
}

const RegionCard: React.FC<RegionCardProps> = ({ 
  id, 
  name,
  image,
  villageCount
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link to={`/region/${id}/villages`}>
      <div 
        className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-primary-200/10 hover:border-primary-300/30 w-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative h-40 overflow-hidden bg-cream-100 shrink-0">
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-linear-to-br from-cream-200 to-primary-200/20 animate-pulse"></div>
          )}
          
          <img 
            src={image} 
            alt={`Crafts from ${name}`}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between min-h-[100px]">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-brown-500 shrink-0" />
              <h3 className="font-headline text-lg font-bold text-brown-800 group-hover:text-brown-700 transition-colors duration-200 line-clamp-2">
                {name}
              </h3>
            </div>
            
            {villageCount && (
              <p className="font-body text-sm text-brown-600">
                {villageCount} {villageCount === 1 ? 'village' : 'villages'}
              </p>
            )}
          </div>
          
          <div className="pt-2 mt-auto">
            <span className="font-body text-xs text-primary-700 group-hover:text-brown-800 transition-colors duration-200 font-medium">
              Explore Villages →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RegionCard;