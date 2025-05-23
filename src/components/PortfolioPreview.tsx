import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const PortfolioPreview = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8">
      <h2 className="text-4xl font-bold text-gray-900">Explore My Full Portfolio</h2>
      <p className="text-gray-600 text-lg max-w-xl">
        Visit my complete developer portfolio to see featured projects, case studies, and everything I’ve been building.
      </p>
      <Card className="p-6 border border-gray-200 shadow-md bg-white rounded-lg">
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-sm text-gray-500">Live at</p>
          <a 
            href="https://ebukas.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 text-lg font-medium hover:underline"
          >
            https://ebukas.com
          </a>
          <Button 
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg text-base font-semibold inline-flex items-center"
            asChild
          >
            <a href="https://ebukas.com" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit Portfolio
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioPreview;
