'use client';

import { Search, History } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { ToolCard } from '@/components/tool-card';
import { toolCatalog } from '@/lib/tool-catalog';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);
  const allFeatures = toolCatalog.filter(
    (feature): feature is typeof feature & { imageId: string } => Boolean(feature.imageId)
  );

  useEffect(() => {
    const storedRecents = localStorage.getItem('recentlyUsedTools');
    if (storedRecents) {
      setRecentlyUsed(JSON.parse(storedRecents));
    }
  }, []);

  const handleToolClick = (href: string) => {
    let updatedRecents = [href, ...recentlyUsed.filter(item => item !== href)];
    updatedRecents = updatedRecents.slice(0, 4); // Keep only the last 4
    setRecentlyUsed(updatedRecents);
    localStorage.setItem('recentlyUsedTools', JSON.stringify(updatedRecents));
  };
  
  const filteredFeatures = allFeatures.filter(feature =>
    feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentlyUsedFeatures = recentlyUsed
    .map(href => allFeatures.find(f => f.href === href))
    .filter(Boolean) as typeof allFeatures;


  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-4xl font-bold tracking-tight">Welcome to Inked AI Powerhouse</h1>
        <p className="text-muted-foreground mt-2">Your suite of intelligent tools for writing and content creation. Live tools open directly, and unreleased premium tools now route to an upgrade path instead of dead links.</p>
        <div className="relative mt-4 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for a tool..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full bg-background"
          />
        </div>
      </div>
      
      {recentlyUsedFeatures.length > 0 && (
        <div>
          <h2 className="font-headline text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <History className="h-6 w-6" /> Recently Used
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyUsedFeatures.map((feature) => (
              <ToolCard
                key={feature.href}
                {...feature}
                onClick={() => handleToolClick(feature.href)}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-headline text-2xl font-bold tracking-tight mb-4">All Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature) => (
            <ToolCard
              key={feature.title}
              {...feature}
              onClick={() => handleToolClick(feature.href)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
