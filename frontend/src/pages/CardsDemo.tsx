import React from 'react';
import VillagerCard from '../components/VillagerCard';
import RegionCard from '../components/RegionCard';
import VillageCard from '../components/VillageCard';

// Sample data for testing the components

const sampleVillagers = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    village: 'Channapatna',
    district: 'Ramanagara',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Master craftsman specializing in traditional Channapatna wooden toys and lacquerware. Has been practicing this art for over 25 years, learned from his father and grandfather.',
    mobile: '+91-9876543210',
    craftsSpecialty: 'Wooden Toys'
  },
  {
    id: 2,
    name: 'Sunita Devi',
    village: 'Madhubani',
    district: 'Madhubani',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Renowned Madhubani painter who creates beautiful traditional paintings on walls, cloth, and paper. Specializes in depicting Hindu deities and nature themes.',
    mobile: '+91-9876543211',
    craftsSpecialty: 'Madhubani Art'
  }
];

const sampleRegions = [
  {
    id: 1,
    name: 'Karnataka Craft Region',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    villageCount: 15
  },
  {
    id: 2,
    name: 'Rajasthan Desert Crafts',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    villageCount: 23
  },
  {
    id: 3,
    name: 'Bengal Handloom Region',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    villageCount: 8
  }
];

const sampleVillages = [
  {
    id: 1,
    name: 'Channapatna',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Famous for its traditional wooden toys and lacquerware. The craft involves turning wood on a lathe and painting with natural dyes.',
    artisanCount: 45,
    region: 'Ramanagara District'
  },
  {
    id: 2,
    name: 'Madhubani',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Known for its vibrant Madhubani paintings featuring mythological themes, nature, and social issues depicted in bright colors.',
    artisanCount: 67,
    region: 'Madhubani District'
  },
  {
    id: 3,
    name: 'Pochampally',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Renowned for its ikat weaving technique and traditional handloom textiles with geometric patterns and vibrant colors.',
    artisanCount: 32,
    region: 'Telangana'
  }
];

const CardsDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="font-headline text-4xl sm:text-5xl font-bold text-brown-800">
            CARDS DEMO
          </h1>
          <p className="font-body text-lg text-brown-600 max-w-3xl mx-auto">
            Demonstration of the new VillagerCard, RegionCard, and VillageCard components
          </p>
        </div>

        {/* Villager Cards Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold text-brown-800 mb-4">
              VILLAGER CARDS
            </h2>
            <p className="font-body text-brown-600">
              Meet the skilled artisans and their craft specialties
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleVillagers.map((villager) => (
              <VillagerCard
                key={villager.id}
                {...villager}
              />
            ))}
          </div>
        </section>

        {/* Region Cards Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold text-brown-800 mb-4">
              REGION CARDS
            </h2>
            <p className="font-body text-brown-600">
              Explore different craft regions across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sampleRegions.map((region) => (
              <RegionCard
                key={region.id}
                {...region}
              />
            ))}
          </div>
        </section>

        {/* Village Cards Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold text-brown-800 mb-4">
              VILLAGE CARDS
            </h2>
            <p className="font-body text-brown-600">
              Discover villages famous for their traditional crafts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleVillages.map((village) => (
              <VillageCard
                key={village.id}
                {...village}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default CardsDemo;