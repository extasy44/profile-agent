export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend & UI/UX',
    skills: [
      'React',
      'TypeScript',
      'Next.js',
      'Redux',
      'JavaScript ES6+',
      'HTML5',
      'CSS3',
      'SCSS',
      'Ant Design',
      'Responsive Design',
      'Accessibility',
    ],
  },
  {
    title: 'AI & Automation',
    skills: [
      'AI Integration',
      'OpenAI API',
      'LangChain',
      'Prompt Engineering',
      'AI-powered Features',
      'Automation',
      'Machine Learning',
      'Data Analytics',
    ],
  },
  {
    title: 'Backend & Cloud',
    skills: ['Node.js', 'REST APIs', 'Azure', 'AWS', 'Azure DevOps', 'CI/CD', 'Cloud Infrastructure', 'API Integration'],
  },
  {
    title: 'eCommerce & Business',
    skills: [
      'Magento',
      'eCommerce Platforms',
      'Inventory Management',
      'POS Integration',
      'SEO/SEM',
      'Business Intelligence',
      'Workflow Automation',
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      'Git',
      'CI/CD Pipelines',
      'Azure DevOps',
      'Testing',
      'Jest',
      'Performance Optimization',
      'Code Refactoring',
      'Version Control',
    ],
  },
  {
    title: 'Learning & Interests',
    skills: [
      'AI Programming',
      'Modern Web Technologies',
      'Cloud Computing',
      'Agile Methodologies',
      'User Experience',
      'Security',
      'Scalability',
    ],
  },
];

export interface ProfessionalSkill {
  title: string;
  skills: string[];
  color: string;
}

export const professionalSkills: ProfessionalSkill[] = [
  {
    title: 'AI & Innovation',
    skills: ['AI Integration', 'Prompt Engineering', 'Machine Learning', 'Data Science', 'Automation'],
    color: 'neon-purple',
  },
  {
    title: 'Leadership & Growth',
    skills: ['Technical Leadership', 'Mentoring', 'Agile Methodologies', 'Strategic Planning', 'Team Building'],
    color: 'neon-blue',
  },
  {
    title: 'Communication & Impact',
    skills: ['Client Relations', 'Technical Writing', 'Presentation Skills', 'Cross-functional Collaboration', 'Problem Solving'],
    color: 'neon-green',
  },
];

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export const workExperience: WorkExperience[] = [
  {
    company: 'LMI Group',
    role: 'Senior Frontend Developer',
    period: 'Nov 2023 - Present',
    description:
      'Leading frontend development using React and TypeScript, ensuring scalable and maintainable architecture. Collaborating with product teams to define new features and optimize performance.',
    highlights: ['AI Integration', 'Next.js 14', 'TypeScript', 'Modern UI/UX'],
  },
  {
    company: 'LMI Group',
    role: 'Frontend Developer',
    period: 'July 2021 - Nov 2023',
    description:
      'Developed responsive web apps using React, Redux, and Next.js. Refactored legacy systems into component-based architecture and implemented CI/CD pipelines.',
    highlights: ['React', 'Next.js', 'CI/CD', 'Performance'],
  },
  {
    company: 'Computers and Parts Land',
    role: 'eCommerce Developer',
    period: 'Apr 2013 - Jun 2021',
    description:
      'Managed Magento-based platforms with 30,000+ products, built tools for inventory and pricing, and created custom POS integrations.',
    highlights: ['Magento', 'eCommerce', 'Data Analytics', 'Automation'],
  },
];

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export const education: Education[] = [
  {
    institution: 'Monash University',
    degree: 'Data Analytics and Visualization Bootcamp',
    period: '2021',
    description: 'Intensive program covering data analysis, visualization, and business intelligence tools.',
  },
  {
    institution: 'Swinburne University of Technology',
    degree: 'Bachelor of Information and Communication Technology',
    period: '2011-2013',
    description: 'Comprehensive study of ICT systems, software development, and network technologies.',
  },
  {
    institution: 'Holmesglen Institute',
    degree: 'Diploma of IT (Software Development)',
    period: '2009-2011',
    description: 'Foundation in software development, programming languages, and system design.',
  },
];
