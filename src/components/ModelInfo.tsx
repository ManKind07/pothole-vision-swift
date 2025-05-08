
import React from 'react';
import { AlertCircle, Cpu } from 'lucide-react';

export const ModelInfo = () => {
  return (
    <div className="flex justify-between items-center p-3 bg-muted text-muted-foreground text-xs">
      <div className="flex items-center">
        <Cpu className="h-3 w-3 mr-1" />
        <span>Model: YOLOv8n</span>
      </div>
      <div className="flex items-center">
        <AlertCircle className="h-3 w-3 mr-1" />
        <span>Confidence threshold: 0.5</span>
      </div>
    </div>
  );
};
