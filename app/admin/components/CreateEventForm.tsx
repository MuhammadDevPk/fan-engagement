"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { Plus, X, ArrowRight, ArrowLeft, Send, CheckCircle2, Save, FileText, Eye, Loader2, Sparkles, PartyPopper } from "lucide-react"
import { toast } from "sonner"
import confetti from "canvas-confetti"

import { EventFormData, initialEventData, mockEventData } from "./create-event/types"
import Step1BasicInfo from "./create-event/Step1BasicInfo"
import Step2DateLocation from "./create-event/Step2DateLocation"
import Step3PricingTickets from "./create-event/Step3PricingTickets"
import Step4NFT from "./create-event/Step4NFT"
import Step5Settings from "./create-event/Step5Settings"
import { cn } from "@/lib/utils"

const STEPS = [
  { id: 1, name: 'Basic Info', shortName: 'Basics' },
  { id: 2, name: 'Date & Location', shortName: 'When/Where' },
  { id: 3, name: 'Pricing & Tickets', shortName: 'Tickets' },
  { id: 4, name: 'NFT & Blockchain', shortName: 'NFT' },
  { id: 5, name: 'Settings', shortName: 'Settings' },
];

export default function CreateEventForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EventFormData>(initialEventData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [deployedContractAddress, setDeployedContractAddress] = useState<string>('');

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (newData: Partial<EventFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.name || formData.name.length < 3) {
          toast.error("Event name is required", { description: "Please enter at least 3 characters" });
          return false;
        }
        if (!formData.category) {
          toast.error("Category is required", { description: "Please select an event category" });
          return false;
        }
        if (!formData.description || formData.description.length < 20) {
          toast.error("Description is required", { description: "Please enter at least 20 characters" });
          return false;
        }
        return true;
      case 2:
        if (!formData.startDate) {
          toast.error("Start date is required", { description: "Please select when your event starts" });
          return false;
        }
        if (!formData.isVirtual && !formData.location) {
          toast.error("Location is required", { description: "Please enter the event location" });
          return false;
        }
        return true;
      case 3:
        if (formData.basePrice <= 0) {
          toast.error("Base price is required", { description: "Please set a base ticket price" });
          return false;
        }
        if (formData.totalTickets <= 0) {
          toast.error("Total tickets is required", { description: "Please set the number of available tickets" });
          return false;
        }
        return true;
      case 4:
        if (!formData.collectionName) {
          toast.error("Collection name is required", { description: "Please enter an NFT collection name" });
          return false;
        }
        if (!formData.tokenSymbol || formData.tokenSymbol.length < 3) {
          toast.error("Token symbol is required", { description: "Please enter a token symbol (min 3 chars)" });
          return false;
        }
        return true;
      case 5:
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate blockchain deployment with progress updates
    toast.loading("Preparing smart contract...", { id: "deploy" });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.loading("Deploying to " + formData.network + "...", { id: "deploy" });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.loading("Verifying contract...", { id: "deploy" });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock contract address
    const mockAddress = `0x${Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    setDeployedContractAddress(mockAddress);
    
    toast.success("Event deployed successfully!", { id: "deploy" });
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const resetForm = () => {
    setFormData(initialEventData);
    setCurrentStep(1);
    setIsSuccess(false);
    setDeployedContractAddress('');
    setIsOpen(false);
  };

  const loadMockData = () => {
    setFormData(mockEventData);
    toast.success("Demo data loaded!", { description: "Form filled with sample event data" });
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved!", {
      description: `"${formData.name || 'Untitled Event'}" has been saved as a draft.`,
      action: {
        label: "View Drafts",
        onClick: () => toast.info("Drafts feature coming soon!")
      }
    });
  };

  // Success State
  if (isSuccess) {
    return (
      <Card className="w-full bg-black/40 border-white/10 backdrop-blur-xl p-8 md:p-12 text-center animate-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center gap-6 max-w-lg mx-auto">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <PartyPopper className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400 animate-bounce" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Event Created Successfully!</h2>
            <p className="text-gray-400">Your event "{formData.name}" has been deployed to {formData.network}</p>
          </div>

          <div className="w-full p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
            <p className="text-xs text-gray-500">Smart Contract Address</p>
            <p className="font-mono text-sm text-purple-400 break-all">{deployedContractAddress}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full text-center">
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xl font-bold text-white">{formData.totalTickets}</p>
              <p className="text-xs text-gray-500">Total Tickets</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xl font-bold text-white">{formData.ticketTiers.length}</p>
              <p className="text-xs text-gray-500">Tiers</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xl font-bold text-purple-400">${formData.basePrice}</p>
              <p className="text-xs text-gray-500">Base Price</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button 
              variant="outline" 
              className="flex-1 border-white/20"
              onClick={() => {
                setIsSuccess(false);
                setCurrentStep(1);
              }}
            >
              <Eye className="mr-2 h-4 w-4" /> View Event
            </Button>
            <Button 
              onClick={resetForm} 
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" /> Create Another
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  // Collapsed State - Create Button
  if (!isOpen) {
    return (
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-400" />
            Create Your Next Event
          </h3>
          <p className="text-sm text-gray-400">Launch NFT-powered tickets in minutes</p>
        </div>
        <Button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-105"
        >
          <Plus className="mr-2 h-4 w-4" /> Create New Event
        </Button>
      </div>
    );
  }

  // Expanded Form State
  return (
    <div className={cn(
      "w-full mb-8 transition-all duration-300",
      isOpen ? "fixed inset-0 z-[60] m-0 bg-eureka-bg md:relative md:bg-transparent md:z-auto md:mb-8" : ""
    )}>
      <Card className={cn(
        "bg-black/40 border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300",
        isOpen ? "h-full rounded-none border-0 md:h-auto md:rounded-xl md:border" : ""
      )}>
        
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="space-y-1">
            <h2 className="text-lg md:text-xl font-bold text-white">
              Create New Event
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="text-purple-400 font-medium">Step {currentStep} of {totalSteps}:</span>
              <span className="hidden sm:inline">{STEPS[currentStep - 1].name}</span>
              <span className="sm:hidden">{STEPS[currentStep - 1].shortName}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={loadMockData}
              className="hidden sm:flex text-purple-400 hover:text-purple-300"
            >
              <FileText className="mr-1 h-4 w-4" /> Load Demo
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="px-4 md:px-6 py-3 bg-white/[0.02] border-b border-white/5 shrink-0">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => {
                    if (step.id < currentStep) setCurrentStep(step.id);
                  }}
                  disabled={step.id > currentStep}
                  className={cn(
                    "flex items-center gap-2 transition-all",
                    step.id <= currentStep ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                  )}
                >
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    step.id === currentStep 
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30" 
                      : step.id < currentStep 
                        ? "bg-green-500/20 text-green-400 border border-green-500/50" 
                        : "bg-white/10 text-gray-500"
                  )}>
                    {step.id < currentStep ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className={cn(
                    "hidden lg:inline text-sm transition-all",
                    step.id === currentStep ? "text-white font-medium" : "text-gray-500"
                  )}>
                    {step.shortName}
                  </span>
                </button>
                {index < STEPS.length - 1 && (
                  <div className={cn(
                    "w-6 md:w-12 h-0.5 mx-2 transition-all",
                    step.id < currentStep ? "bg-green-500/50" : "bg-white/10"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="h-1 rounded-none bg-white/5 shrink-0" indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500" />

        {/* Form Content */}
        <div className="p-4 md:p-6 min-h-[400px] max-h-[calc(100vh-280px)] md:max-h-none flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 1 && <Step1BasicInfo data={formData} updateData={updateFormData} />}
              {currentStep === 2 && <Step2DateLocation data={formData} updateData={updateFormData} />}
              {currentStep === 3 && <Step3PricingTickets data={formData} updateData={updateFormData} />}
              {currentStep === 4 && <Step4NFT data={formData} updateData={updateFormData} />}
              {currentStep === 5 && <Step5Settings data={formData} updateData={updateFormData} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-6 bg-white/5 border-t border-white/10 flex justify-between items-center shrink-0 mb-safe md:mb-0">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={currentStep === 1}
            className="text-gray-400 hover:text-white border border-transparent hover:border-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> 
            <span className="hidden sm:inline">Back</span>
          </Button>

          <div className="flex gap-2 md:gap-3">
            <Button 
              variant="outline" 
              className="hidden sm:flex border-purple-500/20 text-purple-400 hover:bg-purple-500/10"
              onClick={handleSaveDraft}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button 
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white min-w-[120px] sm:min-w-[160px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : currentStep === totalSteps ? (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Deploy & </span>Publish
                </>
              ) : (
                <>
                  Next<span className="hidden sm:inline">&nbsp;Step</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>

      </Card>
    </div>
  )
}
