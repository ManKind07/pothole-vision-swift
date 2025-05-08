
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsProps {
  detectionCount: number;
}

export const Analytics: React.FC<AnalyticsProps> = ({ detectionCount }) => {
  // Mock data for chart
  const data = [
    { time: '1m', count: Math.floor(Math.random() * 5) },
    { time: '2m', count: Math.floor(Math.random() * 5) },
    { time: '3m', count: Math.floor(Math.random() * 5) },
    { time: '4m', count: Math.floor(Math.random() * 5) },
    { time: '5m', count: Math.floor(Math.random() * 5) },
    { time: 'Now', count: detectionCount },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Current Detection</CardTitle>
          <CardDescription>Potholes detected in current frame</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-10">
          <div className="text-6xl font-bold text-detection">{detectionCount}</div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Updated in real-time as detection occurs
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detection History</CardTitle>
          <CardDescription>Number of potholes detected over time</CardDescription>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#FFCC00" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
