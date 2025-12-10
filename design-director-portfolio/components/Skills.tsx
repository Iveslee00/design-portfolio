import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { SKILL_CHART_DATA } from '../constants';

export const Skills: React.FC = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-white border-y border-zinc-100">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Chart - Left */}
          <div className="h-[300px] md:h-[400px] w-full bg-zinc-50 border border-black/5 p-4 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={SKILL_CHART_DATA}>
                <PolarGrid stroke="#e4e4e7" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#18181b', fontSize: 10, fontWeight: 700 }}
                  tickFormatter={(val) => val.toUpperCase()}
                />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#000"
                  strokeWidth={2}
                  fill="#000"
                  fillOpacity={0.1}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="absolute bottom-2 right-2 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              Skill Matrix v2.4
            </div>
          </div>

          {/* Text Content - Right */}
          <div className="space-y-6 md:pl-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1 block">Capabilities</span>
              <h2 className="text-3xl font-black text-black uppercase leading-none mb-4">Expertise</h2>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-md">
                Bridging the gap between aesthetic excellence and business strategy. My skillset is honed for scalability and impact.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-zinc-100 p-4 hover:border-black transition-colors">
                <h3 className="text-sm font-bold text-black uppercase mb-1">Strategy</h3>
                <p className="text-xs text-zinc-500">Market analysis & Roadmapping</p>
              </div>
              <div className="border border-zinc-100 p-4 hover:border-black transition-colors">
                <h3 className="text-sm font-bold text-black uppercase mb-1">Leadership</h3>
                <p className="text-xs text-zinc-500">Design Ops & Mentorship</p>
              </div>
              <div className="border border-zinc-100 p-4 hover:border-black transition-colors">
                <h3 className="text-sm font-bold text-black uppercase mb-1">Craft</h3>
                <p className="text-xs text-zinc-500">Advanced UI/UX & Systems</p>
              </div>
              <div className="border border-zinc-100 p-4 hover:border-black transition-colors">
                <h3 className="text-sm font-bold text-black uppercase mb-1">Tech</h3>
                <p className="text-xs text-zinc-500">Frontend & Prototyping</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};