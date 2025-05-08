
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

interface HeaderProps {
  isDetecting: boolean;
  onToggleDetection: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDetecting, onToggleDetection }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-background border-b border-border">
      <div className="flex items-center">
        <div className="bg-detection w-3 h-3 rounded-full mr-2 animate-pulse-detection"></div>
        <h1 className="text-xl font-bold">Pothole Vision</h1>
      </div>
      
      <Button 
        onClick={onToggleDetection}
        variant={isDetecting ? "destructive" : "default"}
        size="sm"
      >
        {isDetecting ? (
          <>
            <Pause className="mr-2 h-4 w-4" /> 
            Stop Detection
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" /> 
            Start Detection
          </>
        )}
      </Button>
    </div>
  );
};
