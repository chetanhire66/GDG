import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ZoneCard } from './components/ZoneCard';
import { ZoneDetail } from './components/ZoneDetail';
import { AuthPage } from './components/AuthPage';
import { AIChatBot } from './components/AIChatBot';
import { UrbanAPIService, analyzeZone } from './services/api';
import { Zone, CityData } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentCityData, setCurrentCityData] = useState<CityData | null>(null);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isCityTransitioning, setIsCityTransitioning] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const [dataSource, setDataSource] = useState<'sqlite' | 'mock'>('mock');

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  // Load city data from API
  const loadCity = async (cityName: string) => {
    setIsCityTransitioning(true);
    try {
      const { data, source } = await UrbanAPIService.fetchCityData(cityName);
      setCurrentCityData(data);
      setSelectedZone(data.zones[0]);
      setDataSource(source);
    } catch (err) {
      console.error("Failed to load city data:", err);
    } finally {
      setTimeout(() => setIsCityTransitioning(false), 300);
    }
  };

  // Call AI when zone changes
  const runAIForZone = async (city: string, zoneName: string) => {
    setIsAILoading(true);
    setAiAnalysis(null);
  
    try {
      const result = await analyzeZone(city, zoneName);
  
      if (!result?.zones?.length) {
        throw new Error("Invalid AI response");
      }
  
      const aiZone = result.zones[0];
  
      setAiAnalysis(result);
  
      setCurrentCityData(prev => {
        if (!prev) {
          // city never existed → create new city
          return {
            city,
            zones: [{
              zoneId: Date.now(),
              zoneName: aiZone.zoneName,
              ai_analysis: aiZone.ai_analysis
            }]
          };
        }
  
        const zoneExists = prev.zones.some(
          z => z.zoneName === aiZone.zoneName
        );
  
        if (zoneExists) return prev;
  
        // 🔥 ADD NEW ZONE DYNAMICALLY
        return {
          ...prev,
          zones: [
            ...prev.zones,
            {
              zoneId: Date.now(),
              zoneName: aiZone.zoneName,
              ai_analysis: aiZone.ai_analysis
            }
          ]
        };
      });
  
    } catch (err) {
      console.error("AI analysis failed:", err);
    } finally {
      setIsAILoading(false);
    }
  };   

  useEffect(() => {
    if (isAuthenticated) {
      loadCity("Pune");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedZone && currentCityData) {
      runAIForZone(currentCityData.city, selectedZone.zoneName);
    }
  }, [selectedZone, currentCityData]);

  const handleCityChange = (cityName: string) => {
    loadCity(cityName);
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  if (!currentCityData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-400 font-bold tracking-widest uppercase text-xs">
            Connecting to Urban Intelligence Database...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout
      currentCity={currentCityData.city}
      onCityChange={handleCityChange}
      onLogout={handleLogout}
    >
      {/* Database Connection Status Bar */}
      <div className="mb-6 flex items-center justify-end">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${
            dataSource === 'sqlite'
              ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
              : 'bg-amber-50 text-amber-600 border-amber-100'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              dataSource === 'sqlite'
                ? 'bg-emerald-500 animate-pulse'
                : 'bg-amber-500'
            }`}
          ></span>
          {dataSource === 'sqlite'
            ? 'Live SQLite Backend'
            : 'Mock Intelligence Fallback'}
        </div>
      </div>

      <div
        className={`flex flex-col lg:flex-row gap-8 transition-all duration-500 ${
          isCityTransitioning
            ? 'opacity-0 scale-95 blur-sm'
            : 'opacity-100 scale-100 blur-0'
        }`}
      >
        {/* Left Sidebar - Zone List */}
        <div className="w-full lg:w-1/3 xl:w-1/4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
              Zones
            </h2>
            <span className="text-[10px] font-black text-indigo-600 px-2 py-1 bg-indigo-50 rounded-md border border-indigo-100">
              {currentCityData.zones.length} AREAS MAPPED
            </span>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-250px)] pr-2">
            {currentCityData.zones.map((zone) => (
              <ZoneCard
                key={zone.zoneId}
                zone={zone}
                isSelected={selectedZone?.zoneId === zone.zoneId}
                onClick={() => setSelectedZone(zone)}
              />
            ))}
          </div>
        </div>

        {/* Right Content - Detailed Analysis */}
        <div className="flex-1 min-h-[600px]">
          <ZoneDetail
            zone={selectedZone}
            aiAnalysis={aiAnalysis}
            isAILoading={isAILoading}
          />
        </div>
      </div>

      {/* Floating AI Assistant */}
      <AIChatBot
        activeZone={selectedZone}
        activeCity={currentCityData.city}
      />
    </Layout>
  );
};

export default App;
