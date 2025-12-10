import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: 'UI/UX' | 'Branding' | 'Product' | 'Interaction';
  image: string;
  description: string;
  year: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ElementType;
}