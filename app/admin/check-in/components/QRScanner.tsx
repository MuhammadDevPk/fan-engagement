"use client"

import { useState, useRef, useEffect } from "react"
import { Flashlight, Keyboard, Search, ScanLine } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QRScannerProps {
  onScan: (data: string) => void
  onManualEntryClick: () => void
}

export default function QRScanner({ onScan, onManualEntryClick }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [flashlightOn, setFlashlightOn] = useState(false)
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null)

  useEffect(() => {
    // Attempt to access camera
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setHasCameraPermission(true)
        }
      } catch (err) {
        console.log("Camera access denied or not available", err)
        setHasCameraPermission(false)
      }
    }

    startCamera()

    return () => {
      // Cleanup stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const toggleFlashlight = async () => {
     // Note: Flashlight API is experimental and may not work on all devices
     // using typical applyConstraints method
     try {
       if (videoRef.current && videoRef.current.srcObject) {
         const stream = videoRef.current.srcObject as MediaStream
         const track = stream.getVideoTracks()[0]
         // @ts-ignore - advanced is not fully typed in all envs
         await track.applyConstraints({
           advanced: [{ torch: !flashlightOn }]
         })
         setFlashlightOn(!flashlightOn)
       }
     } catch (err) {
       console.error("Flashlight toggle failed", err)
       // Just toggle UI state if it fails, so user gets feedback even if hw doesn't respond
       setFlashlightOn(!flashlightOn)
     }
  }

  return (
    <div className="relative w-full h-[60vh] max-h-[500px] bg-black overflow-hidden group">
      {/* Camera Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover opacity-80"
      />
      
      {!hasCameraPermission && (
         <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/90 text-gray-500">
             <div className="text-center p-4">
                 <ScanLine className="w-12 h-12 mx-auto mb-2 opacity-50" />
                 <p>Camera access required</p>
             </div>
         </div>
      )}

      {/* Scanning Frame Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64">
           {/* Animated Corners */}
           <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-eureka-primary rounded-tl-lg animate-pulse" />
           <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-eureka-primary rounded-tr-lg animate-pulse" />
           <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-eureka-primary rounded-bl-lg animate-pulse" />
           <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-eureka-primary rounded-br-lg animate-pulse" />
           
           {/* Scanning Line Animation */}
           <div className="absolute left-0 right-0 h-0.5 bg-eureka-primary/80 shadow-[0_0_10px_rgba(var(--eureka-primary),0.8)] animate-scan" style={{ top: '50%' }} />

           {/* Guide Text inside/below frame */}
           <div className="absolute -bottom-12 left-0 right-0 text-center">
               <span className="text-white/80 text-sm font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                   Align QR code within frame
               </span>
           </div>
        </div>
      </div>

      {/* Controls Overlay */}
      <div className="absolute top-4 right-4 z-20">
         <Button 
            variant="secondary" 
            size="icon" 
            className={`rounded-full bg-black/40 backdrop-blur-md border-white/10 hover:bg-black/60 text-white ${flashlightOn ? 'text-yellow-400' : ''}`}
            onClick={toggleFlashlight}
         >
             <Flashlight className={`w-5 h-5 ${flashlightOn ? 'fill-current' : ''}`} />
         </Button>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
          <Button 
            variant="outline" 
            className="bg-black/40 backdrop-blur-md border-white/20 hover:bg-white/10 text-white gap-2 rounded-full px-6"
            onClick={onManualEntryClick}
          >
              <Keyboard className="w-4 h-4" />
              Enter Ticket ID
          </Button>
      </div>
    </div>
  )
}
