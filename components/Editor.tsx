import React, { useState, useRef } from 'react';
import { ResumeData, Experience, Education, Skill, PersonalInfo } from '../types';
import { ChevronDown, Plus, Trash2, GripVertical } from 'lucide-react';
import { AiHelperButton } from './AiHelperButton';
import { COMMON_SKILLS } from '../constants';

interface EditorProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  onImproveContent: (section: 'summary' | 'experience', id?: string) => void;
  isImproving: { section: string; id?: string } | null;
}

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
    <div className="border border-slate-200 rounded-lg mb-4 bg-white shadow-sm">
        <h3 className="p-4 text-left font-semibold text-slate-700 border-b border-slate-200">{title}</h3>
        <div>{children}</div>
    </div>
);

const Editor: React.FC<EditorProps> = ({ resumeData, setResumeData, onImproveContent, isImproving }) => {
    const [openItems, setOpenItems] = useState<string[]>([]);
    const [skillSuggestions, setSkillSuggestions] = useState<string[]>([]);
    const [activeSkillIndex, setActiveSkillIndex] = useState<number | null>(null);

    // Refs for drag and drop
    const dragSkill = useRef<number | null>(null);
    const dragOverSkill = useRef<number | null>(null);

    const toggleItem = (id: string) => {
        setOpenItems(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value }
        }));
    };
    
    const handleArrayChange = <T extends {id: string}>(section: 'experience' | 'education' | 'skills', index: number, field: keyof T, value: string) => {
        const updatedArray = resumeData[section].map((item, i) => 
            i === index ? { ...item, [field]: value } : item
        );
        setResumeData(prev => ({...prev, [section]: updatedArray}));

        if (section === 'skills' && field === 'name') {
            if (value.trim()) {
                const filteredSuggestions = COMMON_SKILLS.filter(s => 
                    s.toLowerCase().includes(value.toLowerCase()) && 
                    !resumeData.skills.some(skill => skill.name.toLowerCase() === s.toLowerCase())
                ).slice(0, 5);
                setSkillSuggestions(filteredSuggestions);
            } else {
                setSkillSuggestions([]);
            }
        }
    };

    const addToArray = (section: 'experience' | 'education' | 'skills') => {
        let newItem: Experience | Education | Skill;
        const newId = `${section}-${Date.now()}`;
        if (section === 'experience') {
            newItem = { id: newId, company: '', role: '', startDate: '', endDate: '', description: '' };
        } else if (section === 'education') {
            newItem = { id: newId, institution: '', degree: '', startDate: '', endDate: '' };
        } else {
            newItem = { id: newId, name: '' };
        }
        setResumeData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
        if (section === 'experience' || section === 'education') {
            setOpenItems(prev => [...prev, newId]);
        }
    };

    const removeFromArray = (section: 'experience' | 'education' | 'skills', id: string) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter((item: any) => item.id !== id)
        }));
    };

    const handleSelectSuggestion = (index: number, suggestion: string) => {
        handleArrayChange<Skill>('skills', index, 'name', suggestion);
        setSkillSuggestions([]);
        setActiveSkillIndex(null);
    };
    
    const handleSkillSort = () => {
        if (dragSkill.current === null || dragOverSkill.current === null) return;
        const skills = [...resumeData.skills];
        const draggedItemContent = skills.splice(dragSkill.current, 1)[0];
        skills.splice(dragOverSkill.current, 0, draggedItemContent);
        dragSkill.current = null;
        dragOverSkill.current = null;
        setResumeData(prev => ({ ...prev, skills }));
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-slate-700">Resume Content</h2>
            <Section title="Personal Information">
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="p-2 border rounded w-full" placeholder="Name" value={resumeData.personalInfo.name} onChange={(e) => handlePersonalInfoChange('name', e.target.value)} />
                    <input className="p-2 border rounded w-full" placeholder="Email" value={resumeData.personalInfo.email} onChange={(e) => handlePersonalInfoChange('email', e.target.value)} />
                    <input className="p-2 border rounded w-full" placeholder="Phone" value={resumeData.personalInfo.phone} onChange={(e) => handlePersonalInfoChange('phone', e.target.value)} />
                    <input className="p-2 border rounded w-full col-span-2" placeholder="Address" value={resumeData.personalInfo.address} onChange={(e) => handlePersonalInfoChange('address', e.target.value)} />
                    <input className="p-2 border rounded w-full" placeholder="LinkedIn Profile URL" value={resumeData.personalInfo.linkedin} onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)} />
                    <input className="p-2 border rounded w-full" placeholder="Website/Portfolio" value={resumeData.personalInfo.website} onChange={(e) => handlePersonalInfoChange('website', e.target.value)} />
                    <input className="p-2 border rounded w-full col-span-2" placeholder="GitHub Profile URL" value={resumeData.personalInfo.github} onChange={(e) => handlePersonalInfoChange('github', e.target.value)} />
                </div>
            </Section>
            
            <Section title="Summary">
                <div className="relative p-4">
                    <textarea className="w-full p-2 border rounded" rows={5} placeholder="Professional Summary" value={resumeData.summary} onChange={(e) => setResumeData(p => ({...p, summary: e.target.value}))}></textarea>
                    <AiHelperButton isProcessing={isImproving?.section === 'summary'} onClick={() => onImproveContent('summary')} />
                </div>
            </Section>
            
            <Section title="Experience">
                <div className="divide-y divide-slate-200">
                    {resumeData.experience.map((exp, index) => (
                        <div key={exp.id}>
                            <div className="flex items-center p-4 hover:bg-slate-50">
                                <button onClick={() => toggleItem(exp.id)} className="flex-grow flex items-center text-left space-x-2">
                                    <ChevronDown className={`transform transition-transform shrink-0 ${openItems.includes(exp.id) ? 'rotate-180' : ''}`} size={18} />
                                    <span className="font-semibold">{exp.role || 'Role'}</span>
                                    <span className="text-slate-500"> at </span>
                                    <span className="text-slate-600">{exp.company || 'Company'}</span>
                                </button>
                                <button onClick={() => removeFromArray('experience', exp.id)} className="text-red-500 hover:text-red-700 p-1.5" aria-label="Remove Experience"><Trash2 size={18} /></button>
                            </div>
                            {openItems.includes(exp.id) && (
                                <div className="p-4 bg-slate-50 border-t border-slate-200">
                                    <div className="grid grid-cols-2 gap-2">
                                        <input className="p-2 border rounded" placeholder="Role" value={exp.role} onChange={(e) => handleArrayChange<Experience>('experience', index, 'role', e.target.value)} />
                                        <input className="p-2 border rounded" placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange<Experience>('experience', index, 'company', e.target.value)} />
                                        <input className="p-2 border rounded" placeholder="Start Date" value={exp.startDate} onChange={(e) => handleArrayChange<Experience>('experience', index, 'startDate', e.target.value)} />
                                        <input className="p-2 border rounded" placeholder="End Date" value={exp.endDate} onChange={(e) => handleArrayChange<Experience>('experience', index, 'endDate', e.target.value)} />
                                        <div className="col-span-2 relative">
                                            <textarea className="w-full p-2 border rounded" rows={4} placeholder="Description" value={exp.description} onChange={(e) => handleArrayChange<Experience>('experience', index, 'description', e.target.value)}></textarea>
                                            <AiHelperButton isProcessing={isImproving?.section === 'experience' && isImproving?.id === exp.id} onClick={() => onImproveContent('experience', exp.id)} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="p-4"><button onClick={() => addToArray('experience')} className="flex items-center space-x-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md font-medium text-sm hover:bg-blue-200"><Plus size={16}/><span>Add Experience</span></button></div>
            </Section>

            <Section title="Education">
                <div className="divide-y divide-slate-200">
                    {resumeData.education.map((edu, index) => (
                         <div key={edu.id}>
                            <div className="flex items-center p-4 hover:bg-slate-50">
                                <button onClick={() => toggleItem(edu.id)} className="flex-grow flex items-center text-left space-x-2">
                                    <ChevronDown className={`transform transition-transform shrink-0 ${openItems.includes(edu.id) ? 'rotate-180' : ''}`} size={18} />
                                    <span className="font-semibold">{edu.degree || 'Degree'}</span>
                                    <span className="text-slate-500"> from </span>
                                    <span className="text-slate-600">{edu.institution || 'Institution'}</span>
                                </button>
                                <button onClick={() => removeFromArray('education', edu.id)} className="text-red-500 hover:text-red-700 p-1.5" aria-label="Remove Education"><Trash2 size={18} /></button>
                            </div>
                            {openItems.includes(edu.id) && (
                                <div className="p-4 bg-slate-50 border-t border-slate-200">
                                    <div className="grid grid-cols-2 gap-2">
                                        <input className="p-2 border rounded" placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange<Education>('education', index, 'degree', e.target.value)} />
                                        <input className="p-2 border rounded" placeholder="Institution" value={edu.institution} onChange={(e) => handleArrayChange<Education>('education', index, 'institution', e.target.value)} />
                                        <input className="p-2 border rounded" placeholder="Start Date" value={edu.startDate} onChange={(e) => handleArrayChange<Education>('education', index, 'startDate', e.target.value)} />
                                        <input className="p-2 border rounded" placeholder="End Date" value={edu.endDate} onChange={(e) => handleArrayChange<Education>('education', index, 'endDate', e.target.value)} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="p-4"><button onClick={() => addToArray('education')} className="flex items-center space-x-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md font-medium text-sm hover:bg-blue-200"><Plus size={16}/><span>Add Education</span></button></div>
            </Section>

            <Section title="Skills">
                <div className="p-4 space-y-2">
                    {resumeData.skills.map((skill, index) => (
                        <div key={skill.id} className="flex items-center gap-2 group relative"
                             draggable
                             onDragStart={() => (dragSkill.current = index)}
                             onDragEnter={() => (dragOverSkill.current = index)}
                             onDragEnd={handleSkillSort}
                             onDragOver={(e) => e.preventDefault()}
                        >
                            <GripVertical className="cursor-move text-slate-400 group-hover:text-slate-600" size={18} />
                            <input 
                                className="flex-grow p-2 border rounded" 
                                placeholder="Skill" 
                                value={skill.name} 
                                onFocus={() => setActiveSkillIndex(index)}
                                onBlur={() => setTimeout(() => setActiveSkillIndex(null), 200)} // delay to allow click
                                onChange={(e) => handleArrayChange<Skill>('skills', index, 'name', e.target.value)} />
                            <button onClick={() => removeFromArray('skills', skill.id)} className="text-red-500 hover:text-red-700" aria-label="Remove Skill"><Trash2 size={18} /></button>
                            {activeSkillIndex === index && skillSuggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 z-10 bg-white border rounded-md shadow-lg mt-1">
                                    {skillSuggestions.map(s => (
                                        <button 
                                            key={s} 
                                            className="w-full text-left px-3 py-2 hover:bg-slate-100"
                                            onClick={() => handleSelectSuggestion(index, s)}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-slate-200"><button onClick={() => addToArray('skills')} className="flex items-center space-x-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md font-medium text-sm hover:bg-blue-200"><Plus size={16}/><span>Add Skill</span></button></div>
            </Section>
        </div>
    );
};

export default Editor;