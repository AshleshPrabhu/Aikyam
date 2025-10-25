import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Users, 
  Star,
  Clock,
  CheckCircle,
  MessageCircle,
  LogOut,
  Settings,
  HelpCircle,
  User
} from 'lucide-react';
import AIAgent from '../../components/AIAgent';

// Types for artisan story
interface StoryHighlight {
  id: number;
  title: string;
  description: string;
  icon: string;
  badge?: string;
}

interface ArtisanStory {
  name: string;
  village: string;
  craft: string;
  yearsOfExperience: number;
  introduction: string;
  highlights: StoryHighlight[];
  specializations: string[];
  achievements: string[];
  philosophy: string;
}

const SellerDashboard: React.FC = () => {
  // Multilingual text for the AI chat button
  const buttonTexts = [
    { text: "TELL ABOUT YOURSELF", lang: "English" },
    { text: "अपने बारे में बताएं", lang: "Hindi" },
    { text: "ನಿಮ್ಮ ಬಗ್ಗೆ ಹೇಳಿ", lang: "Kannada" },
    { text: "మీ గురించి చెప్పండి", lang: "Telugu" }
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAIAgentOpen, setIsAIAgentOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Multilingual cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % buttonTexts.length);
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  }, []);

  // Mock artisan story data
  const artisanStory: ArtisanStory = {
    name: "Ramesh Kumar",
    village: "Channapatna Town",
    craft: "Traditional Wooden Toys",
    yearsOfExperience: 35,
    introduction: "Born into a family of traditional toy makers, I learned the sacred art of Channapatna wooden toys from my grandfather. Each piece I create carries forward a 200-year-old legacy of craftsmanship.",
    highlights: [
      {
        id: 1,
        title: "Heritage Keeper",
        description: "Third-generation artisan preserving traditional lacquering techniques",
        icon: "🏛️",
        badge: "Legacy"
      },
      {
        id: 2,
        title: "Natural Materials",
        description: "Using only Aale Mara (ivory wood) and natural lac dyes",
        icon: "🌿",
        badge: "Eco-friendly"
      },
      {
        id: 3,
        title: "International Recognition",
        description: "Featured in UNESCO's Intangible Cultural Heritage documentation",
        icon: "🌍",
        badge: "Global"
      },
      {
        id: 4,
        title: "Teaching Tradition",
        description: "Training 15+ young artisans to continue this ancient craft",
        icon: "👥",
        badge: "Mentor"
      }
    ],
    specializations: [
      "Lacquered wooden toys",
      "Natural dye preparation", 
      "Traditional turning techniques",
      "Educational toy sets",
      "Custom figurines"
    ],
    achievements: [
      "State Award for Traditional Crafts (2019)",
      "Featured in National Geographic documentary",
      "Supplied toys to 500+ schools across Karnataka",
      "Collaborated with international toy brands"
    ],
    philosophy: "Every toy I create should bring joy to a child while teaching them about our rich cultural heritage. The smile on a child's face when they hold my creation is worth more than any award."
  };

  // Artisan profile statistics
  const stats = {
    yearsExperience: artisanStory.yearsOfExperience,
    specializations: artisanStory.specializations.length,
    achievements: artisanStory.achievements.length,
    profileViews: 1247
  };

  return (
    <div className="min-h-screen bg-cream-200">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-primary-200/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-headline text-xl font-bold">A</span>
              </div>
              <div>
                <span className="font-headline text-2xl font-bold text-brown-800">AIKYAM</span>
                <span className="ml-3 font-body text-sm text-brown-600">Seller Portal</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 relative">
              <div className="hidden sm:block text-right">
                <p className="font-body text-sm text-brown-800 font-semibold">Ramesh Artisan</p>
                <p className="font-body text-xs text-brown-600">Traditional Crafts</p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <span className="text-brown-800 font-headline text-lg font-bold">R</span>
                </button>
                
                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-primary-200/20 py-2 z-50">
                    <button className="w-full px-4 py-2 text-left font-body text-sm text-brown-800 hover:bg-cream-25 flex items-center space-x-3">
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left font-body text-sm text-brown-800 hover:bg-cream-25 flex items-center space-x-3">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left font-body text-sm text-brown-800 hover:bg-cream-25 flex items-center space-x-3">
                      <HelpCircle className="w-4 h-4" />
                      <span>Support</span>
                    </button>
                    <div className="border-t border-primary-200/20 my-1"></div>
                    <button className="w-full px-4 py-2 text-left font-body text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b border-primary-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <button
              onClick={() => setIsAIAgentOpen(true)}
              className="bg-brown-800 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-brown-900 transition-all duration-300 mx-auto block"
            >
              <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold">
                {buttonTexts[currentTextIndex].text}
              </h1>
            </button>
            <p className="font-body text-brown-600 max-w-2xl mx-auto">
              Share your craft story with urban partners. Connect with middlemen who can help 
              showcase your traditional skills to the world.
            </p>
          </div>
        </div>
      </section>

      {/* Profile Stats Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-primary-200/20 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-body text-xs sm:text-sm text-brown-600">Experience</p>
                <p className="font-headline text-xl sm:text-2xl font-bold text-brown-800">{stats.yearsExperience}+ yrs</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg border border-primary-200/20 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-body text-xs sm:text-sm text-brown-600">Specializations</p>
                <p className="font-headline text-xl sm:text-2xl font-bold text-brown-800">{stats.specializations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg border border-primary-200/20 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-body text-xs sm:text-sm text-brown-600">Achievements</p>
                <p className="font-headline text-xl sm:text-2xl font-bold text-brown-800">{stats.achievements}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg border border-primary-200/20 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-body text-xs sm:text-sm text-brown-600">Profile Views</p>
                <p className="font-headline text-lg sm:text-xl font-bold text-brown-800">{stats.profileViews.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Craft Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-xl border border-primary-200/20 shadow-lg overflow-hidden">
          {/* Story Header */}
          <div className="bg-linear-to-r from-brown-600 to-brown-700 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-headline text-2xl sm:text-3xl font-bold text-white">MY CRAFT STORY</h2>
                <p className="font-body text-brown-100 mt-2">Your journey shared with the world</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-body text-sm text-white">
                    📍 {artisanStory.village}
                  </span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-body text-sm text-white">
                    🎨 {artisanStory.craft}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="p-6 sm:p-8">
            {/* Introduction */}
            <div className="mb-8">
              <h3 className="font-headline text-xl font-bold text-brown-800 mb-4 flex items-center">
                <div className="w-8 h-8 bg-brown-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-brown-600 text-lg">👋</span>
                </div>
                About Me
              </h3>
              <p className="font-body text-brown-700 leading-relaxed text-lg bg-cream-50 p-6 rounded-lg border-l-4 border-brown-600">
                "{artisanStory.introduction}"
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="mb-8">
              <h3 className="font-headline text-xl font-bold text-brown-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-brown-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-brown-600 text-lg">✨</span>
                </div>
                What Makes Me Special
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {artisanStory.highlights.map((highlight) => (
                  <div key={highlight.id} className="bg-cream-25 rounded-xl p-6 border border-primary-200/20 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl shrink-0">{highlight.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-body font-bold text-brown-800">{highlight.title}</h4>
                          {highlight.badge && (
                            <span className="bg-brown-600 text-white text-xs px-2 py-1 rounded-full font-body font-semibold">
                              {highlight.badge}
                            </span>
                          )}
                        </div>
                        <p className="font-body text-brown-600 text-sm leading-relaxed">{highlight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specializations & Achievements */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Specializations */}
              <div>
                <h3 className="font-headline text-xl font-bold text-brown-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-brown-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-brown-600 text-lg">🛠️</span>
                  </div>
                  My Specializations
                </h3>
                <div className="space-y-3">
                  {artisanStory.specializations.map((specialization, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg border border-primary-200/20">
                      <div className="w-2 h-2 bg-brown-600 rounded-full shrink-0"></div>
                      <span className="font-body text-brown-800 font-medium">{specialization}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="font-headline text-xl font-bold text-brown-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-brown-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-brown-600 text-lg">🏆</span>
                  </div>
                  My Achievements
                </h3>
                <div className="space-y-3">
                  {artisanStory.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-primary-200/20">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-body text-brown-800 leading-relaxed">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Philosophy */}
            <div className="bg-linear-to-br from-brown-50 to-cream-100 rounded-xl p-6 border border-brown-200/30">
              <h3 className="font-headline text-xl font-bold text-brown-800 mb-4 flex items-center">
                <div className="w-8 h-8 bg-brown-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-brown-600 text-lg">💭</span>
                </div>
                My Philosophy
              </h3>
              <blockquote className="font-body text-brown-700 leading-relaxed text-lg italic border-l-4 border-brown-400 pl-6">
                "{artisanStory.philosophy}"
              </blockquote>
              <div className="flex items-center justify-end mt-4">
                <span className="font-body text-brown-600 text-sm">— {artisanStory.name}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-primary-200/20">
              <button
                onClick={() => setIsAIAgentOpen(true)}
                className="bg-brown-600 text-white px-6 py-3 rounded-lg font-body font-semibold hover:bg-brown-700 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Update My Story</span>
              </button>
              <button className="bg-primary-500 text-brown-800 px-6 py-3 rounded-lg font-body font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2">
                <Users className="w-5 h-5" />
                <span>View Public Profile</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agent Component */}
      <AIAgent 
        isOpen={isAIAgentOpen}
        onClose={() => setIsAIAgentOpen(false)}
      />
    </div>
  );
};

export default SellerDashboard;