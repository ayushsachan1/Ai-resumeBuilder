import React from 'react';
import { Wand2, LoaderCircle } from 'lucide-react';

interface AiHelperButtonProps {
  onClick: () => void;
  isProcessing: boolean;
  className?: string;
}

export const AiHelperButton: React.FC<AiHelperButtonProps> = ({ onClick, isProcessing, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={isProcessing}
      className={`absolute top-2 right-2 p-1.5 text-slate-500 bg-slate-100 rounded-full hover:bg-slate-200 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
      aria-label="Improve with AI"
      title="Improve with AI"
    >
      {isProcessing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
    </button>
  );
};
