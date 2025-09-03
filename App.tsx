import React, { useState, useRef, useCallback } from 'react';
import { ResumeData, Template, AtsResult } from './types';
import { INITIAL_RESUME_DATA, ACCENT_COLORS } from './constants';
import ResumePreview from './components/ResumePreview';
import Editor from './components/Editor';
import AtsAnalyzer from './components/AtsAnalyzer';
import { Controls } from './components/Controls';
import { getAtsScore, improveContent } from './services/geminiService';
import { Download, Bot, Wand2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(Template.MODERN);
  const [accentColor, setAccentColor] = useState<string>(ACCENT_COLORS[0].color);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [atsResult, setAtsResult] = useState<AtsResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAtsModalOpen, setIsAtsModalOpen] = useState<boolean>(false);
  const [isImproving, setIsImproving] = useState<{ section: string; id?: string } | null>(null);
  const resumePreviewRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = useCallback(async () => {
    if (!jobDescription.trim()) {
      setError('Please provide a job description.');
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    setAtsResult(null);

    try {
      const result = await getAtsScore(resumeData, jobDescription);
      setAtsResult(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [resumeData, jobDescription]);

  const handleDownloadPdf = async () => {
    const element = resumePreviewRef.current;
    if (!element) return;
    
    // Using a scale factor improves the quality of the image captured by html2canvas.
    const scale = 2;
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Standard A4 page dimensions in millimeters.
    const pdfWidth = 210;
    const pdfHeight = 297;

    // Create a new PDF in A4 format.
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Add the captured image to the PDF, scaling it to fit the full A4 page.
    // The ResumePreview component has an A4 aspect ratio, so it won't be distorted.
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('resume.pdf');
  };
  
  const handleImproveContent = useCallback(async (section: 'summary' | 'experience', id?: string) => {
    setIsImproving({ section, id });
    try {
      if (section === 'summary') {
        const improvedSummary = await improveContent(resumeData.summary);
        setResumeData(prev => ({ ...prev, summary: improvedSummary }));
      } else if (section === 'experience' && id) {
        const experienceToImprove = resumeData.experience.find(exp => exp.id === id);
        if (experienceToImprove) {
          const improvedDescription = await improveContent(experienceToImprove.description);
          setResumeData(prev => ({
            ...prev,
            experience: prev.experience.map(exp => exp.id === id ? { ...exp, description: improvedDescription } : exp)
          }));
        }
      }
    } catch (e) {
      // Handle error (e.g., show a toast notification)
      console.error("Failed to improve content", e);
    } finally {
      setIsImproving(null);
    }
  }, [resumeData]);


  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-100">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Wand2 className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-slate-800">AI Resume Builder</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAtsModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
              aria-label="Analyze with ATS"
            >
              <Bot className="h-5 w-5" />
              <span>ATS Score</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition-colors"
              aria-label="Download as PDF"
            >
              <Download className="h-5 w-5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
           <Controls 
             selectedTemplate={selectedTemplate}
             onTemplateChange={setSelectedTemplate}
             accentColor={accentColor}
             onAccentColorChange={setAccentColor}
           />
          <Editor 
            resumeData={resumeData} 
            setResumeData={setResumeData}
            onImproveContent={handleImproveContent}
            isImproving={isImproving}
          />
        </div>
        <div className="lg:col-span-5 relative">
          <div className="sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
            <div className="bg-white p-2 rounded-lg shadow-lg overflow-y-auto max-h-[calc(100vh-12rem)]">
              <ResumePreview ref={resumePreviewRef} data={resumeData} template={selectedTemplate} accentColor={accentColor} />
            </div>
          </div>
        </div>
      </main>
      
      {isAtsModalOpen && (
        <AtsAnalyzer
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          onAnalyze={handleAnalyze}
          result={atsResult}
          isAnalyzing={isAnalyzing}
          error={error}
          onClose={() => setIsAtsModalOpen(false)}
        />
      )}
    </div>
  );
}