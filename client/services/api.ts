import { CityData } from "../types";

export class UrbanAPIService {
  private static API_BASE = "http://localhost:3001/api";

  // ------------------------
  // Internal request helper
  // ------------------------
  private static async request(endpoint: string, options: RequestInit) {
    const response = await fetch(`${this.API_BASE}${endpoint}`, {
      ...options,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });

    if (!response.ok) {
      let message = "Request failed";
      try {
        const err = await response.json();
        message = err.error || message;
      } catch {}
      throw new Error(message);
    }

    return response.json();
  }

  // ------------------------
  // Auth APIs
  // ------------------------
  static async signIn(email: string, password: string): Promise<any> {
    return this.request("/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
  }

  static async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<any> {
    return this.request("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password })
    });
  }

  // ------------------------
  // FETCH CITY + ZONES (API ONLY)
  // ------------------------
  static async fetchCityData(
    cityName: string
  ): Promise<{ data: CityData; source: "sqlite" }> {
    const response = await fetch(
      `${this.API_BASE}/zones/${cityName}`
    );

    if (!response.ok) {
      throw new Error("No data found for this city");
    }

    const data = await response.json();

    return {
      data,
      source: "sqlite"
    };
  }
}

// ------------------------
// AI ANALYSIS API
// ------------------------
export async function analyzeZone(city: string, zoneName: string) {
  const response = await fetch(
    "http://localhost:3001/api/ai/analyze",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        city,
        zoneName
      })
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch AI analysis");
  }

  const result = await response.json();
  return result.data;
}
