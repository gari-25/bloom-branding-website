'use client';

import React, { useState } from 'react';
import { Sparkles, Palette, TrendingUp, Users, ArrowRight, Check } from 'lucide-react';

export default function BloomServices() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Brand Identity Design",
      description: "We craft distinctive visual identities that capture your brand's essence and resonate with your audience.",
      features: ["Logo Design", "Color Palette", "Typography", "Brand Guidelines"],
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Brand Strategy",
      description: "Strategic positioning and messaging that differentiates your brand in the marketplace.",
      features: ["Market Research", "Brand Positioning", "Messaging Framework", "Competitor Analysis"],
      color: "from-yellow-300 to-yellow-400"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Digital Marketing",
      description: "Data-driven campaigns that amplify your brand presence and drive measurable growth.",
      features: ["Social Media", "Content Strategy", "SEO Optimization", "Email Campaigns"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Brand Experience",
      description: "Create memorable touchpoints that build lasting connections with your customers.",
      features: ["Website Design", "Packaging Design", "Brand Collateral", "Customer Journey"],
      color: "from-yellow-200 to-yellow-300"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </div>
            <span className="text-2xl font-bold text-amber-950">
              Bloom
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-stone-600">
            <a href="#" className="hover:text-blue-600 transition">Home</a>
            <a href="#services" className="hover:text-blue-600 transition">Services</a>
            <a href="#" className="hover:text-blue-600 transition">Portfolio</a>
            <a href="#" className="hover:text-blue-600 transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-amber-950 mb-6">
          Our <span className="text-blue-600">Services</span>
        </h1>
        <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-12">
          We help brands bloom with strategic creativity and purposeful design. From identity to execution, we're your partner in building brands that matter.
        </p>
      </section>

      {/* Services Grid */}
      <section id="services" className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6`}>
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-amber-950 mb-4">
                {service.title}
              </h3>
              
              <p className="text-stone-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-3">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-stone-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className={`mt-8 flex items-center gap-2 bg-gradient-to-r ${service.color} bg-clip-text text-transparent font-semibold group`}>
                Learn More
                <ArrowRight className={`w-5 h-5 text-blue-600 transition-transform ${hoveredService === index ? 'translate-x-2' : ''}`} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-blue-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Bloom?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Let's create something extraordinary together. Your brand's transformation starts here.
          </p>
          <button className="bg-yellow-300 text-amber-950 px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105 hover:bg-yellow-400">
            Start Your Project
          </button>
        </div>
      </section>
    </div>
  );
}