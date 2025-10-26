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
import vendorService from '../../services/vendorService';
import villageService from '../../services/villageService';
import type { Vendor } from '../../services/vendorService';

// Sample villagers data - this would come from API later

const sortOptions = [
  { value: 'name', label: 'Name A-Z' },
  { value: 'categories', label: 'By Craft' }
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
  const [villagers, setVillagers] = useState<Vendor[]>([]);
  const [filteredVillagers, setFilteredVillagers] = useState<Vendor[]>([]);
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
        setError(null);
        
        if (!villageId) {
          setError('Village ID is required');
          setLoading(false);
          return;
        }
        
        // Fetch village details
        const village = await villageService.getVillageById(villageId);
        setCurrentVillage({ 
          name: village.name, 
          region: 'Region', 
          regionId: 1  // This could be enhanced with proper region info
        });
        
        // Fetch all vendors and filter by villageId
        const allVendors = await vendorService.getAllVendors();
        const villageVendors = allVendors.filter(v => v.villageId === villageId);
        
        setVillagers(villageVendors as any[]);
        setFilteredVillagers(villageVendors as any[]);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching villagers:', err);
        setError('Failed to fetch villagers. Please try again later.');
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
      filtered = filtered.filter(vendor =>
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (vendor.summary ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.categories.some((cat: string) => 
          cat.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Craft filter - match by categories
    if (selectedCraft !== 'All Crafts') {
      filtered = filtered.filter(vendor => 
        vendor.categories.includes(selectedCraft)
      );
    }

    // Sort
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'categories':
        filtered.sort((a, b) => (a.categories[0] ?? '').localeCompare(b.categories[0] ?? ''));
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
                <span>{new Set(filteredVillagers.flatMap(v => v.categories)).size} Crafts</span>
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
                    phone={villager.phone}
                    summary={villager.summary}
                    categories={villager.categories}
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