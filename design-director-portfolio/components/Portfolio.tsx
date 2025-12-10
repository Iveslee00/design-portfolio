import React, { useState, useMemo, useEffect } from 'react';
import { X, ExternalLink, Calendar, Tag, Eye } from 'lucide-react';
import { PROJECTS_DATA } from '../constants';
import { Project } from '../types';

const CATEGORIES = ['All', 'UI/UX', 'Branding', 'Product', 'Interaction'] as const;
type Category = typeof CATEGORIES[number];

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  return (
    <section id="work" className="py-12 md:py-16 px-4 md:px-8 max-w-[1400px] mx-auto relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6 border-b border-black/5 pb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight">Selected Works</h2>
        </div>
        
        {/* Tabs - Compact */}
        <div id="portfolio-tabs" className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-zinc-500 border-zinc-300 hover:border-black hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid - Tighter gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer flex flex-col gap-3"
    >
      {/* Image Container - No Grayscale */}
      <div className="aspect-[4/3] overflow-hidden bg-white shadow-sm border border-black/5 relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <span className="flex items-center gap-2 px-5 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
             <Eye size={14} /> View Case
           </span>
        </div>
      </div>
      
      {/* Info - Denser */}
      <div className="px-1">
        <div className="flex justify-between items-center mb-1">
           <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border border-zinc-200 px-2 py-0.5">{project.category}</span>
           <span className="text-[10px] font-mono text-zinc-400">{project.year}</span>
        </div>
        <h3 className="text-lg font-bold text-black leading-tight group-hover:text-zinc-600 transition-colors mt-2">
          {project.title}
        </h3>
        <p className="text-xs text-zinc-600 mt-1 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>
    </div>
  );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-white/95 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl bg-white shadow-2xl border border-black/10 flex flex-col md:flex-row h-[85vh] animate-fade-in-up overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black text-white hover:bg-zinc-800 transition-colors shadow-lg"
        >
          <X size={18} />
        </button>

        <div className="w-full md:w-2/3 h-48 md:h-full bg-zinc-100 relative overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/3 p-6 md:p-10 overflow-y-auto bg-white flex flex-col">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-black mb-4 leading-none uppercase">{project.title}</h2>
            
            <div className="flex gap-4 border-b border-zinc-100 pb-4 mb-6">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-0.5">Category</span>
                <span className="text-xs font-bold text-black">{project.category}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-0.5">Year</span>
                <span className="text-xs font-bold text-black">{project.year}</span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-black mb-2 uppercase tracking-wide">About Project</h3>
            <p className="text-sm text-zinc-600 leading-relaxed mb-6 text-justify">
              {project.description}
              <br /><br />
              This project represents a fusion of strategic insight and aesthetic precision. By focusing on user outcomes, we delivered a product that stands the test of time.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-100">
             <button className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
               Launch Project <ExternalLink size={14} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};