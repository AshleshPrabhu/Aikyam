import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Circle, 
  Users, 
  Calendar, 
  ArrowRight,
  Download,
  Clock,
  Loader2
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import vendorService from '../../services/vendorService';
import villageService from '../../services/villageService';
import type { Vendor } from '../../services/vendorService';

// Types
interface Villager {
  id: string;
  name: string;
  categories: string[];
  summary?: string;
}

interface RoadmapStep {
  week: number;
  title: string;
  goal: string;
  tasks: string[];
  deliverables: string[];
  kpi: string;
}

// Dummy roadmap data
const dummyRoadmap: RoadmapStep[] = [
  {
    week: 1,
    title: "Prep & Alignment",
    goal: "Get everyone aligned, prepare documents, and finalize design directions so the on-site visit is efficient.",
    tasks: [
      "Share engagement brief (scope, timeline, payment terms, pilot batch target)",
      "Send QC checklist template and simple consent form (photos + story usage)",
      "Finalize 3 concept directions (traditional, urban-friendly, limited-edition twist)",
      "Create materials & tools list with estimated costs and local supplier leads",
      "Arrange travel, local liaison, and communication channel (WhatsApp group)"
    ],
    deliverables: [
      "Engagement brief PDF",
      "QC checklist (one-page)",
      "3 thumbnail designs (images)",
      "Materials budget + supplier contacts"
    ],
    kpi: "All artisans acknowledged brief and signed consent (≥90% response). Materials list ready with at least one confirmed local supplier."
  },
  {
    week: 2,
    title: "On-site Assessment & Co-creation",
    goal: "Build trust, document capabilities, co-design the golden sample and finalize pilot specs.",
    tasks: [
      "Meet artisans, review existing samples, and run a short capability audit",
      "Run a co-design session: pick 1–2 designs from Week 1 and adapt with artisan input",
      "Produce golden sample(s) together that meet QC tolerances",
      "Confirm final pilot quantity, per-unit cost target, and payment schedule",
      "Capture artisan bios, process shots and short quotes for tags"
    ],
    deliverables: [
      "Golden sample(s) photographed",
      "Final pilot spec sheet (dimensions, tolerances, finish)",
      "Artisan short bios + 4–6 process photos"
    ],
    kpi: "Golden sample approved by both parties. Pilot specs locked within budget target."
  },
  {
    week: 3,
    title: "Pilot Production & Packaging Prototype",
    goal: "Execute a controlled small batch, lock down packing and marketing assets.",
    tasks: [
      "Run pilot production (supervise QC gate after each 10–15 units)",
      "Assemble packaging prototype (box + story tag + care card)",
      "Prepare social assets: 6 product photos, 2 short reels, product description copy",
      "Calculate landed cost, artisan payout, middleman margin, and suggested retail price"
    ],
    deliverables: [
      "Pilot batch (e.g., 40 units) with QC log",
      "Packaging spec + mockup file",
      "Marketing pack: photos + 2 reels + captions",
      "Cost sheet with margins"
    ],
    kpi: "QC pass rate ≥ 85% on pilot. Cost per unit within ±10% of target."
  },
  {
    week: 4,
    title: "Soft Launch, Feedback & Scale Plan",
    goal: "Test market response, finalize accounting, document learnings and next steps for scaling.",
    tasks: [
      "Soft launch limited quantity across chosen channel",
      "Track sales, inquiries, shipping issues and early feedback",
      "Finalize payments to artisans and close pilot accounting",
      "Create a 3-month scaling plan (lead times, raw material financing, training needs)",
      "Document improvements & update product spec on platform"
    ],
    deliverables: [
      "Launch report: sales, conversion, customer feedback summary",
      "Final payouts record + expense sheet",
      "3-month scale plan (timeline, cost, headcount/training)"
    ],
    kpi: "At least 5 paid purchases or 10 strong leads from launch. Customer satisfaction rating ≥ 4/5."
  }
];

const Roadmap: React.FC = () => {
  const { villageId } = useParams<{ villageId: string }>();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedArtisans, setSelectedArtisans] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [showQuestions, setShowQuestions] = useState(true);
  const [villagers, setVillagers] = useState<Villager[]>([]);
  const [village, setVillage] = useState<{ name: string; regionId: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVillageData = async () => {
      try {
        setLoading(true);
        
        if (!villageId) {
          setLoading(false);
          return;
        }

        // Fetch village details
        const villageData = await villageService.getVillageById(villageId);
        setVillage({ name: villageData.name, regionId: villageData.regionId });

        // Fetch all vendors and filter by villageId
        const allVendors = await vendorService.getAllVendors();
        const villageVendors = allVendors.filter((v: Vendor) => v.villageId === villageId);
        
        // Transform vendors to match Villager interface
        const transformedVillagers: Villager[] = villageVendors.map((v: Vendor) => ({
          id: v.id,
          name: v.name,
          categories: v.categories,
          summary: v.summary
        }));
        
        setVillagers(transformedVillagers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching village data:', error);
        setLoading(false);
      }
    };

    if (villageId) {
      fetchVillageData();
    }
  }, [villageId]);

  const handleArtisanToggle = (artisanId: string) => {
    setSelectedArtisans(prev => 
      prev.includes(artisanId) 
        ? prev.filter(id => id !== artisanId)
        : [...prev, artisanId]
    );
  };

  const handleStartRoadmap = () => {
    if (selectedArtisans.length > 0 && selectedPeriod) {
      setShowQuestions(false);
    }
  };

  const selectedArtisanNames = villagers
    .filter(v => selectedArtisans.includes(v.id))
    .map(v => v.name)
    .join(', ');

  if (showQuestions) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm font-body text-brown-600 mb-8">
            <Link to="/regions" className="hover:text-brown-800 transition-colors">Regions</Link>
            <span>→</span>
            <span className="text-brown-600">{village?.name}</span>
            <span>→</span>
            <Link to={`/village/${villageId}/villagers`} className="hover:text-brown-800 transition-colors">
              Villagers
            </Link>
            <span>→</span>
            <span className="text-brown-800 font-semibold">Collaboration Roadmap</span>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="font-headline text-4xl font-bold text-brown-800 mb-4">
                Artisan Collaboration Roadmap
              </h1>
              <p className="font-body text-lg text-brown-600 max-w-2xl mx-auto">
                Plan your collaboration with talented artisans from {village?.name}. 
                Answer a few questions to get your personalized roadmap.
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-brown-600 animate-spin mr-2" />
                <span className="font-body text-brown-600">Loading artisans...</span>
              </div>
            ) : villagers.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="font-body text-brown-600">No artisans found in this village yet.</p>
              </div>
            ) : (
              <>
            {/* Questions Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              {/* Question 1: Select Artisans */}
              <div className="mb-8">
                <h3 className="font-headline text-xl font-bold text-brown-800 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Select Artisans to Collaborate With
                </h3>
                <p className="font-body text-brown-600 mb-4">
                  Choose the artisans you'd like to work with for your project:
                </p>
                
                <div className="space-y-3">
                  {villagers.map((villager) => (
                    <label 
                      key={villager.id}
                      className="flex items-center p-4 border border-brown-200 rounded-lg hover:bg-cream-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedArtisans.includes(villager.id)}
                        onChange={() => handleArtisanToggle(villager.id)}
                        className="w-4 h-4 text-brown-600 bg-gray-100 border-gray-300 rounded focus:ring-brown-500 focus:ring-2"
                      />
                      <div className="ml-3">
                        <p className="font-body font-semibold text-brown-800">{villager.name}</p>
                        <p className="font-body text-sm text-brown-600">
                          {villager.categories.join(', ')} {villager.summary ? '•' : ''} {villager.summary ? villager.summary.substring(0, 50) + '...' : ''}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 2: Time Period */}
              <div className="mb-8">
                <h3 className="font-headline text-xl font-bold text-brown-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Collaboration Duration
                </h3>
                <p className="font-body text-brown-600 mb-4">
                  How long would you like to collaborate with the selected artisans?
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['1 month', '3 months', '6 months'].map((period) => (
                    <label 
                      key={period}
                      className="flex items-center p-4 border border-brown-200 rounded-lg hover:bg-cream-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="period"
                        value={period}
                        checked={selectedPeriod === period}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="w-4 h-4 text-brown-600 bg-gray-100 border-gray-300 focus:ring-brown-500 focus:ring-2"
                      />
                      <span className="ml-3 font-body font-semibold text-brown-800">{period}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  onClick={handleStartRoadmap}
                  disabled={selectedArtisans.length === 0 || !selectedPeriod}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
                >
                  Generate My Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
              </>
            )}
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm font-body text-brown-600 mb-8">
          <Link to="/regions" className="hover:text-brown-800 transition-colors">Regions</Link>
          <span>→</span>
          <span className="text-brown-600">{village?.name}</span>
          <span>→</span>
          <Link to={`/village/${villageId}/villagers`} className="hover:text-brown-800 transition-colors">
            Villagers
          </Link>
          <span>→</span>
          <span className="text-brown-800 font-semibold">Collaboration Roadmap</span>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-headline text-4xl font-bold text-brown-800 mb-4">
              Your Collaboration Roadmap
            </h1>
            <div className="bg-white rounded-lg p-4 inline-block shadow-md">
              <p className="font-body text-brown-600">
                <span className="font-semibold">Working with:</span> {selectedArtisanNames}
              </p>
              <p className="font-body text-brown-600">
                <span className="font-semibold">Duration:</span> {selectedPeriod}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {dummyRoadmap.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    index <= currentStep 
                      ? 'bg-brown-600 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  {index < dummyRoadmap.length - 1 && (
                    <div className={`w-24 h-1 mx-2 ${
                      index < currentStep ? 'bg-brown-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm font-body text-brown-600">
              {dummyRoadmap.map((step, index) => (
                <span key={index} className="text-center w-20">Week {step.week}</span>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-brown-100 rounded-full p-3 mr-4">
                <Clock className="w-6 h-6 text-brown-600" />
              </div>
              <div>
                <h2 className="font-headline text-2xl font-bold text-brown-800">
                  Week {dummyRoadmap[currentStep].week} — {dummyRoadmap[currentStep].title}
                </h2>
                <p className="font-body text-brown-600 mt-1">
                  {dummyRoadmap[currentStep].goal}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Tasks */}
              <div>
                <h3 className="font-headline text-lg font-bold text-brown-800 mb-4">What you do</h3>
                <ul className="space-y-3">
                  {dummyRoadmap[currentStep].tasks.map((task, index) => (
                    <li key={index} className="flex items-start">
                      <Circle className="w-4 h-4 text-brown-500 mt-1 mr-3 shrink-0" />
                      <span className="font-body text-brown-700">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div>
                <h3 className="font-headline text-lg font-bold text-brown-800 mb-4">Deliverables</h3>
                <ul className="space-y-3">
                  {dummyRoadmap[currentStep].deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-start">
                      <Download className="w-4 h-4 text-brown-500 mt-1 mr-3 shrink-0" />
                      <span className="font-body text-brown-700">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* KPI */}
            <div className="mt-8 p-4 bg-brown-50 rounded-lg">
              <h4 className="font-headline font-bold text-brown-800 mb-2">Success Metrics:</h4>
              <p className="font-body text-brown-700">{dummyRoadmap[currentStep].kpi}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous Week
            </button>
            
            <button
              onClick={() => setCurrentStep(Math.min(dummyRoadmap.length - 1, currentStep + 1))}
              disabled={currentStep === dummyRoadmap.length - 1}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Week
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Roadmap;