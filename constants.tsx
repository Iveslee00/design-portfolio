import { Project, Experience, SkillData } from './types';
import { Linkedin, Mail, Dribbble, Twitter } from 'lucide-react';

export const HERO_DATA = {
  name: "Alex Chen",
  title: "Design Director & Product Strategist",
  intro: "專注於打造以人為本的數位體驗。擁有 10 年以上的設計領導經驗，善於將商業目標轉化為極具感染力的視覺語言與直覺的交互介面。",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
};

export const SKILL_CHART_DATA: SkillData[] = [
  { subject: 'UI/UX Design', A: 95, fullMark: 100 },
  { subject: 'Strategy', A: 90, fullMark: 100 },
  { subject: 'Leadership', A: 85, fullMark: 100 },
  { subject: 'Branding', A: 80, fullMark: 100 },
  { subject: 'Development', A: 60, fullMark: 100 },
  { subject: 'Data Analysis', A: 70, fullMark: 100 },
];

export const EXPERIENCE_DATA: Experience[] = [
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

export const PROJECTS_DATA: Project[] = [
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

export const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: '#', icon: Linkedin },
  { name: 'Dribbble', url: '#', icon: Dribbble },
  { name: 'Twitter', url: '#', icon: Twitter },
  { name: 'Email', url: 'mailto:hello@alex.design', icon: Mail },
];