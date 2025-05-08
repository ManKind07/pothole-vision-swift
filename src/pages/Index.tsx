
import React, { useState, useEffect } from 'react';
import { Camera } from '@/components/Camera';
import { ModelInfo } from '@/components/ModelInfo';
import { Header } from '@/components/Header';
import { Analytics } from '@/components/Analytics';
import { Settings } from '@/components/Settings';
import { SplashScreen } from '@/components/SplashScreen';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionCount, setDetectionCount] = useState(0);
  const [activeTab, setActiveTab] = useState("camera");
  const isMobile = useIsMobile();
  
  // This would come from actual detections in a real implementation
  const handleDetection = (count: number) => {
    setDetectionCount(count);
  };

  // Request fullscreen on mobile when in camera mode
  useEffect(() => {
    if (isMobile && activeTab === "camera" && isDetecting) {
      try {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        }
      } catch (error) {
        console.error("Fullscreen request failed:", error);
      }
    }
  }, [isMobile, activeTab, isDetecting]);

  return (
    <div className="flex flex-col h-screen bg-black">
      <SplashScreen />
      
      <Header 
        isDetecting={isDetecting} 
        onToggleDetection={() => setIsDetecting(!isDetecting)}
      />
      
      {!isMobile && (
        <Alert className="mx-4 mt-4 border-detection">
          <AlertCircle className="h-4 w-4 text-detection" />
          <AlertTitle className="text-detection">Mobile App</AlertTitle>
          <AlertDescription>
            This application is optimized for mobile devices. For the best experience, please view on a mobile device.
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className={`px-4 ${isMobile ? 'sticky top-0 z-10 bg-black' : ''}`}>
          <TabsList className="w-full my-4">
            <TabsTrigger value="camera" className="flex-1">Camera</TabsTrigger>
            <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <TabsContent value="camera" className="h-full m-0">
            <Camera 
              isDetecting={isDetecting}
              onDetection={handleDetection}
              isMobile={isMobile}
            />
          </TabsContent>
          
          <TabsContent value="analytics" className="h-full m-0 p-4 overflow-auto">
            <Analytics detectionCount={detectionCount} />
          </TabsContent>
          
          <TabsContent value="settings" className="h-full m-0 p-4 overflow-auto">
            <Settings />
          </TabsContent>
        </div>
      </Tabs>
      
      <ModelInfo />
    </div>
  );
};

export default Index;
