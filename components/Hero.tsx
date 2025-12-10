import React, { useEffect, useRef } from 'react';
import { ArrowDown, MoveRight, Layers, Users, Globe } from 'lucide-react';
import { HERO_DATA } from '../constants';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;
    
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleResize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const particleCount = width < 768 ? 40 : 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      ctx.fillStyle = '#18181B';
      ctx.strokeStyle = 'rgba(24, 24, 27, 0.1)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x -= dx * 0.02;
          p.y -= dy * 0.02;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const distance = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance < 100) {
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="about" className="relative pt-24 pb-12 md:pb-16 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Col: Main Typography */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
          
          {/* Header */}
          <div className="border-b border-black pb-6">
             <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Portfolio '24</span>
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Available for Hire
                </span>
             </div>
             <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-[0.85] tracking-tighter">
              ALEX <br /> CHEN
             </h1>
          </div>
          
          {/* Intro Grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
             <div className="space-y-4">
                <h2 className="text-2xl font-bold leading-none">Design Director <br/> & Strategist</h2>
                <div className="w-12 h-1 bg-black"></div>
                <p className="text-sm md:text-base font-medium text-zinc-600 leading-relaxed text-justify">
                  {HERO_DATA.intro}
                </p>
                <div className="flex gap-4 pt-2">
                  <a href="#portfolio-tabs" className="text-xs font-bold uppercase tracking-widest border-b border-black hover:text-zinc-600 transition-colors">View Projects</a>
                  <a href="#contact" className="text-xs font-bold uppercase tracking-widest border-b border-black hover:text-zinc-600 transition-colors">Contact Me</a>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-black/5 shadow-sm">
                   <Layers size={20} className="mb-2"/>
                   <div className="text-2xl font-bold">10+</div>
                   <div className="text-xs text-zinc-500 uppercase">Years Exp.</div>
                </div>
                <div className="p-4 bg-white border border-black/5 shadow-sm">
                   <Users size={20} className="mb-2"/>
                   <div className="text-2xl font-bold">15+</div>
                   <div className="text-xs text-zinc-500 uppercase">Team Lead</div>
                </div>
                <div className="p-4 bg-white border border-black/5 shadow-sm col-span-2">
                   <Globe size={20} className="mb-2"/>
                   <div className="text-2xl font-bold">Intl.</div>
                   <div className="text-xs text-zinc-500 uppercase">Client Base</div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Col: Image with Canvas Overlay */}
        <div className="lg:col-span-4 relative min-h-[400px] lg:min-h-full overflow-hidden bg-zinc-200">
          <canvas 
            ref={canvasRef} 
            className="absolute top-0 left-0 w-full h-full z-10 opacity-60"
          />
          <img 
            src={HERO_DATA.avatar} 
            alt="Alex Chen" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent z-20">
             <p className="text-white text-xs font-mono tracking-widest">LOC: TAIPEI, TAIWAN</p>
             <p className="text-white/60 text-xs font-mono tracking-widest">UTC+8 09:00 - 18:00</p>
          </div>
        </div>

      </div>
    </section>
  );
};