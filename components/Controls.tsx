import React from 'react';
import { Template } from '../types';
import { TEMPLATES, ACCENT_COLORS } from '../constants';
import { Palette, LayoutTemplate } from 'lucide-react';

interface ControlsProps {
  selectedTemplate: Template;
  onTemplateChange: (template: Template) => void;
  accentColor: string;
  onAccentColorChange: (color: string) => void;
}

export const Controls: React.FC<ControlsProps> = ({ selectedTemplate, onTemplateChange, accentColor, onAccentColorChange }) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold mb-4 text-slate-700">Customization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <LayoutTemplate size={16} />
                Template
            </label>
            <div className="flex flex-wrap gap-2">
                {TEMPLATES.map(template => (
                    <button 
                        key={template} 
                        onClick={() => onTemplateChange(template)}
                        className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${selectedTemplate === template ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                    >
                        {template}
                    </button>
                ))}
            </div>
            </div>
            <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Palette size={16} />
                Accent Color
            </label>
            <div className="flex flex-wrap gap-2">
                {ACCENT_COLORS.map(({ name, color }) => (
                    <button
                        key={name}
                        onClick={() => onAccentColorChange(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110 ${accentColor === color ? 'border-indigo-600 ring-2 ring-indigo-300' : 'border-white'}`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select ${name} color`}
                    />
                ))}
            </div>
            </div>
      </div>
    </div>
  )
}
