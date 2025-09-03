import React, { forwardRef } from 'react';
import { ResumeData, Template } from '../types';
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  template: Template;
  accentColor: string;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ data, template, accentColor }, ref) => {
  const { personalInfo, summary, experience, education, skills } = data;

  const renderSectionTitle = (title: string, style: object = {}) => (
    <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 pb-1 mb-3" style={style}>
      {title}
    </h2>
  );

  const renderSkills = () => (
    <div className="flex flex-wrap gap-2">
      {skills.map(skill => (
        <span key={skill.id} className="bg-slate-200 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full">
          {skill.name}
        </span>
      ))}
    </div>
  );
  
  const ClassicTemplate = () => (
    <div className="p-8 bg-white font-serif text-slate-800">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-slate-900" style={{ color: accentColor }}>{personalInfo.name}</h1>
        <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-600 font-sans">
          <span className="flex items-center gap-1.5"><Mail size={12} /> {personalInfo.email}</span>
          <span className="flex items-center gap-1.5"><Phone size={12} /> {personalInfo.phone}</span>
          {personalInfo.linkedin && <a href={`https://${personalInfo.linkedin}`} className="flex items-center gap-1.5 hover:underline" style={{color: accentColor}}><Linkedin size={12} /> {personalInfo.linkedin}</a>}
          {personalInfo.github && <a href={`https://${personalInfo.github}`} className="flex items-center gap-1.5 hover:underline" style={{color: accentColor}}><Github size={12} /> {personalInfo.github}</a>}
        </div>
      </div>
      
      <div className="mb-4">
        {renderSectionTitle('Summary', { color: accentColor, borderColor: accentColor })}
        <p className="text-sm text-slate-700">{summary}</p>
      </div>

      <div className="mb-4">
        {renderSectionTitle('Experience', { color: accentColor, borderColor: accentColor })}
        {experience.map(exp => (
          <div key={exp.id} className="mb-3">
            <div className="flex justify-between items-baseline">
              <h3 className="text-md font-bold">{exp.role}</h3>
              <p className="text-xs text-slate-500 font-sans">{exp.startDate} - {exp.endDate}</p>
            </div>
            <h4 className="text-sm font-semibold text-slate-700">{exp.company}</h4>
            <ul className="list-disc list-inside mt-1 text-sm text-slate-600">
              {exp.description.split('\n').filter(line => line.trim()).map((line, i) => <li key={i}>{line.replace(/^- /, '')}</li>)}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mb-4">
        {renderSectionTitle('Education', { color: accentColor, borderColor: accentColor })}
        {education.map(edu => (
          <div key={edu.id} className="mb-2">
            <div className="flex justify-between items-baseline">
              <h3 className="text-md font-bold">{edu.institution}</h3>
              <p className="text-xs text-slate-500 font-sans">{edu.startDate} - {edu.endDate}</p>
            </div>
            <h4 className="text-sm font-semibold text-slate-700">{edu.degree}</h4>
          </div>
        ))}
      </div>
      
      <div>
        {renderSectionTitle('Skills', { color: accentColor, borderColor: accentColor })}
        {renderSkills()}
      </div>
    </div>
  );

  const ModernTemplate = () => (
    <div className="p-8 bg-white font-sans text-slate-800 grid grid-cols-3 gap-8">
      <div className="col-span-1 pr-6 border-r border-slate-200">
        <div className="text-left">
            <h1 className="text-3xl font-bold" style={{ color: accentColor }}>{personalInfo.name}</h1>
        </div>
        <div className="mt-6 space-y-3 text-sm">
            <h2 className="text-sm font-bold uppercase text-slate-500 tracking-wider">Contact</h2>
            <p className="flex items-start gap-2"><Mail size={14} className="mt-1 shrink-0" style={{ color: accentColor }}/><span>{personalInfo.email}</span></p>
            <p className="flex items-start gap-2"><Phone size={14} className="mt-1 shrink-0" style={{ color: accentColor }}/><span>{personalInfo.phone}</span></p>
            <p className="flex items-start gap-2"><MapPin size={14} className="mt-1 shrink-0" style={{ color: accentColor }}/><span>{personalInfo.address}</span></p>
            {personalInfo.linkedin && <p className="flex items-start gap-2"><Linkedin size={14} className="mt-1 shrink-0" style={{ color: accentColor }}/><a href={`https://${personalInfo.linkedin}`} className="hover:underline" style={{color: accentColor}}>{personalInfo.linkedin}</a></p>}
            {personalInfo.website && <p className="flex items-start gap-2"><Globe size={14} className="mt-1 shrink-0" style={{ color: accentColor }}/><a href={`https://${personalInfo.website}`} className="hover:underline" style={{color: accentColor}}>{personalInfo.website}</a></p>}
            {personalInfo.github && <p className="flex items-start gap-2"><Github size={14} className="mt-1 shrink-0" style={{ color: accentColor }}/><a href={`https://${personalInfo.github}`} className="hover:underline" style={{color: accentColor}}>{personalInfo.github}</a></p>}
        </div>
        <div className="mt-6">
            <h2 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-3">Skills</h2>
            {renderSkills()}
        </div>
         <div className="mt-6">
            {renderSectionTitle('Education', { color: accentColor, borderColor: accentColor })}
            {education.map(edu => (
              <div key={edu.id} className="mb-3">
                <h3 className="text-sm font-bold">{edu.institution}</h3>
                <h4 className="text-sm text-slate-700">{edu.degree}</h4>
                <p className="text-xs text-slate-500">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
         </div>
      </div>
      <div className="col-span-2">
        <div className="mb-6">
          {renderSectionTitle('Summary', { color: accentColor, borderColor: accentColor })}
          <p className="text-sm text-slate-700">{summary}</p>
        </div>
        <div>
          {renderSectionTitle('Experience', { color: accentColor, borderColor: accentColor })}
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-bold">{exp.role}</h3>
                <p className="text-xs text-slate-500">{exp.startDate} - {exp.endDate}</p>
              </div>
              <h4 className="text-md font-semibold text-slate-700 mb-1">{exp.company}</h4>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                {exp.description.split('\n').filter(line => line.trim()).map((line, i) => <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CreativeTemplate = () => (
    <div className="font-sans text-slate-800 grid grid-cols-12 min-h-full">
      <div className="col-span-4 p-6 text-white" style={{ backgroundColor: accentColor }}>
        <h1 className="text-4xl font-bold">{personalInfo.name}</h1>
        <div className="mt-8 space-y-4 text-sm">
            <h2 className="text-md font-bold uppercase tracking-wider border-b pb-1">Contact</h2>
            <p className="flex items-start gap-2"><Mail size={14} className="mt-1 shrink-0"/><span>{personalInfo.email}</span></p>
            <p className="flex items-start gap-2"><Phone size={14} className="mt-1 shrink-0"/><span>{personalInfo.phone}</span></p>
            <p className="flex items-start gap-2"><MapPin size={14} className="mt-1 shrink-0"/><span>{personalInfo.address}</span></p>
            {personalInfo.linkedin && <p className="flex items-start gap-2"><Linkedin size={14} className="mt-1 shrink-0"/><a href={`https://${personalInfo.linkedin}`} className="hover:underline">{personalInfo.linkedin}</a></p>}
            {personalInfo.website && <p className="flex items-start gap-2"><Globe size={14} className="mt-1 shrink-0"/><a href={`https://${personalInfo.website}`} className="hover:underline">{personalInfo.website}</a></p>}
            {personalInfo.github && <p className="flex items-start gap-2"><Github size={14} className="mt-1 shrink-0"/><a href={`https://${personalInfo.github}`} className="hover:underline">{personalInfo.github}</a></p>}
        </div>
        <div className="mt-6">
          <h2 className="text-md font-bold uppercase tracking-wider border-b pb-1 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill.id} className="bg-white/30 text-white text-xs font-medium px-2.5 py-1 rounded">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-md font-bold uppercase tracking-wider border-b pb-1 mb-3">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-3">
              <h3 className="text-sm font-bold">{edu.institution}</h3>
              <h4 className="text-sm">{edu.degree}</h4>
              <p className="text-xs opacity-80">{edu.startDate} - {edu.endDate}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-8 p-8 bg-white">
        <div className="mb-6">
          {renderSectionTitle('Summary', { color: accentColor, borderColor: accentColor })}
          <p className="text-sm text-slate-700">{summary}</p>
        </div>
        <div>
          {renderSectionTitle('Experience', { color: accentColor, borderColor: accentColor })}
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-bold">{exp.role}</h3>
                <p className="text-xs text-slate-500">{exp.startDate} - {exp.endDate}</p>
              </div>
              <h4 className="text-md font-semibold mb-1" style={{color: accentColor}}>{exp.company}</h4>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                {exp.description.split('\n').filter(line => line.trim()).map((line, i) => <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch(template) {
      case Template.CLASSIC: return <ClassicTemplate />;
      case Template.CREATIVE: return <CreativeTemplate />;
      case Template.MODERN:
      default:
        return <ModernTemplate />;
    }
  }

  return (
    <div ref={ref} className="aspect-[210/297] w-full overflow-hidden bg-white text-black">
      {renderTemplate()}
    </div>
  );
});

export default ResumePreview;