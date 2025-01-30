import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
  const navigate = useNavigate();
  const plans = [
    {
      name: "Basic",
      price: "49",
      description: "Perfect for getting started",
      features: [
        "Basic content automation",
        "5 content categories",
        "Standard templates",
        "Basic analytics",
        "Email support"
      ]
    },
    {
      name: "Pro",
      price: "99",
      description: "Best for growing businesses",
      features: [
        "Advanced content automation",
        "All content categories",
        "Custom templates",
        "Advanced analytics",
        "Priority support",
        "API access",
        "Custom integrations"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "299",
      description: "For large organizations",
      features: [
        "Full content automation suite",
        "Unlimited categories",
        "Custom AI models",
        "Enterprise analytics",
        "24/7 dedicated support",
        "Full API access",
        "Custom development",
        "SLA guarantee"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-28 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white">Simple, Transparent Pricing</h1>
          <p className="mt-4 text-xl text-gray-400">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-8 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 ${
                plan.popular ? 'ring-2 ring-indigo-500 relative' : ''
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-0 bg-indigo-600/90 text-white px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-xl">
                  Popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              <p className="text-gray-400 mt-2">{plan.description}</p>
              <div className="mt-6 mb-8">
                <span className="text-5xl font-bold text-white">${plan.price}</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <span className="flex-shrink-0 w-5 h-5 bg-indigo-500/20 rounded flex items-center justify-center mr-3">
                      <Check className="h-3.5 w-3.5 text-indigo-400" />
                    </span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/checkout', { 
                  state: { 
                    plan: {
                      name: plan.name,
                      price: plan.price,
                      description: plan.description
                    }
                  }
                })}
                className={`w-full py-3 px-4 rounded-lg font-medium ${
                  plan.popular
                    ? 'bg-indigo-600/90 text-white hover:bg-indigo-600 shadow-lg hover:shadow-indigo-500/25'
                    : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 hover:border-indigo-500/50'
                } transition-all duration-300`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400">
            Need a custom plan?{' '}
            <a href="/contact" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}