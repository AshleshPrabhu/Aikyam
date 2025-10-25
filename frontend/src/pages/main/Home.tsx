import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import RegionCard from '../../components/RegionCard';
import Footer from '../../components/Footer';
import { Sparkles, TrendingUp, Award, Users, MapPin } from 'lucide-react';

// Sample featured regions data
const featuredRegions = [
  {
    id: 1,
    name: 'Mysore Region',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    villageCount: 15
  },
  {
    id: 2,
    name: 'Jaipur Region',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    villageCount: 23
  },
  {
    id: 3,
    name: 'Kutch Region',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    villageCount: 25
  },
  {
    id: 4,
    name: 'Madhubani Region',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    villageCount: 18
  },
  {
    id: 5,
    name: 'Murshidabad Region',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    villageCount: 8
  },
  {
    id: 6,
    name: 'Channapatna Region',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    villageCount: 12
  }
];

const Home: React.FC = () => {
  // Multilingual text for the CTA button
  const ctaButtonTexts = [
    { text: "BECOME AN ARTISAN", lang: "English" },
    { text: "कारीगर बनें", lang: "Hindi" },
    { text: "ಕರಕುಶಲಿಯಾಗಿ", lang: "Kannada" },
    { text: "కళాకారుడవ్వండి", lang: "Telugu" }
  ];

  const [currentCTAIndex, setCurrentCTAIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCTAIndex((prevIndex) => (prevIndex + 1) % ctaButtonTexts.length);
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-cream-200">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Regions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary-500/10 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 text-primary-700" />
              <span className="font-body text-sm font-medium text-primary-700">
                Craft Heritage
              </span>
            </div>
            
            <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-brown-800">
              FEATURED
              <span className="text-primary-700"> REGIONS</span>
            </h2>
            
            <p className="font-body text-lg text-brown-700 max-w-3xl mx-auto leading-relaxed">
              Explore India's rich craft heritage across different regions. Each region tells 
              a unique story of traditional artistry, cultural significance, and skilled craftsmanship 
              passed down through generations.
            </p>
          </div>

          {/* Regions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredRegions.map((region) => (
              <RegionCard
                key={region.id}
                {...region}
              />
            ))}
          </div>

          {/* View All Regions Button */}
          <div className="text-center">
            <button 
              onClick={() => window.location.href = '/regions'}
              className="bg-brown-800 text-white px-8 py-4 rounded-xl font-body font-semibold text-lg hover:bg-brown-900 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              EXPLORE ALL REGIONS
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="font-headline text-4xl sm:text-5xl font-bold text-brown-800">
              WHY CHOOSE
              <span className="text-brown-700"> AIKYAM</span>
            </h2>
            <p className="font-body text-lg text-brown-600 max-w-3xl mx-auto">
              We're more than just a marketplace – we're a bridge between authentic craftsmanship and conscious consumers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Authentic Quality',
                description: 'Every product is handpicked and verified for authenticity and superior craftsmanship.'
              },
              {
                icon: Users,
                title: 'Direct from Artisans',
                description: 'Connect directly with skilled craftspeople and support their traditional livelihood.'
              },
              {
                icon: TrendingUp,
                title: 'Fair Trade Practices',
                description: 'Ensuring artisans receive fair compensation for their exceptional work and skills.'
              },
              {
                icon: Sparkles,
                title: 'Cultural Heritage',
                description: 'Preserving and promoting traditional arts and crafts for future generations.'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="card p-8 hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 bg-primary-200/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-500 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-brown-800 group-hover:text-brown-800 transition-colors duration-300" />
                </div>
                <h3 className="font-headline text-xl font-bold text-brown-800 mb-4">
                  {feature.title}
                </h3>
                <p className="font-body text-brown-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-linear-to-r from-brown-800 to-brown-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-headline text-4xl sm:text-5xl font-bold">
            BECOME PART OF THE
            <span className="text-primary-400"> AIKYAM FAMILY</span>
          </h2>
          <p className="font-body text-xl text-white/90 leading-relaxed">
            Whether you're an artisan looking to showcase your craft or a conscious buyer seeking authentic products, 
            join our community today and be part of something meaningful.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/seller/dashboard'}
              className="bg-primary-500 text-brown-800 px-8 py-4 rounded-xl font-body font-semibold text-lg hover:bg-white transition-all duration-300 shadow-lg min-w-[200px]"
            >
              <span className="transition-all duration-500 ease-in-out">
                {ctaButtonTexts[currentCTAIndex].text}
              </span>
            </button>
            <button 
              onClick={() => window.location.href = '/regions'}
              className="border-2 border-primary-400 text-primary-400 px-8 py-4 rounded-xl font-body font-semibold text-lg hover:bg-primary-400 hover:text-brown-800 transition-all duration-300"
            >
              EXPLORE REGIONS
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;