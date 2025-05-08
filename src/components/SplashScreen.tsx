
import React, { useEffect, useState } from 'react';

export const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!showSplash) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      <div className="w-24 h-24 bg-detection rounded-full mb-6 animate-pulse-detection flex items-center justify-center">
        <div className="w-16 h-16 bg-black rounded-full"></div>
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Pothole Vision</h1>
      <p className="text-gray-400">ML-Powered Road Hazard Detection</p>
    </div>
  );
};
