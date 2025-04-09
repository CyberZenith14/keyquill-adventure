
import React from 'react';
import { cn } from '@/lib/utils';
import { useTyping, fingerMap } from '@/contexts/TypingContext';

export const HandVisualizer: React.FC = () => {
  const { currentKey, selectedLanguage } = useTyping();
  
  // Determine which finger should be used for the current key
  const fingerInfo = currentKey ? fingerMap[currentKey] : null;
  
  return (
    <div className="flex justify-between w-full max-w-4xl mx-auto">
      {/* Left Hand */}
      <div className="relative">
        <svg width="200" height="250" viewBox="0 0 200 250" className="hand-svg">
          {/* Thumb */}
          <path 
            d="M110,180 C100,170 95,160 95,140 C95,120 110,110 120,115 C130,120 135,130 130,150 Z" 
            className={cn(
              "hand-finger transition-colors",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 4 ? "fill-primary stroke-primary" : "fill-gray-300 stroke-gray-400"
            )}
          />
          {/* Index Finger */}
          <path 
            d="M95,140 C95,110 95,80 95,50 C95,40 100,35 110,35 C120,35 125,40 125,50 C125,80 125,110 125,140 Z" 
            className={cn(
              "hand-finger transition-colors",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 0 ? "fill-primary stroke-primary" : "fill-gray-300 stroke-gray-400"
            )}
          />
          {/* Middle Finger */}
          <path 
            d="M130,140 C130,105 130,70 130,35 C130,25 135,20 145,20 C155,20 160,25 160,35 C160,70 160,105 160,140 Z" 
            className={cn(
              "hand-finger transition-colors",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 1 ? "fill-primary stroke-primary" : "fill-gray-300 stroke-gray-400"
            )}
          />
          {/* Ring Finger */}
          <path 
            d="M165,140 C165,110 165,80 165,50 C165,40 170,35 180,35 C190,35 195,40 195,50 C195,80 195,110 195,140 Z" 
            className={cn(
              "hand-finger transition-colors",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 2 ? "fill-primary stroke-primary" : "fill-gray-300 stroke-gray-400"
            )}
          />
          {/* Pinky Finger */}
          <path 
            d="M200,140 C200,115 200,90 200,65 C200,55 205,50 215,50 C225,50 230,55 230,65 C230,90 230,115 230,140 Z" 
            className={cn(
              "hand-finger transition-colors",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 3 ? "fill-primary stroke-primary" : "fill-gray-300 stroke-gray-400"
            )}
          />
          {/* Palm */}
          <path 
            d="M110,180 C130,180 170,180 230,180 C240,200 240,220 230,240 C170,240 130,240 110,240 C100,220 100,200 110,180 Z" 
            className="fill-gray-200 stroke-gray-400"
          />
        </svg>
        <div className="text-center mt-2 text-sm font-medium">Left Hand</div>
      </div>
      
      {/* Right Hand */}
      <div className="relative">
        <svg width="200" height="250" viewBox="0 0 200 250" className="hand-svg">
          {/* Thumb */}
          <path 
            d="M90,180 C100,170 105,160 105,140 C105,120 90,110 80,115 C70,120 65,130 70,150 Z" 
            className={cn(
              "hand-finger transition-colors",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 4 ? "fill-primary stroke-primary" : "fill-gray-300 stroke-gray-400"
            )}
          />
          {/* Index Finger */}
          <path 
            d="M105,140 C105,110 105,80 105,50 C105,40 100,35 90,35 C80,35 75,40 75,50 C75,80 75,110 75,140 Z" 
            className={cn(
              "hand-finger transition-colors", 
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 0 ? "fill-primary stroke-primary" : "fill-gray-300 stroke-gray-400"
            )}
          />
          {/* Middle Finger */}
          <path 
            d="M70,140 C70,105 70,70 70,35 C70,25 65,20 55,20 C45,20 40,25 40,35 C40,70 40,105 40,140 Z" 
            className={cn(
              "hand-finger transition-colors",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 1 ? "fill-primary stroke-primary" : "fill-gray-300 stroke-gray-400"
            )}
          />
          {/* Ring Finger */}
          <path 
            d="M35,140 C35,110 35,80 35,50 C35,40 30,35 20,35 C10,35 5,40 5,50 C5,80 5,110 5,140 Z" 
            className={cn(
              "hand-finger transition-colors",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 2 ? "fill-primary stroke-primary" : "fill-gray-300 stroke-gray-400"
            )}
          />
          {/* Pinky Finger */}
          <path 
            d="M0,140 C0,115 0,90 0,65 C0,55 -5,50 -15,50 C-25,50 -30,55 -30,65 C-30,90 -30,115 -30,140 Z" 
            className={cn(
              "hand-finger transition-colors",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 3 ? "fill-primary stroke-primary" : "fill-gray-300 stroke-gray-400"
            )}
          />
          {/* Palm */}
          <path 
            d="M90,180 C70,180 30,180 -30,180 C-40,200 -40,220 -30,240 C30,240 70,240 90,240 C100,220 100,200 90,180 Z" 
            className="fill-gray-200 stroke-gray-400"
          />
        </svg>
        <div className="text-center mt-2 text-sm font-medium">Right Hand</div>
      </div>
    </div>
  );
};
