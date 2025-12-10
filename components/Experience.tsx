import React from 'react';
import { EXPERIENCE_DATA } from '../constants';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-12 md:py-16 px-4 md:px-8 max-w-[1400px] mx-auto bg-zinc-50/50">
      <div className="grid md:grid-cols-12 gap-8 md:gap-16">
        <div className="md:col-span-4">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 block">Career Path</span>
          <h2 className="text-3xl font-black text-black uppercase leading-none">Experience</h2>
          <p className="text-sm text-zinc-500 mt-4 leading-relaxed">
            A decade of driving design innovation and leading high-performance teams across global markets.
          </p>
        </div>

        <div className="md:col-span-8 space-y-4">
          {EXPERIENCE_DATA.map((job) => (
            <div key={job.id} className="group bg-white p-6 shadow-sm border border-black/5 hover:border-black/20 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-black group-hover:text-zinc-700 transition-colors">{job.role}</h3>
                <span className="text-xs font-mono text-zinc-400">{job.period}</span>
              </div>
              <div className="text-sm font-bold text-zinc-500 mb-3 uppercase tracking-wide">{job.company}</div>
              
              <ul className="space-y-1.5">
                {job.description.map((desc, index) => (
                  <li key={index} className="text-sm text-zinc-600 flex items-start leading-relaxed">
                    <span className="mr-3 mt-1.5 w-1 h-1 bg-black rounded-full flex-shrink-0" />
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};