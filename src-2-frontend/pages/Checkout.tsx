import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

// Define available plans
const AVAILABLE_PLANS: Plan[] = [
  {
    id: 'pro',
    name: 'Pro Plan',
    price: '99',
    description: 'Best for growing businesses',
    features: [
      'All Free features',
      'Advanced analytics',
      'Custom insights',
      'Priority support'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: '299',
    description: 'For large organizations',
    features: [
      'All Pro features',
      'Dedicated support',
      'Custom integrations',
      'Advanced security'
    ]
  }
];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  // Initialize with the plan from location state or default to the first available plan
  const [selectedPlan, setSelectedPlan] = useState<Plan>(() => {
    const planFromState = location.state?.plan;
    if (planFromState) {
      // If we have a plan from state, ensure it has all required fields
      return {
        id: planFromState.id || AVAILABLE_PLANS[0].id,
        name: planFromState.name || AVAILABLE_PLANS[0].name,
        price: planFromState.price || AVAILABLE_PLANS[0].price,
        description: planFromState.description || AVAILABLE_PLANS[0].description,
        features: planFromState.features || AVAILABLE_PLANS[0].features,
      };
    }
    return AVAILABLE_PLANS[0];
  });
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { state: { from: '/checkout' } });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Complete Your Purchase</h2>
        
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6">Select Your Plan</h3>
          
          {/* Plan Dropdown */}
          <div className="relative mb-6">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-black/60 text-white p-4 rounded-lg border border-gray-800 flex items-center justify-between hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{selectedPlan.name}</span>
                <span className="text-sm text-gray-400">{selectedPlan.description}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-white font-medium">${selectedPlan.price}/month</span>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                />
              </div>
            </button>
            
            <div 
              className={`absolute w-full mt-2 bg-black/95 border border-gray-800 rounded-lg shadow-xl z-50 transition-all duration-300 origin-top ${
                isDropdownOpen 
                  ? 'opacity-100 transform scale-y-100' 
                  : 'opacity-0 transform scale-y-0 pointer-events-none'
              }`}
            >
              {AVAILABLE_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => {
                    setSelectedPlan(plan);
                    setIsDropdownOpen(false);
                  }}
                  className={`p-4 hover:bg-gray-800/50 cursor-pointer transition-all duration-300 first:rounded-t-lg last:rounded-b-lg flex justify-between items-center ${
                    selectedPlan.id === plan.id ? 'bg-indigo-600/10 border-l-2 border-l-indigo-500' : ''
                  }`}
                >
                  <span className="font-medium text-white">{plan.name}</span>
                  <span className="text-white font-medium">${plan.price}/month</span>
                </div>
              ))}
            </div>
          </div>

          {/* Plan Features */}
          <div className="p-4 bg-black/30 rounded-lg border border-gray-800/50">
            <h4 className="font-medium text-white mb-3">Included Features:</h4>
            <ul className="space-y-2">
              {selectedPlan.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-400 flex items-center">
                  <span className="mr-2 text-indigo-400">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Payment Details</h3>
            <div className="text-right">
              <p className="text-sm text-gray-400">Total Amount</p>
              <p className="text-lg font-medium text-white">${selectedPlan.price}/month</p>
            </div>
          </div>
          
          <p className="text-gray-400 mb-6">Payment integration coming soon!</p>
          
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/pricing')}
              className="flex-1 bg-gray-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-all duration-300"
            >
              Back to Plans
            </button>
            <button
              onClick={() => {/* Handle payment */}}
              className="flex-1 bg-indigo-600/90 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
