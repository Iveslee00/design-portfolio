import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Menu, X, ArrowDown, Layers, Users, Globe, 
  Radar, Linkedin, Mail, Dribbble, Twitter, 
  ArrowRight, ExternalLink, Eye 
} from 'lucide-react';
import { 
  Radar as RadarGraph, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';

// --- Types ---
interface Project {
  id: string;
  title: string;
  category: 'UI/UX' | 'Branding' | 'Product' | 'Interaction';
  image: string;
  description: string;
  year: string;
}

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}

// --- Constants & Data ---
const HERO_DATA = {
  name: "Alex Chen",
  title: "Design Director & Product Strategist",
  intro: "專注於打造以人為本的數位體驗。擁有 10 年以上的設計領導經驗，善於將商業目標轉化為極具感染力的視覺語言與直覺的交互介面。",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
};

const SKILL_CHART_DATA: SkillData[] = [
  { subject: 'UI/UX Design', A: 95, fullMark: 100 },
  { subject: 'Strategy', A: 90, fullMark: 100 },
  { subject: 'Leadership', A: 85, fullMark: 100 },
  { subject: 'Branding', A: 80, fullMark: 100 },
  { subject: 'Development', A: 60, fullMark: 100 },
  { subject: 'Data Analysis', A: 70, fullMark: 100 },
];

const EXPERIENCE_DATA: Experience[] = [
  {
    id: '1',
    role: "Design Director",
    company: "TechNova Solutions",
    period: "2021 - Present",
    description: [
      "領導 15 人的跨國設計團隊，負責全產品線的設計語言系統更新。",
      "成功主導 Fintech 產品重構，提升使用者留存率 40%。",
      "建立 Design Ops 流程，縮短設計開發交付時間 30%。"
    ]
  },
  {
    id: '2',
    role: "Lead Product Designer",
    company: "Creative Pulse Agency",
    period: "2018 - 2021",
    description: [
      "負責多個財富 500 強客戶的數位轉型專案。",
      "獲得 2020 年 iF 設計金獎。",
      "主導從 0 到 1 的 SaaS 平台開發與設計。"
    ]
  },
  {
    id: '3',
    role: "Senior UI/UX Designer",
    company: "StartLine Inc.",
    period: "2015 - 2018",
    description: [
      "負責移動端應用程式的介面設計與互動原型。",
      "協助制定初期品牌視覺識別系統。"
    ]
  }
];

const PROJECTS_DATA: Project[] = [
  {
    id: 'p1',
    title: "FinFlow Banking App",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    description: "為新世代打造的直覺化理財應用，整合 AI 投資建議。我們重新思考了傳統銀行的複雜流程，將其轉化為簡單、透明的互動體驗。",
    year: "2023"
  },
  {
    id: 'p2',
    title: "Nebula Brand Identity",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    description: "一家雲端運算科技公司的全套品牌識別系統重塑。設計理念源自於星雲的聚合與擴張，象徵數據的無限可能。",
    year: "2022"
  },
  {
    id: 'p3',
    title: "EcoSmart Dashboard",
    category: "Product",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    description: "企業級能源監控儀表板，提供即時數據視覺化。協助大型工廠即時監控碳排放與能源消耗，達成 ESG 目標。",
    year: "2023"
  },
  {
    id: 'p4',
    title: "Lumina Smart Home",
    category: "Interaction",
    image: "https://images.unsplash.com/photo-1558002038-1091a1661116?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    description: "智慧家居中控介面，強調手勢操作與語音回饋。打破傳統開關限制，創造沈浸式的居家控制體驗。",
    year: "2021"
  },
  {
    id: 'p5',
    title: "Urban Fashion E-com",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    description: "高轉換率的潮流電商網站設計。專注於移動端購物流程優化與視覺衝擊力的平衡。",
    year: "2022"
  },
  {
    id: 'p6',
    title: "Zenith Logo System",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1626785774573-4b799314348d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    description: "模組化的動態 Logo 系統，適應各種數位載體。讓品牌標誌在不同螢幕尺寸下都能保持最佳識別度。",
    year: "2020"
  }
];

const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: '#', icon: Linkedin },
  { name: 'Dribbble', url: '#', icon: Dribbble },
  { name: 'Twitter', url: '#', icon: Twitter },
  { name: 'Email', url: 'mailto:hello@alex.design', icon: Mail },
];

// --- Sub Components ---

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Work', href: '#work' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-black/5 py-3 shadow-sm' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#" className="text-lg font-black tracking-tighter text-black flex items-center gap-1">
          ALEX<span className="w-1.5 h-1.5 bg-black mt-1"></span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-zinc-500 hover:text-black transition-colors text-xs font-bold tracking-widest uppercase relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-black p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-black/5 px-4 py-6 flex flex-col space-y-4 shadow-2xl h-screen animate-fade-in">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-zinc-600 hover:text-black text-2xl font-bold tracking-tight uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => {
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
      
      // Changed particle color to match light theme (Dark Grey)
      ctx.fillStyle = '#27272a'; 
      ctx.strokeStyle = 'rgba(39, 39, 42, 0.1)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

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

const Skills: React.FC = () => {
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
                <RadarGraph
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

const Experience: React.FC = () => {
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

const FeaturedProject: React.FC = () => {
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
                   href="#work"
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

// --- Portfolio Components (Card & Modal) ---

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

const CATEGORIES = ['All', 'UI/UX', 'Branding', 'Product', 'Interaction'] as const;
type Category = typeof CATEGORIES[number];

const Portfolio: React.FC = () => {
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

const Footer: React.FC = () => {
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

// --- Main App Component ---

function App() {
  return (
    <div className="bg-noise min-h-screen text-zinc-900 selection:bg-black selection:text-white">
      <Navigation />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <FeaturedProject />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}

export default App;