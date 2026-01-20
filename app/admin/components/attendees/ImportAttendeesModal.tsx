"use client"

import React, { useState, useRef } from 'react';
import { X, Upload, FileText, AlertCircle, CheckCircle, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

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
  const [importedCount, setImportedCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const validTypes = ['.csv', '.xlsx', '.json', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/json'];
      
      if (!validTypes.some(type => selectedFile.name.endsWith(type) || selectedFile.type === type)) {
        toast.error('Invalid file type', { description: 'Please upload a CSV, Excel, or JSON file.' });
        return;
      }
      
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File too large', { description: 'Maximum file size is 5MB.' });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleImport = () => {
    if (!file) return;
    
    setIsUploading(true);
    let currentProgress = 0;
    const count = Math.floor(Math.random() * 15) + 5; // 5-20 attendees
    
    const interval = setInterval(() => {
        currentProgress += Math.random() * 15;
        if (currentProgress > 100) currentProgress = 100;
        setProgress(currentProgress);
        
        if (currentProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                setIsCompleted(true);
                setIsUploading(false);
                setImportedCount(count);
                onImport(count);
            }, 500);
        }
    }, 300);
  };

  const handleDownloadTemplate = () => {
    const csvContent = "Name,Email,Wallet Address,Ticket Type\nJohn Doe,john@example.com,0x71C7656EC7ab88b098defB751B7401B5f6d8976F,VIP\nJane Smith,jane@example.com,0x3B2d8A1B37aA3F3cC6234FC80d8BEc2A1d5847C1,GENERAL";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendees_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Template downloaded!');
  };

  const handleClose = () => {
    setFile(null);
    setProgress(0);
    setIsCompleted(false);
    setIsUploading(false);
    setImportedCount(0);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity" onClick={handleClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0A0E27] border border-white/10 rounded-xl shadow-2xl z-50 p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-indigo-400" />
            Import Attendees
          </h2>
          <Button variant="ghost" size="icon" onClick={handleClose} className="text-gray-400 hover:text-white hover:bg-white/10">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {!isCompleted ? (
            <div className="space-y-6">
                {/* Drop Zone */}
                <div 
                    className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                        file ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/10 hover:border-indigo-500/30 hover:bg-white/5'
                    }`}
                    onClick={() => !file && fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {file ? (
                        <>
                            <FileText className="h-12 w-12 text-indigo-400 mb-3" />
                            <p className="text-white font-medium mb-1">{file.name}</p>
                            <p className="text-xs text-gray-400 mb-3">{(file.size / 1024).toFixed(2)} KB</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                              }}
                            >
                                Remove File
                            </Button>
                        </>
                    ) : (
                        <>
                            <Upload className="h-12 w-12 text-gray-500 mb-3" />
                            <p className="text-gray-300 font-medium mb-1">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500">CSV, Excel or JSON (max 5MB)</p>
                        </>
                    )}
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        className="hidden" 
                        accept=".csv,.xlsx,.json"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Upload Progress */}
                {isUploading && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>Processing file...</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2 bg-white/10" />
                    </div>
                )}

                {/* Info Box */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-blue-300">
                        <p className="font-medium mb-1">CSV Format Required</p>
                        <p className="opacity-80 mb-2">Make sure your file includes columns for: Name, Email, Wallet Address (optional), and Ticket Type.</p>
                        <button 
                          onClick={handleDownloadTemplate}
                          className="underline hover:text-white transition-colors"
                        >
                          Download Template
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-white/10 text-gray-300 hover:text-white hover:bg-white/5" 
                    onClick={handleClose} 
                    disabled={isUploading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white" 
                    onClick={handleImport} 
                    disabled={!file || isUploading}
                  >
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
                <p className="text-gray-400 mb-6">Successfully imported <span className="text-emerald-400 font-bold">{importedCount}</span> attendees to your list.</p>
                <Button onClick={handleClose} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  Done
                </Button>
            </div>
        )}
      </div>
    </>
  );
}
