import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Search, 
  Grid3x3, 
  List, 
  SlidersHorizontal,
  X,
  Loader2,
  MapPin,
  ArrowLeft
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import VillageCard from '../../components/VillageCard';
import villageService from '../../services/villageService';
import regionService from '../../services/regionService';
import type { Village } from '../../services/villageService';

const sortOptions = [
  { value: 'name', label: 'Name A-Z' },
  { value: 'artisans', label: 'Most Artisans' },
  { value: 'established', label: 'Oldest First' }
];

const Villages: React.FC = () => {
  const { regionId } = useParams<{ regionId: string }>();
  const [villages, setVillages] = useState<Village[]>([]);
  const [filteredVillages, setFilteredVillages] = useState<Village[]>([]);
  const [currentRegion, setCurrentRegion] = useState<{ name: string; state: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Load villages data
  useEffect(() => {
    const fetchVillages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!regionId) {
          setError('Region ID is required');
          setLoading(false);
          return;
        }
        
        // Fetch region details
        const region = await regionService.getRegionById(regionId);
        setCurrentRegion({ name: region.name, state: region.state || 'India' });
        
        // Fetch all villages and filter by regionId
        const allVillages = await villageService.getAllVillages();
        const regionVillages = allVillages.filter(v => v.regionId === regionId);
        
        setVillages(regionVillages);
        setFilteredVillages(regionVillages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching villages:', err);
        setError('Failed to fetch villages. Please try again later.');
        setLoading(false);
      }
    };

    if (regionId) {
      fetchVillages();
    }
  }, [regionId]);

  // Filter and sort logic
  useEffect(() => {
    let filtered = [...villages];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(village =>
        village.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (village.description && village.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'artisans':
        // No artisanCount in API, keep original order
        break;
      case 'established':
        // No established field in API, keep original order
        break;
      default:
        break;
    }

    setFilteredVillages(filtered);
  }, [villages, searchQuery, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('name');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-200">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary-700 mx-auto" />
            <p className="font-body text-brown-600">Loading villages...</p>
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
            <span className="text-brown-800 font-medium truncate">
              {currentRegion?.name} Villages
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
                to="/regions"
                className="inline-flex items-center space-x-2 bg-primary-500/10 px-4 py-2 rounded-full text-primary-700 hover:bg-primary-500/20 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-body text-sm font-medium">Back to Regions</span>
              </Link>
            </div>
            
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-brown-800">
              VILLAGES IN
              <span className="text-primary-700"> {currentRegion?.name.toUpperCase()}</span>
            </h1>
            
            <p className="font-body text-lg text-brown-600 max-w-3xl mx-auto leading-relaxed">
              Explore the traditional craft villages in {currentRegion?.name}, {currentRegion?.state}. 
              Each village has its own unique artistic heritage and specialized techniques that have been 
              preserved and practiced for centuries.
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-brown-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>{filteredVillages.length} Villages</span>
              </div>
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
              <div className="space-y-3">
                <label className="font-body font-semibold text-brown-800 block">Search Villages</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search villages, crafts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-primary-200/30 rounded-xl font-body text-brown-800 placeholder-brown-500 focus:border-primary-500 focus:outline-none transition-colors pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brown-500" />
                </div>
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
                  <span>{filteredVillages.length} villages found</span>
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
                      placeholder="Search villages, crafts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-primary-200/30 rounded-xl font-body text-brown-800 placeholder-brown-500 focus:border-primary-500 focus:outline-none transition-colors pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brown-500" />
                  </div>

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

            {/* Villages Grid */}
            {filteredVillages.length === 0 ? (
              <div className="text-center py-12">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="w-10 h-10 text-brown-400" />
                  </div>
                  <h3 className="font-headline text-xl font-bold text-brown-800">No villages found</h3>
                  <p className="font-body text-brown-600 max-w-md mx-auto">
                    Try adjusting your search terms to find villages in this region.
                  </p>
                  <button onClick={clearFilters} className="bg-brown-800 text-white px-6 py-3 rounded-xl font-body font-semibold hover:bg-brown-900 transition-colors">
                    Clear Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8' 
                  : 'grid grid-cols-1 md:grid-cols-2 gap-8'
              }`}>
                {filteredVillages.map((village) => (
                  <VillageCard
                    key={village.id}
                    id={village.id}
                    name={village.name}
                    image={village.image}
                    description={village.description}
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

export default Villages;