
export interface DevelopmentPotential {
  score: number;
  builder_friendly: boolean;
  builder_tag: string;
}

export interface SubZone {
  id: string;
  name: string;
  development_status: 'Emerging' | 'Developing' | 'Mature' | 'Saturation';
}

export interface InvestmentPlan {
  name: string;
  tier: 'Core' | 'Growth' | 'Value-Add';
  timeline: string;
  expectedROI: string;
  minCapital: string;
  description: string;
}

export interface AIAnalysis {
  zone_classification: string;
  development_potential: DevelopmentPotential;
  analysis_summary: {
    why_this_state: string;
  };
  key_insights: string[];
  cons: string[];
  forward_signals: {
    public_tenders?: string;
    upcoming_infrastructure?: string;
  };
}

export interface Zone {
  zoneId: string;
  zoneName: string;
  ai_analysis: AIAnalysis;
  sub_zones: SubZone[];
  investment_plans: InvestmentPlan[];
}

export interface CityData {
  city: string;
  zones: Zone[];
  stats?: {
    market_sentiment: string;
    active_projects: number;
    avg_roi: string;
    growth_trend: string;
  };
}
