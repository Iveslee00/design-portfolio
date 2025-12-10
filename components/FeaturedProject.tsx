import React from 'react';
import { ArrowRight } from 'lucide-react';

export const FeaturedProject: React.FC = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-white border-y border-black/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
           
           {/* Image Area - Full Color */}
           <div className="lg:col-span-8 relative aspect-video overflow-hidden bg-zinc-100 group">
             <img 
               src="https://picsum.photos/seed/fintechfeature/1600/1200" 
               alt="Fintech Project" 
               className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
             />
             <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-widest">
               Featured Case
             </div>
           </div>

           {/* Content Area - Denser */}
           <div className="lg:col-span-4 flex flex-col justify-center h-full">
             <div className="space-y-4">
               <div>
                  <h2 className="text-3xl md:text-4xl font-black text-black leading-tight uppercase">TechNova <br/> Banking App 2.0</h2>
                  <p className="text-xs text-zinc-400 font-mono mt-2">FINTECH / MOBILE / STRATEGY</p>
               </div>
               
               <p className="text-sm md:text-base text-zinc-600 leading-relaxed text-justify border-l-2 border-zinc-200 pl-4">
                 Redefining the mobile banking experience through deep user research and data-driven design. 
                 We simplified the investment process into 3 intuitive steps, resulting in a 40% increase in DAU.
               </p>

               <div className="flex flex-wrap gap-2 pt-2">
                 {['UX Research', 'Design System', 'Mobile App'].map(tag => (
                   <span key={tag} className="px-3 py-1 bg-zinc-100 text-xs text-black font-bold border border-zinc-200">
                     {tag}
                   </span>
                 ))}
               </div>

               <div className="pt-4">
                 <a 
                   href="#work-tabs"
                   className="inline-flex items-center gap-2 text-black text-sm font-bold uppercase tracking-widest hover:translate-x-1 transition-transform"
                 >
                   View Case Study <ArrowRight size={14} />
                 </a>
               </div>
             </div>
           </div>

        </div>
      </div>
    </section>
  );
};