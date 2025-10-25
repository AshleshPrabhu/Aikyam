import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Search, 
  Grid3x3, 
  List, 
  SlidersHorizontal,
  X,
  Loader2,
  Users,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import VillagerCard from '../../components/VillagerCard';

// Types for villagers
interface Villager {
  id: number;
  name: string;
  village: string;
  district: string;
  photo: string;
  description: string;
  mobile: string;
  craftsSpecialty: string;
  villageId: number;
  experience?: string;
  specializations?: string[];
}

// Sample villagers data - this would come from API later
const mockVillagersByVillage: { [key: number]: Villager[] } = {
  1: [ // Channapatna
    {
      id: 1,
      name: 'Ramesh Kumar',
      village: 'Channapatna',
      district: 'Ramanagara',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Master craftsman specializing in traditional Channapatna wooden toys and lacquerware. Has been practicing this ancient art for over 25 years, learned from his father and grandfather. Expert in creating intricate designs using natural dyes.',
      mobile: '+91-9876543210',
      craftsSpecialty: 'Wooden Toys',
      villageId: 1,
      experience: '25+ years',
      specializations: ['Lacquerware', 'Natural Dyes', 'Traditional Carving']
    },
    {
      id: 2,
      name: 'Lakshmi Devi',
      village: 'Channapatna',
      district: 'Ramanagara',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Renowned for her beautiful painted wooden dolls and miniature figurines. Specializes in intricate facial expressions and traditional costume details. Teaches the craft to younger generations.',
      mobile: '+91-9876543211',
      craftsSpecialty: 'Painted Dolls',
      villageId: 1,
      experience: '18+ years',
      specializations: ['Doll Making', 'Miniature Work', 'Traditional Painting']
    },
    {
      id: 3,
      name: 'Suresh Babu',
      village: 'Channapatna',
      district: 'Ramanagara',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Young artisan carrying forward the family tradition of toy making. Innovative in combining traditional techniques with contemporary designs. Specializes in educational toys and puzzles.',
      mobile: '+91-9876543212',
      craftsSpecialty: 'Educational Toys',
      villageId: 1,
      experience: '8+ years',
      specializations: ['Modern Designs', 'Educational Items', 'Eco-friendly Toys']
    }
  ],
  2: [ // Mysore City
    {
      id: 4,
      name: 'Srinivas Rao',
      village: 'Mysore City',
      district: 'Mysore',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Master silk weaver known for creating exquisite Mysore silk sarees. Expert in traditional Zari work and intricate border designs. His sarees are worn by brides across South India.',
      mobile: '+91-9876543213',
      craftsSpecialty: 'Mysore Silk',
      villageId: 2,
      experience: '30+ years',
      specializations: ['Zari Work', 'Traditional Borders', 'Bridal Sarees']
    },
    {
      id: 5,
      name: 'Meera Kumari',
      village: 'Mysore City',
      district: 'Mysore',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Renowned sandalwood carver creating beautiful sculptures and decorative items. Specializes in religious figurines and intricate architectural details. Uses traditional tools and techniques.',
      mobile: '+91-9876543214',
      craftsSpecialty: 'Sandalwood Carving',
      villageId: 2,
      experience: '22+ years',
      specializations: ['Religious Sculptures', 'Decorative Items', 'Architectural Details']
    }
  ],
  3: [ // Sanganer
    {
      id: 6,
      name: 'Rajesh Chhipa',
      village: 'Sanganer',
      district: 'Jaipur',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Master block printer with expertise in traditional Rajasthani motifs and patterns. Creates stunning fabrics using natural dyes and hand-carved wooden blocks passed down through generations.',
      mobile: '+91-9876543215',
      craftsSpecialty: 'Block Printing',
      villageId: 3,
      experience: '20+ years',
      specializations: ['Traditional Motifs', 'Natural Dyes', 'Hand-carved Blocks']
    }
  ],
  7: [ // Channapatna Town
    {
      id: 7,
      name: 'Manjunath H K',
      village: 'Channapatna Town',
      district: 'Ramanagara',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Third-generation toy maker and the current president of Channapatna Toy Makers Association. Expert in creating large-scale toy sets and teaching traditional lacquering techniques. His workshop employs 15 local artisans.',
      mobile: '+91-9845612340',
      craftsSpecialty: 'Traditional Wooden Toys',
      villageId: 7,
      experience: '35+ years',
      specializations: ['Large Toy Sets', 'Traditional Lacquering', 'Workshop Management']
    },
    {
      id: 8,
      name: 'Roopa Devi',
      village: 'Channapatna Town',
      district: 'Ramanagara',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Master craftswoman known for her intricate painted wooden jewelry and decorative items. Pioneered the use of natural colors derived from flowers and vegetables in Channapatna crafts.',
      mobile: '+91-9845612341',
      craftsSpecialty: 'Painted Jewelry',
      villageId: 7,
      experience: '28+ years',
      specializations: ['Natural Colors', 'Wooden Jewelry', 'Decorative Items']
    },
    {
      id: 9,
      name: 'Gagan Kumar',
      village: 'Channapatna Town',
      district: 'Ramanagara',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Young entrepreneur bringing modern marketing to traditional crafts. Creates custom wooden toys for international brands while maintaining authentic Channapatna techniques.',
      mobile: '+91-9845612342',
      craftsSpecialty: 'Custom Toys',
      villageId: 7,
      experience: '12+ years',
      specializations: ['International Quality', 'Custom Designs', 'Brand Collaborations']
    },
    {
      id: 10,
      name: 'Sharada Amma',
      village: 'Channapatna Town',
      district: 'Ramanagara',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Elderly master craftswoman who learned directly from her grandfather. Specializes in traditional storytelling dolls that represent local folklore and mythology. Trains young women in the craft.',
      mobile: '+91-9845612343',
      craftsSpecialty: 'Storytelling Dolls',
      villageId: 7,
      experience: '45+ years',
      specializations: ['Folklore Dolls', 'Mythology Figures', 'Traditional Teaching']
    }
  ],
  8: [ // Ramnagara
    {
      id: 11,
      name: 'Srinivasa Murthy',
      village: 'Ramnagara',
      district: 'Ramanagara',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Expert in wood turning and creating decorative bowls, vases, and utility items. Uses traditional foot-operated lathes and specializes in creating perfect symmetrical designs.',
      mobile: '+91-9845678901',
      craftsSpecialty: 'Wood Turning',
      villageId: 8,
      experience: '30+ years',
      specializations: ['Decorative Bowls', 'Traditional Lathes', 'Symmetrical Designs']
    },
    {
      id: 12,
      name: 'Kavitha Rani',
      village: 'Ramnagara',
      district: 'Ramanagara',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Innovative wood artist creating contemporary furniture pieces with traditional joinery techniques. Her work combines modern aesthetics with age-old craftsmanship methods.',
      mobile: '+91-9845678902',
      craftsSpecialty: 'Contemporary Furniture',
      villageId: 8,
      experience: '15+ years',
      specializations: ['Modern Design', 'Traditional Joinery', 'Custom Furniture']
    }
  ],
  5: [ // Khurja
    {
      id: 13,
      name: 'Mahesh Sharma',
      village: 'Khurja',
      district: 'Bulandshahr',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Master potter specializing in traditional blue pottery. His family has been creating ceramic art for over 200 years. Expert in glazing techniques and intricate Persian-inspired patterns.',
      mobile: '+91-9876567890',
      craftsSpecialty: 'Blue Pottery',
      villageId: 5,
      experience: '32+ years',
      specializations: ['Persian Patterns', 'Glazing Techniques', 'Traditional Ceramics']
    },
    {
      id: 14,
      name: 'Sunita Sharma',
      village: 'Khurja',
      district: 'Bulandshahr',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Renowned ceramic artist creating contemporary pottery with traditional techniques. Specializes in dinnerware sets and decorative pieces with modern color combinations.',
      mobile: '+91-9876567891',
      craftsSpecialty: 'Contemporary Ceramics',
      villageId: 5,
      experience: '18+ years',
      specializations: ['Dinnerware Sets', 'Modern Colors', 'Decorative Pottery']
    }
  ],
  4: [ // Bagru
    {
      id: 15,
      name: 'Ganesh Chippa',
      village: 'Bagru',
      district: 'Jaipur',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Fourth-generation natural dye specialist. Expert in creating indigo, madder, and turmeric dyes from scratch. His fabrics are known for their vibrant colors that last for decades.',
      mobile: '+91-9876554321',
      craftsSpecialty: 'Natural Dyeing',
      villageId: 4,
      experience: '26+ years',
      specializations: ['Indigo Processing', 'Plant-based Dyes', 'Color Fastness']
    },
    {
      id: 16,
      name: 'Kamala Devi Chippa',
      village: 'Bagru',
      district: 'Jaipur',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Master block printer specializing in traditional Bagru patterns and motifs. Known for her precision in hand-printing complex geometric designs and floral patterns.',
      mobile: '+91-9876554322',
      craftsSpecialty: 'Traditional Printing',
      villageId: 4,
      experience: '22+ years',
      specializations: ['Geometric Patterns', 'Floral Motifs', 'Hand Printing']
    }
  ],
  6: [ // Makrana
    {
      id: 17,
      name: 'Ashok Kumar Silawat',
      village: 'Makrana',
      district: 'Nagaur',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Master marble sculptor whose family worked on the Taj Mahal. Specializes in intricate inlay work and traditional Mughal-style carvings. His pieces are found in palaces across India.',
      mobile: '+91-9876445566',
      craftsSpecialty: 'Marble Carving',
      villageId: 6,
      experience: '38+ years',
      specializations: ['Inlay Work', 'Mughal Designs', 'Architectural Elements']
    }
  ]
};

// Mock village data for breadcrumb
const mockVillages: { [key: number]: { name: string; region: string; regionId: number } } = {
  1: { name: 'Channapatna', region: 'Mysore Region', regionId: 1 },
  2: { name: 'Mysore City', region: 'Mysore Region', regionId: 1 },
  3: { name: 'Sanganer', region: 'Jaipur Region', regionId: 2 },
  4: { name: 'Bagru', region: 'Jaipur Region', regionId: 2 },
  5: { name: 'Khurja', region: 'Jaipur Region', regionId: 2 },
  6: { name: 'Makrana', region: 'Jaipur Region', regionId: 2 },
  7: { name: 'Channapatna Town', region: 'Channapatna Region', regionId: 4 },
  8: { name: 'Ramnagara', region: 'Channapatna Region', regionId: 4 }
};

const sortOptions = [
  { value: 'name', label: 'Name A-Z' },
  { value: 'experience', label: 'Most Experienced' },
  { value: 'specialty', label: 'By Specialty' }
];

const filterByCraft = [
  'All Crafts',
  'Wooden Toys',
  'Painted Dolls',
  'Educational Toys',
  'Mysore Silk',
  'Sandalwood Carving',
  'Block Printing',
  'Lacquerware',
  'Natural Dyes',
  'Traditional Wooden Toys',
  'Painted Jewelry',
  'Custom Toys',
  'Storytelling Dolls',
  'Wood Turning',
  'Contemporary Furniture',
  'Blue Pottery',
  'Contemporary Ceramics'
];

const Villagers: React.FC = () => {
  const { villageId } = useParams<{ villageId: string }>();
  const [villagers, setVillagers] = useState<Villager[]>([]);
  const [filteredVillagers, setFilteredVillagers] = useState<Villager[]>([]);
  const [currentVillage, setCurrentVillage] = useState<{ name: string; region: string; regionId: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCraft, setSelectedCraft] = useState('All Crafts');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Load villagers data
  useEffect(() => {
    const fetchVillagers = async () => {
      try {
        setLoading(true);
        const id = parseInt(villageId || '1');
        
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/villages/${id}/villagers`);
        // const data = await response.json();
        
        // Using mock data for now
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
        
        const villageVillagers = mockVillagersByVillage[id] || [];
        const village = mockVillages[id] || { name: 'Unknown Village', region: 'Unknown Region', regionId: 1 };
        
        setVillagers(villageVillagers);
        setFilteredVillagers(villageVillagers);
        setCurrentVillage(village);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch villagers');
        setLoading(false);
      }
    };

    if (villageId) {
      fetchVillagers();
    }
  }, [villageId]);

  // Filter and sort logic
  useEffect(() => {
    let filtered = [...villagers];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(villager =>
        villager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        villager.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        villager.craftsSpecialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        villager.specializations?.some(spec => 
          spec.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Craft filter
    if (selectedCraft !== 'All Crafts') {
      filtered = filtered.filter(villager => 
        villager.craftsSpecialty === selectedCraft ||
        villager.specializations?.includes(selectedCraft)
      );
    }

    // Sort
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'experience':
        filtered.sort((a, b) => {
          const aYears = parseInt(a.experience?.match(/\d+/)?.[0] || '0');
          const bYears = parseInt(b.experience?.match(/\d+/)?.[0] || '0');
          return bYears - aYears;
        });
        break;
      case 'specialty':
        filtered.sort((a, b) => a.craftsSpecialty.localeCompare(b.craftsSpecialty));
        break;
      default:
        break;
    }

    setFilteredVillagers(filtered);
  }, [villagers, searchQuery, selectedCraft, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCraft('All Crafts');
    setSortBy('name');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-200">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary-700 mx-auto" />
            <p className="font-body text-brown-600">Loading artisans...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream-200">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <p className="font-body text-red-600">{error}</p>
            <Link to="/regions" className="bg-brown-800 text-white px-6 py-3 rounded-xl font-body font-semibold hover:bg-brown-900 transition-colors inline-block">
              Back to Regions
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-200">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-primary-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm font-body">
            <Link to="/" className="text-brown-600 hover:text-primary-700 transition-colors">
              Home
            </Link>
            <span className="text-brown-400">/</span>
            <Link to="/regions" className="text-brown-600 hover:text-primary-700 transition-colors">
              Regions
            </Link>
            <span className="text-brown-400">/</span>
            <Link to={`/region/${currentVillage?.regionId}/villages`} className="text-brown-600 hover:text-primary-700 transition-colors">
              {currentVillage?.region}
            </Link>
            <span className="text-brown-400">/</span>
            <span className="text-brown-800 font-medium truncate">
              {currentVillage?.name} Artisans
            </span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <section className="bg-white border-b border-primary-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-6">
            {/* Back Button */}
            <div className="flex justify-center">
              <Link 
                to={`/region/${currentVillage?.regionId}/villages`}
                className="inline-flex items-center space-x-2 bg-primary-500/10 px-4 py-2 rounded-full text-primary-700 hover:bg-primary-500/20 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-body text-sm font-medium">Back to Villages</span>
              </Link>
            </div>
            
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-brown-800">
              ARTISANS OF
              <span className="text-primary-700"> {currentVillage?.name.toUpperCase()}</span>
            </h1>
            
            <p className="font-body text-lg text-brown-600 max-w-3xl mx-auto leading-relaxed">
              Meet the skilled artisans of {currentVillage?.name} who have dedicated their lives to 
              preserving and practicing traditional crafts. Each artisan brings unique expertise 
              and generations of knowledge to their craft.
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-brown-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>{filteredVillagers.length} Artisans</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-brown-600 rounded-full"></div>
                <span>{new Set(filteredVillagers.map(v => v.craftsSpecialty)).size} Specialties</span>
              </div>
            </div>

            {/* Collaboration Roadmap Button */}
            <div className="pt-6">
              <Link 
                to={`/village/${villageId}/roadmap`}
                className="inline-flex items-center space-x-3 bg-brown-700 text-white px-8 py-4 rounded-xl font-body font-semibold hover:from-brown-700 hover:to-brown-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Users className="w-5 h-5" />
                <span>Start Collaboration Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="font-body text-sm text-brown-600 mt-2 max-w-md mx-auto">
                Get a personalized step-by-step guide to collaborate with these talented artisans
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-80 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-primary-200/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline text-xl font-bold text-brown-800">FILTERS</h2>
                <button 
                  onClick={clearFilters}
                  className="font-body text-sm text-primary-700 hover:text-brown-800 transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="space-y-3 mb-6">
                <label className="font-body font-semibold text-brown-800 block">Search Artisans</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, craft..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-primary-200/30 rounded-xl font-body text-brown-800 placeholder-brown-500 focus:border-primary-500 focus:outline-none transition-colors pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brown-500" />
                </div>
              </div>

              {/* Craft Specialty */}
              <div className="space-y-3">
                <label className="font-body font-semibold text-brown-800 block">Filter by Craft</label>
                <select
                  value={selectedCraft}
                  onChange={(e) => setSelectedCraft(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-primary-200/30 rounded-xl font-body text-brown-800 focus:border-primary-500 focus:outline-none transition-colors"
                >
                  {filterByCraft.map((craft) => (
                    <option key={craft} value={craft}>
                      {craft}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-primary-200/30 font-body font-medium text-brown-700 hover:bg-primary-50 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                </button>
                
                <div className="flex items-center space-x-2 text-brown-600 font-body text-sm">
                  <span>{filteredVillagers.length} artisans found</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort */}
                <div className="flex items-center space-x-2">
                  <span className="font-body text-sm text-brown-700 hidden sm:block">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border-2 border-primary-200/30 rounded-lg font-body text-brown-800 focus:border-primary-500 focus:outline-none transition-colors text-sm min-w-40"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-1 bg-white rounded-lg border border-primary-200/30 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-primary-500 text-brown-800' 
                        : 'text-brown-600 hover:bg-primary-100'
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-primary-500 text-brown-800' 
                        : 'text-brown-600 hover:bg-primary-100'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-white rounded-2xl p-6 shadow-md border border-primary-200/20 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-headline text-lg font-bold text-brown-800">FILTERS</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1 hover:bg-brown-100 rounded-md transition-colors"
                  >
                    <X className="w-5 h-5 text-brown-600" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by name, craft..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-primary-200/30 rounded-xl font-body text-brown-800 placeholder-brown-500 focus:border-primary-500 focus:outline-none transition-colors pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brown-500" />
                  </div>

                  <select
                    value={selectedCraft}
                    onChange={(e) => setSelectedCraft(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-primary-200/30 rounded-xl font-body text-brown-800 focus:border-primary-500 focus:outline-none transition-colors"
                  >
                    {filterByCraft.map((craft) => (
                      <option key={craft} value={craft}>
                        {craft}
                      </option>
                    ))}
                  </select>

                  <div className="flex space-x-2">
                    <button onClick={clearFilters} className="flex-1 py-2 px-4 bg-brown-100 text-brown-700 rounded-lg font-body font-medium hover:bg-brown-200 transition-colors">
                      Clear All
                    </button>
                    <button onClick={() => setShowFilters(false)} className="flex-1 py-2 px-4 bg-brown-800 text-white rounded-lg font-body font-medium hover:bg-brown-900 transition-colors">
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Villagers Grid */}
            {filteredVillagers.length === 0 ? (
              <div className="text-center py-12">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-10 h-10 text-brown-400" />
                  </div>
                  <h3 className="font-headline text-xl font-bold text-brown-800">No artisans found</h3>
                  <p className="font-body text-brown-600 max-w-md mx-auto">
                    Try adjusting your search terms or filters to find artisans.
                  </p>
                  <button onClick={clearFilters} className="bg-brown-800 text-white px-6 py-3 rounded-xl font-body font-semibold hover:bg-brown-900 transition-colors">
                    Clear Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' 
                  : 'grid grid-cols-1 md:grid-cols-2 gap-8'
              }`}>
                {filteredVillagers.map((villager) => (
                  <VillagerCard
                    key={villager.id}
                    id={villager.id}
                    name={villager.name}
                    village={villager.village}
                    district={villager.district}
                    photo={villager.photo}
                    description={villager.description}
                    mobile={villager.mobile}
                    craftsSpecialty={villager.craftsSpecialty}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Villagers;