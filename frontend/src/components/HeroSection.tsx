import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  // Multilingual text for the button
  const buttonTexts = [
    { text: "BECOME AN ARTISAN", lang: "English" },
    { text: "कारीगर बनें", lang: "Hindi" },
    { text: "ಕರಕುಶಲಿಯಾಗಿ", lang: "Kannada" },
    { text: "కళాకారుడవ్వండి", lang: "Telugu" }
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % buttonTexts.length);
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-8 lg:py-12 overflow-hidden bg-linear-to-br from-cream-100 via-cream-200 to-primary-200/20">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary-200/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-primary-300/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-200/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-200/30 shadow-lg">
              <Sparkles className="w-4 h-4 text-primary-700" />
              <span className="font-body text-sm font-medium text-brown-700">
                Authentic Handmade Crafts
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-brown-800">
                WHERE EVERY
                <br />
                <span className="relative text-primary-700">
                  CRAFTSMAN
                  <div className="absolute -bottom-2 left-0 w-full h-3 -z-10 transform -skew-x-12 bg-primary-400/40"></div>
                </span>
                <br />
                HAS A STORY
              </h1>
              
              {/* Quote */}
              <div className="relative">
                <p className="font-body text-lg lg:text-xl text-brown-600 italic max-w-2xl leading-relaxed">
                  and every purchase uplifts an artist
                </p>
              </div>
            </div>

            {/* Tagline */}
            {/* <p className="font-body text-base lg:text-lg text-brown-500 max-w-2xl leading-relaxed">
              Shop authentic handmade creations, connect with real artisans, 
              and let every purchase make a difference in someone's life.
            </p> */}

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <button 
                onClick={() => window.location.href = '/seller/dashboard'}
                className="group bg-brown-800 text-white px-8 py-5 lg:py-6 rounded-xl font-body font-semibold text-lg lg:text-xl hover:bg-brown-900 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-4 min-w-[280px] lg:min-w-[320px]"
              >
                <span className="transition-all duration-500 ease-in-out">
                  {buttonTexts[currentTextIndex].text}
                </span>
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative max-w-md mx-auto lg:max-w-lg">
              {/* Main Image Container */}
              <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-xl border-3 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="/src/assets/hero_crafts.png" 
                  alt="Artisan crafting pottery" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-primary-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-brown-800" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-brown-500">CRAFT'S EXCLUSIVE</div>
                    <div className="font-headline text-sm font-bold text-brown-800">Hand-picked Collection</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-cream-300/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-primary-500/30 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;