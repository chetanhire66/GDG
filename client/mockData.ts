
import { CityData } from './types';

export const PUNE_DATA: CityData = {
  city: "Pune",
  zones: [
    {
      zoneId: "KED_DAUND",
      zoneName: "Kedgaon (Station)",
      sub_zones: [
        { id: "SZ1_KED", name: "Station Road North", development_status: "Mature" },
        { id: "SZ2_KED", name: "NH-65 Logistics Corridor", development_status: "Developing" },
        { id: "SZ3_KED", name: "Pargaon Residential Block", development_status: "Emerging" }
      ],
      investment_plans: [
        {
          name: "Industrial Park A",
          tier: "Value-Add",
          timeline: "3-5 Years",
          expectedROI: "14-16%",
          minCapital: "₹25 Cr",
          description: "Focus on multi-tenant warehousing facilities optimized for e-commerce logistics near NH-65."
        }
      ],
      ai_analysis: {
        zone_classification: "Semi-developed",
        development_potential: {
          score: 6.7,
          builder_friendly: true,
          builder_tag: "Logistics & Industrial Satellite"
        },
        analysis_summary: {
          why_this_state: "Strategically positioned at the intersection of NH-65 (Solapur Highway) and a major railway junction, Kedgaon functions as a self-sustaining industrial satellite rather than a pure residential suburb."
        },
        key_insights: [
          "Railway connectivity (Pune–Daund corridor) differentiates it from other highway-only zones",
          "High volume of logistics and warehousing land absorption due to NH-65 frontage"
        ],
        cons: [
          "Heavy noise pollution due to proximity to primary railway tracks and highway transit",
          "Lack of premium social infrastructure (malls, international schools) in the immediate vicinity",
          "Groundwater depletion issues reported in the Pargaon block"
        ],
        forward_signals: {
          public_tenders: "Infrastructure upgrades for Daund junction planned for Q4 2024.",
          upcoming_infrastructure: "Smart City peripheral ring road expansion likely to touch western boundary."
        }
      }
    },
    {
      zoneId: "KHARADI_EON",
      zoneName: "Kharadi IT Corridor",
      sub_zones: [
        { id: "KH1", name: "EON Phase 1", development_status: "Saturation" },
        { id: "KH2", name: "World Trade Center Perimeter", development_status: "Mature" },
        { id: "KH3", name: "Vitthal Nagar Extension", development_status: "Developing" },
        { id: "KH4", name: "Upper Kharadi (Riverfront)", development_status: "Emerging" }
      ],
      investment_plans: [
        {
          name: "Premium Managed Office",
          tier: "Core",
          timeline: "2-4 Years",
          expectedROI: "11-13%",
          minCapital: "₹15 Cr",
          description: "Grade-A boutique office spaces targeting global tech captives in the EON-WTC belt."
        }
      ],
      ai_analysis: {
        zone_classification: "High-Growth IT Hub",
        development_potential: {
          score: 9.1,
          builder_friendly: true,
          builder_tag: "Global IT Hub"
        },
        analysis_summary: {
          why_this_state: "Kharadi has surpassed Hinjewadi as the preferred IT destination due to its proximity to the airport and superior residential-commercial mix."
        },
        key_insights: [
          "Riverfront development potential with the new Mula-Mutha rejuvenation project",
          "Highest absorption of commercial Grade-A space in Pune East"
        ],
        cons: [
          "High entry cost for residential plots in the riverfront zones",
          "Traffic bottlenecks at the Kharadi-Mundhwa bridge during peak shifts",
          "Intermittent power grid stability issues in the Vitthal Nagar extension"
        ],
        forward_signals: {
          public_tenders: "Kharadi-Shivane Riverside Road construction tender awarded.",
          upcoming_infrastructure: "Metro Phase 2 extension from Ramwadi to Kharadi South."
        }
      }
    },
    {
      zoneId: "BALEWADI_H",
      zoneName: "Balewadi Lifestyle Zone",
      sub_zones: [
        { id: "BW1", name: "High Street North", development_status: "Saturation" },
        { id: "BW2", name: "Mhalunge-Balewadi Bridge", development_status: "Developing" },
        { id: "BW3", name: "Baner-Balewadi Border", development_status: "Mature" }
      ],
      investment_plans: [],
      ai_analysis: {
        zone_classification: "Premium Residential/Retail",
        development_potential: { score: 8.8, builder_friendly: true, builder_tag: "Luxury Retail & Housing" },
        analysis_summary: { why_this_state: "The transformation of High Street into a premier F&B and retail destination has fundamentally re-rated property values in the entire western corridor." },
        key_insights: ["Premium for 'High Street' proximity is roughly 15-20% over standard Balewadi rates", "Rapid conversion of old residential villas into commercial boutiques"],
        cons: [
          "Chronic parking shortages leading to severe weekend road congestion",
          "High land fragmentation makes larger integrated township projects difficult",
          "Escalating commercial rentals driving out smaller home-grown retailers"
        ],
        forward_signals: { upcoming_infrastructure: "Smart City traffic management system phase 2 rollout." }
      }
    },
    {
      zoneId: "HINJEW_PHASE3",
      zoneName: "Hinjewadi Phase 3",
      sub_zones: [
        { id: "SZ1_HIN", name: "Tech Park Perimeter", development_status: "Saturation" },
        { id: "SZ2_HIN", name: "Maan Village Extension", development_status: "Developing" }
      ],
      investment_plans: [],
      ai_analysis: {
        zone_classification: "Highly Developed",
        development_potential: {
          score: 8.9,
          builder_friendly: true,
          builder_tag: "Premium IT Hub"
        },
        analysis_summary: {
          why_this_state: "The epicenter of Pune's IT export economy, Hinjewadi Phase 3 is seeing a shift from commercial-only to premium integrated townships."
        },
        key_insights: [
          "High rental yield potential for 1BHK and Studio units",
          "Metro Line 3 connectivity is the primary driver"
        ],
        cons: [
          "Extreme peak-hour traffic congestion at Shivaji Chowk and Phase 3 entry points",
          "Hyper-inflated property prices compared to neighbouring villages like Maan",
          "Dependency on private water tankers due to delayed municipal supply completion"
        ],
        forward_signals: {
          public_tenders: "New flyover connecting to Baner-Balewadi corridor."
        }
      }
    }
  ]
};

export const MUMBAI_DATA: CityData = {
  city: "Mumbai",
  zones: [
    {
      zoneId: "BKC_GBLOCK",
      zoneName: "Bandra Kurla Complex",
      sub_zones: [
        { id: "BKC1", name: "G Block (Finance)", development_status: "Saturation" },
        { id: "BKC2", name: "E Block (Hospitality)", development_status: "Mature" },
        { id: "BKC3", name: "MTNL Road (Comm.)", development_status: "Developing" }
      ],
      investment_plans: [
        {
          name: "Grade-A Asset Acquisition",
          tier: "Core",
          timeline: "7-10 Years",
          expectedROI: "8-10%",
          minCapital: "₹100 Cr",
          description: "Direct ownership of commercial assets in the G-Block corridor, targeting Fortune 500 tenants."
        }
      ],
      ai_analysis: {
        zone_classification: "Global Business District",
        development_potential: { score: 9.8, builder_friendly: false, builder_tag: "Ultra-Premium Commercial" },
        analysis_summary: { why_this_state: "The most expensive commercial real estate in India, BKC is the non-negotiable headquarters for major financial institutions and conglomerates." },
        key_insights: ["Bullet Train station (HSR) will further solidify BKC as the primary transit node", "Transition from pure commercial to 'Work-Live-Play' with ultra-luxury residential entries"],
        cons: [
          "Prohibitive entry costs for developers with land bids often exceeding sustainable yields",
          "Heavy security protocols and restricted movement during high-profile VIP events",
          "Low supply of high-quality affordable housing within a 5km radius"
        ],
        forward_signals: { upcoming_infrastructure: "Underground Metro Line 3 connection to Airport/Colaba." }
      }
    },
    {
      zoneId: "WORLI_SEAFACE",
      zoneName: "Worli Luxury Cluster",
      sub_zones: [
        { id: "WR1", name: "Annie Besant Road", development_status: "Saturation" },
        { id: "WR2", name: "Worli Sea Face", development_status: "Mature" },
        { id: "WR3", name: "Prabhadevi Extension", development_status: "Saturation" }
      ],
      investment_plans: [],
      ai_analysis: {
        zone_classification: "Ultra-Luxury Residential",
        development_potential: { score: 9.4, builder_friendly: false, builder_tag: "Skyline Dominance" },
        analysis_summary: { why_this_state: "The shift of South Mumbai's luxury center from Malabar Hill to Worli is now complete, driven by modern skyscraper amenities." },
        key_insights: ["Coastal Road project is the single biggest value-unlock for the next decade", "Uninterrupted sea views command a 40% premium over city-facing units"],
        cons: [
          "Massive over-supply of ultra-luxury (₹15Cr+) units leading to high unsold inventory",
          "Noise and air pollution during the ongoing Coastal Road construction phase",
          "Strict CRZ (Coastal Regulation Zone) norms limit redevelopment potential of older buildings"
        ],
        forward_signals: { public_tenders: "Worli-Sewri elevated corridor work in final stages." }
      }
    },
    {
      zoneId: "THANE_W_GBR",
      zoneName: "Thane Ghodbunder Rd",
      sub_zones: [
        { id: "TH1", name: "Majiwada Junction", development_status: "Saturation" },
        { id: "TH2", name: "Kasarvadavali", development_status: "Developing" },
        { id: "TH3", name: "Ovale / Bhayanderpada", development_status: "Emerging" }
      ],
      investment_plans: [
        {
          name: "Mid-Market Township",
          tier: "Growth",
          timeline: "4-6 Years",
          expectedROI: "12-15%",
          minCapital: "₹40 Cr",
          description: "Mass-market residential townships targeting first-time home buyers with integrated retail."
        }
      ],
      ai_analysis: {
        zone_classification: "Residential Corridor",
        development_potential: { score: 8.2, builder_friendly: true, builder_tag: "Mass Housing Hero" },
        analysis_summary: { why_this_state: "Ghodbunder Road remains the primary valve for Mumbai's mid-income residential demand, balancing cost and connectivity." },
        key_insights: ["Metro Line 4 will reduce commute to BKC/Wadala by 45 minutes", "Strong educational and healthcare infrastructure already established"],
        cons: [
          "Significant traffic congestion at Majiwada and Kapurbawdi junctions",
          "Reliance on private commute until Metro operations commence",
          "Issues with sewage treatment capacity in some newer high-rise clusters"
        ],
        forward_signals: { upcoming_infrastructure: "Thane-Borivali twin tunnel project approval." }
      }
    }
  ]
};

export const BANGALORE_DATA: CityData = {
  city: "Bangalore",
  zones: [
    {
      zoneId: "WHITEFIELD_IT",
      zoneName: "Whitefield Cluster",
      sub_zones: [
        { id: "WF1", name: "ITPB / Brigade Tech", development_status: "Saturation" },
        { id: "WF2", name: "Kadugodi Extension", development_status: "Developing" },
        { id: "WF3", name: "Varthur Outer", development_status: "Emerging" }
      ],
      investment_plans: [],
      ai_analysis: {
        zone_classification: "IT Hub & Residential",
        development_potential: { score: 9.0, builder_friendly: true, builder_tag: "The Silicon Valley Heart" },
        analysis_summary: { why_this_state: "Whitefield remains the global benchmark for India's IT infrastructure, now seeing a new wave of demand due to Metro connectivity." },
        key_insights: ["Purple Line Metro has fundamentally changed the rental dynamics of this zone", "Transitioning from a weekday-commute hub to a weekend lifestyle destination"],
        cons: [
          "Acute water shortages during summer months due to over-dependence on borewells",
          "Significant 'last-mile' connectivity gaps from Metro stations to tech parks",
          "Unplanned drainage leading to localized flooding during monsoon downpours"
        ],
        forward_signals: { upcoming_infrastructure: "Peripheral Ring Road (PRR) Phase 1 integration." }
      }
    },
    {
      zoneId: "INDIRANAGAR_C",
      zoneName: "Indiranagar Hub",
      sub_zones: [
        { id: "IN1", name: "100 Feet Road Retail", development_status: "Saturation" },
        { id: "IN2", name: "Defence Colony", development_status: "Saturation" },
        { id: "IN3", name: "HAL Stage 2", development_status: "Mature" }
      ],
      investment_plans: [],
      ai_analysis: {
        zone_classification: "Mature Lifestyle Hub",
        development_potential: { score: 7.9, builder_friendly: false, builder_tag: "Premium Boutique Retail" },
        analysis_summary: { why_this_state: "Bangalore's most vibrant lifestyle district, Indiranagar balances high-end residential with global retail and nightlife." },
        key_insights: ["Commercial rental yields for F&B outlets are among the highest in South India", "Steady demand for premium redeveloped villas and low-rise apartments"],
        cons: [
          "Increasing conflict between residential tranquility and booming commercial/nightlife noise",
          "Extremely narrow arterial roads unable to handle modern SUV traffic",
          "High power tariff and property tax revisions recently implemented"
        ],
        forward_signals: { public_tenders: "Underground cable ducting and footpath restoration." }
      }
    }
  ]
};

export const ALL_CITIES: CityData[] = [PUNE_DATA, MUMBAI_DATA, BANGALORE_DATA];
