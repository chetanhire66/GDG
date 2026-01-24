import React, { useEffect, useState } from "react";
import { Zone } from "../types";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ZoneDetailProps {
  zone: Zone | null;
  aiAnalysis: any;
  isAILoading: boolean;
}

export const ZoneDetail: React.FC<ZoneDetailProps> = ({
  zone,
  aiAnalysis,
  isAILoading
}) => {
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    setIsChanging(true);
    const timer = setTimeout(() => setIsChanging(false), 80);
    return () => clearTimeout(timer);
  }, [zone?.zoneId]);

  // --------------------
  // Empty state
  // --------------------
  if (!zone) {
    return (
      <div className="h-full min-h-[500px] flex items-center justify-center bg-white border border-slate-200 rounded-3xl">
        <p className="text-slate-400 font-semibold">
          Select a zone to view AI insights
        </p>
      </div>
    );
  }

  // --------------------
  // Loading AI
  // --------------------
  if (isAILoading) {
    return (
      <div className="h-full min-h-[500px] flex items-center justify-center bg-white border border-slate-200 rounded-3xl">
        <p className="text-indigo-500 font-bold tracking-widest uppercase text-xs animate-pulse">
          Running AI analysis…
        </p>
      </div>
    );
  }
  
  if (!aiAnalysis) {
    return (
      <div className="h-full min-h-[500px] flex items-center justify-center bg-white border border-slate-200 rounded-3xl">
        <p className="text-slate-400 font-medium">
          AI insights unavailable for this zone
        </p>
      </div>
    );
  }  

  const analysis = aiAnalysis.zones[0].ai_analysis;

  const scoreData = [
    { name: "Potential", value: analysis.development_potential.score },
    { name: "Gap", value: 10 - analysis.development_potential.score }
  ];

  if (isChanging) {
    return <div className="h-full bg-slate-50 rounded-3xl animate-pulse" />;
  }

  // --------------------
  // Main Render
  // --------------------
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/40">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            {zone.zoneName}
          </h2>
          <span className="inline-block mt-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold">
            {analysis.zone_classification}
          </span>
        </div>

        {/* Score */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-16 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scoreData}
                  innerRadius={22}
                  outerRadius={30}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  <Cell fill="#6366f1" />
                  <Cell fill="#e2e8f0" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">
              {analysis.development_potential.score}/10
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Growth Score
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-8 space-y-8">
        <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
            Executive Summary
          </h3>
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl">
            <p className="text-lg text-slate-700 italic leading-relaxed">
              “{analysis.analysis_summary.why_this_state}”
            </p>
          </div>
        </section>

        {/* Subzone Recommendations */}
        <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
            Sub-Zone Recommendations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.subzone_recommendations.map((sz: any, idx: number) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition-all"
              >
                <h4 className="font-bold text-slate-900 mb-1">
                  {sz.subzone_name}
                </h4>
                <span className="text-xs font-bold text-indigo-600 uppercase">
                  {sz.development_focus}
                </span>
                <p className="text-sm text-slate-600 mt-2">
                  {sz.rationale}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Builder Strategy */}
        <section className="p-6 bg-slate-900 rounded-2xl text-white">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Builder Strategy
          </span>
          <p className="text-xl font-extrabold mt-2">
            {analysis.development_potential.builder_tag}
          </p>
        </section>
      </div>
    </div>
  );
};
