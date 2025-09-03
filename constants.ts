import { ResumeData, Template } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: 'Ayush Schan',
    email: 'ayush@gmail.com',
    phone: '9534875042',
    address: 'M,Sector-23,Sanjay Nagar, Ghaziabad',
    linkedin: 'linkedin.com/in/ayushschan',
    website: 'ayushxyz.com',
    github: 'github.com/ayushschan1',
  },
  summary: 'A highly motivated and detail-oriented professional with 1 years of experience in project management. Seeking to leverage strong leadership skills and a proven track record of success to contribute to a dynamic organization.',
  experience: [
    {
      id: 'exp1',
      company: 'Tech Solutions Inc.',
      role: 'Project Manager',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: '- Led cross-functional teams to deliver projects on time and within budget.\n- Developed project plans, timelines, and budgets.\n- Managed stakeholder expectations and communication.',
    },
    {
      id: 'exp2',
      company: 'Innovate Corp.',
      role: 'Project Coordinator',
      startDate: 'Jun 2018',
      endDate: 'Dec 2019',
      description: '- Assisted senior project managers with project planning and execution.\n- Tracked project progress and reported on key metrics.\n- Coordinated team meetings and prepared meeting minutes.',
    },
  ],
  education: [
    {
      id: 'edu1',
      institution: 'State University',
      degree: 'B.S. in Business Administration',
      startDate: 'Aug 2014',
      endDate: 'May 2018',
    },
  ],
  skills: [
    { id: 'skill1', name: 'Python' },
    { id: 'skill2', name: 'Html' },
    { id: 'skill3', name: 'Java Scripts' },
    { id: 'skill4', name: 'C' },
    { id: 'skill5', name: 'Machine Learning' },
    { id: 'skill6', name: 'Team Leadership' },
  ],
};

export const TEMPLATES = [Template.MODERN, Template.CLASSIC, Template.CREATIVE];

export const ACCENT_COLORS = [
  { name: 'Indigo', color: '#4f46e5' },
  { name: 'Teal', color: '#0d9488' },
  { name: 'Rose', color: '#e11d48' },
  { name: 'Slate', color: '#475569' },
  { name: 'Orange', color: '#f97316' },
];

export const COMMON_SKILLS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "C++", "C#", "Go", "Rust", "HTML5", "CSS3",
  "SQL", "NoSQL", "MongoDB", "PostgreSQL", "GraphQL", "REST APIs", "Docker", "Kubernetes", "AWS", "Google Cloud",
  "Azure", "Terraform", "CI/CD", "Git", "GitHub", "Agile", "Scrum", "JIRA", "Figma", "UI/UX Design",
  "Data Analysis", "Machine Learning", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Project Management",
  "Product Management", "Digital Marketing", "SEO", "Content Writing", "Graphic Design", "Communication"
];