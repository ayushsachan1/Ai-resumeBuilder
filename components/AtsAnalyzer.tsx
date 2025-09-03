import React from 'react';
import { AtsResult } from '../types';
import { Bot, CheckCircle, AlertTriangle, Lightbulb, X, Zap, Puzzle } from 'lucide-react';

interface AtsAnalyzerProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  onAnalyze: () => void;
  result: AtsResult | null;
  isAnalyzing: boolean;
  error: string | null;
  onClose: () => void;
}

const AtsAnalyzer: React.FC<AtsAnalyzerProps> = ({ jobDescription, setJobDescription, onAnalyze, result, isAnalyzing, error, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Bot /> AI-Powered ATS Analyzer</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800" aria-label="Close ATS Analyzer"><X /></button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="mb-4">
            <label htmlFor="job-description" className="block text-sm font-medium text-slate-700 mb-1">Paste Job Description</label>
            <textarea
              id="job-description"
              rows={8}
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Paste the full job description here to see how your resume matches..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={isAnalyzing}
            />
          </div>
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing || !jobDescription.trim()}
            className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
                <>
                <Zap size={18}/> Analyze Resume
                </>
            )}
          </button>

          {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center gap-2"><AlertTriangle size={20} /> {error}</div>}

          {result && (
            <div className="mt-6 space-y-6">
              <div className="text-center p-4 bg-slate-100 rounded-lg">
                <p className="text-lg font-medium text-slate-600">Your ATS Score</p>
                <p className={`text-6xl font-bold ${result.score > 85 ? 'text-green-600' : result.score > 60 ? 'text-yellow-600' : 'text-red-600'}`}>{result.score}<span className="text-3xl text-slate-500">/100</span></p>
              </div>

              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 text-green-700"><CheckCircle size={20}/> Strengths</h3>
                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600 bg-green-50 p-3 rounded-md">
                  {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 text-yellow-700"><Lightbulb size={20} /> Suggestions for Improvement</h3>
                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600 bg-yellow-50 p-3 rounded-md">
                  {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              {result.suggestedSkills && result.suggestedSkills.length > 0 && (
                 <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700"><Puzzle size={20} /> Suggested Skills</h3>
                    <p className="text-sm text-slate-500 mt-1">Consider adding these skills from the job description if you have them.</p>
                    <div className="flex flex-wrap gap-2 mt-2 bg-blue-50 p-3 rounded-md">
                      {result.suggestedSkills.map((skill, i) => (
                        <span key={i} className="bg-blue-200 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>
                      ))}
                    </div>
                  </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AtsAnalyzer;
