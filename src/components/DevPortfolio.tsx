import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProfileCard from './ProfileCard';
import PortfolioPreview from './PortfolioPreview';
import ResumeViewer from './ResumeViewer';
import QRCodeGenerator from './QRCodeGenerator';
import { CodeSquare } from 'lucide-react';

const DevPortfolio = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { id: 'profile', label: 'Profile' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'resume', label: 'Resume' },
    { id: 'qr', label: 'QR Code' },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile': return <ProfileCard />;
      case 'portfolio': return <PortfolioPreview />;
      case 'resume': return <ResumeViewer />;
      case 'qr': return <QRCodeGenerator />;
      default: return <ProfileCard />;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 text-black transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 px-4 mb-4 rounded-full bg-white border border-gray-200">
            <CodeSquare size={16} className="text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-700 uppercase tracking-wide">Developer Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Digital Business Card
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Your complete professional identity in one place
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <nav className="flex gap-4 rounded-lg bg-white border border-gray-200 p-2 shadow-sm">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-300 text-sm ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        <Card className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
          {renderActiveSection()}
        </Card>

        <div className="text-center mt-12">
          <Badge variant="outline" className="border border-gray-300 text-gray-500 tracking-wider px-3 py-1 text-xs">
            Built by David Achibiri
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default DevPortfolio;
