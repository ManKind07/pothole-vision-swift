
import React, { useState } from 'react';
import { Camera } from '@/components/Camera';
import { ModelInfo } from '@/components/ModelInfo';
import { Header } from '@/components/Header';
import { Analytics } from '@/components/Analytics';
import { Settings } from '@/components/Settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Index = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionCount, setDetectionCount] = useState(0);
  const [activeTab, setActiveTab] = useState("camera");

  // This would come from actual detections in a real implementation
  const handleDetection = (count: number) => {
    setDetectionCount(count);
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      <Header 
        isDetecting={isDetecting} 
        onToggleDetection={() => setIsDetecting(!isDetecting)}
      />
      
      <Alert className="mx-4 mt-4 border-detection">
        <AlertCircle className="h-4 w-4 text-detection" />
        <AlertTitle className="text-detection">React Simulation</AlertTitle>
        <AlertDescription>
          This is a React-based simulation. In a real Flutter app, you'd use Flutter's camera and TFLite packages.
        </AlertDescription>
      </Alert>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4">
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
            />
          </TabsContent>
          
          <TabsContent value="analytics" className="h-full m-0 p-4">
            <Analytics detectionCount={detectionCount} />
          </TabsContent>
          
          <TabsContent value="settings" className="h-full m-0 p-4">
            <Settings />
          </TabsContent>
        </div>
      </Tabs>
      
      <ModelInfo />
    </div>
  );
};

export default Index;
