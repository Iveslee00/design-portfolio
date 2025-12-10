import React from 'react';
import { SOCIAL_LINKS } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-16 bg-black text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-800 via-white to-zinc-800 opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase">
          Let's Build Something Great
        </h2>
        <p className="text-zinc-400 text-base mb-10 max-w-xl font-light">
          Available for design leadership roles and strategic consulting.
        </p>
        
        <div className="flex gap-4 mb-12">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="w-10 h-10 flex items-center justify-center bg-zinc-900 text-white hover:bg-white hover:text-black transition-all duration-300 border border-zinc-800"
              aria-label={link.name}
            >
              <link.icon size={18} />
            </a>
          ))}
        </div>

        <div className="w-full border-t border-zinc-900 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 uppercase tracking-wider">
          <div>&copy; {new Date().getFullYear()} Alex Chen. All Rights Reserved.</div>
          <div className="mt-2 md:mt-0">Design Portfolio v3.0</div>
        </div>
      </div>
    </footer>
  );
};