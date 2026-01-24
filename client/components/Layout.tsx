import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  currentCity: string;
  onCityChange: (cityName: string) => void;
  onLogout: () => void;
}

// ✅ FIXED CITIES (NO API, NO DATASET)
const CITIES = ["Pune", "Mumbai", "Solapur"];

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentCity,
  onCityChange,
  onLogout
}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-50 border-b bg-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* LOGO */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              U
            </div>
            <h1 className="text-xl font-black">UrbanAI</h1>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-6">

            {/* ✅ CITY DROPDOWN */}
            <select
              value={currentCity}
              onChange={(e) => onCityChange(e.target.value)}
              className="border px-4 py-2 rounded-lg font-bold bg-white"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {/* LOGOUT */}
            <button
              onClick={onLogout}
              className="text-slate-500 hover:text-rose-500 font-bold"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};
