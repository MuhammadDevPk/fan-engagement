"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { Plus, X, ArrowRight, ArrowLeft, Send, CheckCircle2 } from "lucide-react"

import { EventFormData, initialEventData } from "./create-event/types"
import Step1BasicInfo from "./create-event/Step1BasicInfo"
import Step2DateLocation from "./create-event/Step2DateLocation"
import Step3PricingTickets from "./create-event/Step3PricingTickets"
import Step4NFT from "./create-event/Step4NFT"
import Step5Settings from "./create-event/Step5Settings"
import { cn } from "@/lib/utils"

export default function CreateEventForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EventFormData>(initialEventData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (newData: Partial<EventFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
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
    // Simulate API call / Blockchain interaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    // In real app, would redirect or reset here
  };

  const resetForm = () => {
     setFormData(initialEventData);
     setCurrentStep(1);
     setIsSuccess(false);
     setIsOpen(false);
  };

  if (isSuccess) {
    return (
      <Card className="w-full bg-black/40 border-white/10 backdrop-blur-xl p-12 text-center animate-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Event Created Successfully!</h2>
            <p className="text-gray-400">Your event has been deployed to the blockchain and is live.</p>
          </div>
          <div className="flex gap-4">
             <Button onClick={() => setIsSuccess(false)} variant="outline">View Event</Button>
             <Button onClick={resetForm} className="bg-white text-black hover:bg-gray-200">Create Another</Button>
          </div>
        </div>
      </Card>
    )
  }

  if (!isOpen) {
    return (
      <div className="w-full flex justify-end mb-8">
        <Button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-105"
        >
          <Plus className="mr-2 h-4 w-4" /> Create New Event
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full mb-8">
      <Card className="bg-black/40 border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Create New Event
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="text-purple-400 font-medium">Step {currentStep} of {totalSteps}:</span>
              {currentStep === 1 && "Basic Information"}
              {currentStep === 2 && "Date & Location"}
              {currentStep === 3 && "Pricing & Tickets"}
              {currentStep === 4 && "NFT & Blockchain"}
              {currentStep === 5 && "Additional Settings"}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="h-1 rounded-none bg-white/5" indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500" />

        {/* Form Content */}
        <div className="p-6 min-h-[400px]">
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
        <div className="p-6 bg-white/5 border-t border-white/10 flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={currentStep === 1}
            className="text-gray-400 hover:text-white border border-transparent hover:border-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          <div className="flex gap-3">
            <Button variant="outline" className="border-purple-500/20 text-purple-400 hover:bg-purple-500/10">
              Save Draft
            </Button>
            <Button 
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white min-w-[140px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                 <div className="flex items-center justify-center animate-spin">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                 </div>
              ) : currentStep === totalSteps ? (
                <>Deploy & Publish <Send className="ml-2 h-4 w-4" /></>
              ) : (
                <>Next Step <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </div>

      </Card>
    </div>
  )
}
