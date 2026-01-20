"use client"

import { useState, useRef, useEffect } from "react"
import { Flashlight, Keyboard, ScanLine, Volume2, VolumeX, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QRScannerProps {
  onScan: (data: string) => void
  onManualEntryClick: () => void
  isScanning?: boolean
}

export default function QRScanner({ onScan, onManualEntryClick, isScanning }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [flashlightOn, setFlashlightOn] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        })
        if (mounted && videoRef.current) {
          videoRef.current.srcObject = stream
          setHasCameraPermission(true)
        }
      } catch (err) {
        console.log("Camera access denied or not available", err)
        if (mounted) {
          setHasCameraPermission(false)
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    startCamera()

    return () => {
      mounted = false
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const toggleFlashlight = async () => {
    try {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        const track = stream.getVideoTracks()[0]
        const capabilities = track.getCapabilities?.() as MediaTrackCapabilities & { torch?: boolean }
        
        if (capabilities?.torch) {
          await track.applyConstraints({
            // @ts-ignore - torch is not in the standard types
            advanced: [{ torch: !flashlightOn }]
          })
        }
        setFlashlightOn(!flashlightOn)
      }
    } catch (err) {
      console.error("Flashlight toggle failed", err)
      setFlashlightOn(!flashlightOn)
    }
  }

  return (
    <div className="relative w-full h-[55vh] min-h-[300px] max-h-[450px] bg-black overflow-hidden">
      {/* Camera Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-eureka-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Initializing camera...</p>
          </div>
        </div>
      )}
      
      {/* No Camera Permission State */}
      {!isLoading && hasCameraPermission === false && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950">
          <div className="text-center p-6">
            <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
              <ScanLine className="w-10 h-10 text-zinc-600" />
            </div>
            <p className="text-white font-medium mb-1">Camera Access Required</p>
            <p className="text-gray-500 text-sm mb-4">Allow camera access to scan QR codes</p>
            <p className="text-gray-600 text-xs">Or use the manual entry option below</p>
          </div>
        </div>
      )}

      {/* Dark overlay for scanning effect */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Scanning Frame Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-64 h-64">
          {/* Corner brackets with animated glow */}
          <div className={`absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-eureka-primary rounded-tl-xl ${isScanning ? 'opacity-50' : 'animate-pulse'}`} 
            style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)' }} 
          />
          <div className={`absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-eureka-primary rounded-tr-xl ${isScanning ? 'opacity-50' : 'animate-pulse'}`}
            style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)' }} 
          />
          <div className={`absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-eureka-primary rounded-bl-xl ${isScanning ? 'opacity-50' : 'animate-pulse'}`}
            style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)' }} 
          />
          <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-eureka-primary rounded-br-xl ${isScanning ? 'opacity-50' : 'animate-pulse'}`}
            style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)' }} 
          />
          
          {/* Scanning Line Animation */}
          <div 
            className="absolute left-2 right-2 h-1 bg-gradient-to-r from-transparent via-eureka-primary to-transparent rounded-full"
            style={{ 
              top: '50%',
              boxShadow: '0 0 15px rgba(147, 51, 234, 0.8), 0 0 30px rgba(147, 51, 234, 0.4)',
              animation: 'scan 2s ease-in-out infinite'
            }} 
          />
          
          {/* Processing indicator */}
          {isScanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/60 rounded-xl px-4 py-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-eureka-primary animate-pulse" />
                <span className="text-white text-sm">Processing...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Guide Text */}
      <div className="absolute bottom-24 left-0 right-0 text-center pointer-events-none">
        <span className="text-white/90 text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm inline-block">
          {isScanning ? "Verifying ticket..." : "Align QR code within frame"}
        </span>
      </div>

      {/* Top Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <Button 
          variant="secondary" 
          size="icon" 
          className={`rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/70 text-white transition-all ${
            flashlightOn ? 'text-yellow-400 border-yellow-400/50' : ''
          }`}
          onClick={toggleFlashlight}
        >
          <Flashlight className={`w-5 h-5 ${flashlightOn ? 'fill-yellow-400' : ''}`} />
        </Button>
        <Button 
          variant="secondary" 
          size="icon" 
          className={`rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/70 text-white transition-all ${
            !soundOn ? 'text-red-400 border-red-400/50' : ''
          }`}
          onClick={() => setSoundOn(!soundOn)}
        >
          {soundOn ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Manual Entry Button */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
        <Button 
          variant="outline" 
          className="bg-black/60 backdrop-blur-md border-white/20 hover:bg-white/10 hover:border-white/40 text-white gap-2 rounded-full px-6 py-5 transition-all"
          onClick={onManualEntryClick}
        >
          <Keyboard className="w-5 h-5" />
          Enter Ticket ID Manually
        </Button>
      </div>

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes scan {
          0%, 100% {
            transform: translateY(-80px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(80px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
