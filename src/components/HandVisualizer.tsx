
import React from 'react';
import { cn } from '@/lib/utils';
import { useTyping, fingerMap } from '@/contexts/TypingContext';

export const HandVisualizer: React.FC = () => {
  const { currentKey, selectedLanguage } = useTyping();
  
  // Determine which finger should be used for the current key
  const fingerInfo = currentKey ? fingerMap[currentKey.toLowerCase()] : null;
  
  return (
    <div className="flex justify-center gap-12 w-full max-w-4xl mx-auto">
      {/* Left Hand */}
      <div className="relative">
        <svg width="180" height="220" viewBox="0 0 180 220" className="hand-svg">
          {/* Palm */}
          <path 
            d="M30,130 C30,150 30,170 50,190 C70,210 100,210 130,190 C150,170 150,150 150,130 L140,60 C140,60 135,40 120,40 C105,40 100,60 100,60 L100,100 L80,100 L80,40 C80,40 75,20 60,20 C45,20 40,40 40,40 L40,110 L30,130 Z" 
            fill="#f3d3bd" 
            stroke="#d4b49b" 
            strokeWidth="2"
          />
          
          {/* Pinky */}
          <path 
            d="M150,130 L160,90 C162,80 160,70 150,68 C140,66 135,70 133,80 L130,130"
            className={cn(
              "hand-finger",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 3 
                ? "fill-primary/30 stroke-primary" 
                : "fill-[#f3d3bd] stroke-[#d4b49b]"
            )}
            strokeWidth="2"
          />
          
          {/* Ring Finger */}
          <path 
            d="M130,130 L135,70 C137,60 130,50 120,48 C110,46 103,56 100,65 L100,130"
            className={cn(
              "hand-finger",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 2 
                ? "fill-primary/30 stroke-primary" 
                : "fill-[#f3d3bd] stroke-[#d4b49b]"
            )}
            strokeWidth="2"
          />
          
          {/* Middle Finger */}
          <path 
            d="M100,130 L100,65 C100,55 95,45 80,45 C65,45 60,55 60,65 L65,130"
            className={cn(
              "hand-finger",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 1 
                ? "fill-primary/30 stroke-primary" 
                : "fill-[#f3d3bd] stroke-[#d4b49b]"
            )}
            strokeWidth="2"
          />
          
          {/* Index Finger */}
          <path 
            d="M65,130 L60,80 C58,70 50,65 40,68 C30,71 28,80 30,90 L40,130"
            className={cn(
              "hand-finger",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 0 
                ? "fill-primary/30 stroke-primary" 
                : "fill-[#f3d3bd] stroke-[#d4b49b]"
            )}
            strokeWidth="2"
          />
          
          {/* Thumb */}
          <path 
            d="M40,130 C20,120 10,100 15,80 C20,60 35,55 45,60 C55,65 55,70 55,80 L60,100 L40,130"
            className={cn(
              "hand-finger",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 4 
                ? "fill-primary/30 stroke-primary" 
                : "fill-[#f3d3bd] stroke-[#d4b49b]"
            )}
            strokeWidth="2"
          />
        </svg>
        <div className="text-center mt-2 text-sm font-medium">Left Hand</div>
      </div>
      
      {/* Right Hand */}
      <div className="relative">
        <svg width="180" height="220" viewBox="0 0 180 220" className="hand-svg">
          {/* Palm */}
          <path 
            d="M150,130 C150,150 150,170 130,190 C110,210 80,210 50,190 C30,170 30,150 30,130 L40,60 C40,60 45,40 60,40 C75,40 80,60 80,60 L80,100 L100,100 L100,40 C100,40 105,20 120,20 C135,20 140,40 140,40 L140,110 L150,130 Z" 
            fill="#f3d3bd" 
            stroke="#d4b49b" 
            strokeWidth="2"
          />
          
          {/* Pinky */}
          <path 
            d="M30,130 L20,90 C18,80 20,70 30,68 C40,66 45,70 47,80 L50,130"
            className={cn(
              "hand-finger",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 3 
                ? "fill-primary/30 stroke-primary" 
                : "fill-[#f3d3bd] stroke-[#d4b49b]"
            )}
            strokeWidth="2"
          />
          
          {/* Ring Finger */}
          <path 
            d="M50,130 L45,70 C43,60 50,50 60,48 C70,46 77,56 80,65 L80,130"
            className={cn(
              "hand-finger",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 2 
                ? "fill-primary/30 stroke-primary" 
                : "fill-[#f3d3bd] stroke-[#d4b49b]"
            )}
            strokeWidth="2"
          />
          
          {/* Middle Finger */}
          <path 
            d="M80,130 L80,65 C80,55 85,45 100,45 C115,45 120,55 120,65 L115,130"
            className={cn(
              "hand-finger",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 1 
                ? "fill-primary/30 stroke-primary" 
                : "fill-[#f3d3bd] stroke-[#d4b49b]"
            )}
            strokeWidth="2"
          />
          
          {/* Index Finger */}
          <path 
            d="M115,130 L120,80 C122,70 130,65 140,68 C150,71 152,80 150,90 L140,130"
            className={cn(
              "hand-finger",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 0 
                ? "fill-primary/30 stroke-primary" 
                : "fill-[#f3d3bd] stroke-[#d4b49b]"
            )}
            strokeWidth="2"
          />
          
          {/* Thumb */}
          <path 
            d="M140,130 C160,120 170,100 165,80 C160,60 145,55 135,60 C125,65 125,70 125,80 L120,100 L140,130"
            className={cn(
              "hand-finger",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 4 
                ? "fill-primary/30 stroke-primary" 
                : "fill-[#f3d3bd] stroke-[#d4b49b]"
            )}
            strokeWidth="2"
          />
        </svg>
        <div className="text-center mt-2 text-sm font-medium">Right Hand</div>
      </div>
    </div>
  );
};
