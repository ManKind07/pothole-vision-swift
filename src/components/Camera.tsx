
import React, { useEffect, useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface Detection {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
}

interface CameraProps {
  isDetecting: boolean;
  onDetection: (count: number) => void;
}

export const Camera: React.FC<CameraProps> = ({ isDetecting, onDetection }) => {
  const [detections, setDetections] = useState<Detection[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const animationRef = useRef<number | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  
  // Mock video dimensions
  const videoWidth = 640;
  const videoHeight = 480;
  
  // Start camera
  useEffect(() => {
    const setupCamera = async () => {
      try {
        const constraints = {
          video: {
            width: { ideal: videoWidth },
            height: { ideal: videoHeight },
            facingMode: "environment"
          }
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCameraActive(true);
          
          toast({
            title: "Camera initialized",
            description: "Camera feed is now active"
          });
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        toast({
          variant: "destructive",
          title: "Camera error",
          description: "Could not access camera. Please check permissions."
        });
      }
    };
    
    setupCamera();
    
    return () => {
      // Clean up camera stream
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        setCameraActive(false);
      }
    };
  }, [toast]);
  
  // Mock TFLite detection
  useEffect(() => {
    let detectionInterval: NodeJS.Timeout | null = null;
    
    if (isDetecting && cameraActive) {
      // Mock detection process - in a real app, this would be calling TFLite
      detectionInterval = setInterval(() => {
        const mockDetections: Detection[] = [];
        const detectionCount = Math.floor(Math.random() * 3); // 0-2 potholes
        
        for (let i = 0; i < detectionCount; i++) {
          mockDetections.push({
            id: Date.now() + i,
            x: Math.random() * (videoWidth - 100),
            y: Math.random() * (videoHeight - 100),
            width: 50 + Math.random() * 100,
            height: 40 + Math.random() * 80,
            confidence: 0.5 + Math.random() * 0.5
          });
        }
        
        setDetections(mockDetections);
        onDetection(mockDetections.length);
      }, 1000);
      
      toast({
        title: "Detection started",
        description: "Pothole detection is now active"
      });
    } else if (detectionInterval) {
      clearInterval(detectionInterval);
      setDetections([]);
      
      if (!isDetecting && cameraActive) {
        toast({
          title: "Detection stopped",
          description: "Pothole detection has been paused"
        });
      }
    }
    
    return () => {
      if (detectionInterval) {
        clearInterval(detectionInterval);
      }
    };
  }, [isDetecting, cameraActive, onDetection, toast]);
  
  // Animation loop for smooth rendering
  useEffect(() => {
    const animateDetections = () => {
      if (videoRef.current && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          
          // Draw video frame
          ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
          
          // Draw detections
          detections.forEach(detection => {
            ctx.strokeStyle = '#FFCC00';
            ctx.lineWidth = 3;
            ctx.strokeRect(detection.x, detection.y, detection.width, detection.height);
            
            // Draw label
            ctx.fillStyle = '#FFCC00';
            ctx.fillRect(detection.x, detection.y - 20, 100, 20);
            ctx.fillStyle = '#000';
            ctx.font = '12px Arial';
            ctx.fillText(`Pothole: ${(detection.confidence * 100).toFixed(0)}%`, detection.x + 5, detection.y - 5);
          });
        }
      }
      
      animationRef.current = requestAnimationFrame(animateDetections);
    };
    
    if (cameraActive) {
      animationRef.current = requestAnimationFrame(animateDetections);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [detections, cameraActive]);
  
  return (
    <div className="camera-container h-full">
      <canvas 
        ref={canvasRef}
        width={videoWidth}
        height={videoHeight}
        className="w-full h-full object-cover bg-black"
      />
      <video 
        ref={videoRef}
        className="hidden"
        muted
        playsInline
      />
      
      {isDetecting && (
        <div className="absolute bottom-4 right-4 bg-detection text-black px-2 py-1 rounded-full text-sm font-bold animate-pulse-detection">
          Detecting...
        </div>
      )}
    </div>
  );
};
