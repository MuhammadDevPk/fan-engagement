import React, { useState } from 'react';
import { X, Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ImportAttendeesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (count: number) => void;
}

export function ImportAttendeesModal({ isOpen, onClose, onImport }: ImportAttendeesModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!file) return;
    
    setIsUploading(true);
    // Simulate upload progress
    let currentProgress = 0;
    const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                setIsCompleted(true);
                setIsUploading(false);
                onImport(Math.floor(Math.random() * 20) + 5); // Simulate 5-25 random imports
                setTimeout(() => {
                     onClose();
                     // Reset state for next time
                     setFile(null);
                     setProgress(0);
                     setIsCompleted(false);
                }, 1500);
            }, 500);
        }
    }, 200);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0A0E27] border border-white/10 rounded-xl shadow-2xl z-50 p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Import Attendees</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {!isCompleted ? (
            <div className="space-y-6">
                <div 
                    className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors ${
                        file ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                    }`}
                >
                    {file ? (
                        <>
                            <FileText className="h-10 w-10 text-indigo-400 mb-3" />
                            <p className="text-white font-medium mb-1">{file.name}</p>
                            <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                            <Button variant="ghost" size="sm" className="mt-3 text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                            }}>
                                Remove File
                            </Button>
                        </>
                    ) : (
                        <>
                            <Upload className="h-10 w-10 text-gray-500 mb-3" />
                            <p className="text-gray-300 font-medium mb-1">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500">CSV, Excel or JSON (max 5MB)</p>
                            <input 
                                type="file" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                accept=".csv,.xlsx,.json"
                                onChange={handleFileChange}
                            />
                        </>
                    )}
                </div>

                {isUploading && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>Processing...</span>
                            <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2 bg-white/10" indicatorClassName="bg-indigo-500" />
                    </div>
                )}

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-blue-300">
                        <p className="font-medium mb-1">CSV Format Required</p>
                        <p className="opacity-80">Make sure your file includes columns for: Name, Email, Wallet Address (optional), and Ticket Type.</p>
                        <a href="#" className="underline hover:text-white mt-1 inline-block">Download Template</a>
                    </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 border-white/10 text-gray-300 hover:text-white hover:bg-white/5" onClick={onClose} disabled={isUploading}>Cancel</Button>
                  <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleImport} disabled={!file || isUploading}>
                      {isUploading ? 'Importing...' : 'Import Attendees'}
                  </Button>
                </div>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in-95">
                <div className="h-16 w-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Import Successful!</h3>
                <p className="text-gray-400 mb-6">Successfully imported attendees to your list.</p>
            </div>
        )}
      </div>
    </>
  );
}
