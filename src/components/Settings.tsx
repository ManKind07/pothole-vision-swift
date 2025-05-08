
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Download, Upload, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const Settings = () => {
  const { toast } = useToast();
  
  const handleModelChange = () => {
    toast({
      title: "Model would be changed",
      description: "In a real Flutter app, this would load a different TFLite model"
    });
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Detection Settings</CardTitle>
          <CardDescription>Configure pothole detection parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="confidence">Confidence Threshold: 0.5</Label>
            </div>
            <Slider 
              id="confidence"
              defaultValue={[50]} 
              max={100} 
              step={1}
            />
            <p className="text-xs text-muted-foreground">
              Higher values reduce false positives but might miss some potholes
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="high-performance">High Performance Mode</Label>
              <p className="text-xs text-muted-foreground">May increase battery usage</p>
            </div>
            <Switch id="high-performance" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="save-detections">Save Detections</Label>
              <p className="text-xs text-muted-foreground">Automatically save detection images</p>
            </div>
            <Switch id="save-detections" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Model Management</CardTitle>
          <CardDescription>Manage the TFLite detection model</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm">
            <p><strong>Current Model:</strong> YOLOv8n</p>
            <p><strong>Format:</strong> TFLite</p>
            <p><strong>Size:</strong> 13.5 MB</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="flex gap-2" onClick={handleModelChange}>
              <Upload className="h-4 w-4" />
              Load Custom Model
            </Button>
            
            <Button variant="outline" className="flex gap-2">
              <Download className="h-4 w-4" />
              Download Default Model
            </Button>
            
            <Button variant="outline" className="flex gap-2">
              <RefreshCw className="h-4 w-4" />
              Reset to Default Model
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Model changes will take effect immediately
        </CardFooter>
      </Card>
    </div>
  );
};
