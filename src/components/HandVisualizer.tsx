
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
        <svg width="200" height="240" viewBox="0 0 200 240" className="hand-svg">
          {/* Palm */}
          <path 
            d="M40,150 C40,170 40,190 60,210 C80,230 110,230 140,210 C160,190 160,170 160,150 L150,80 C150,80 145,60 130,60 C115,60 110,80 110,80 L110,120 L90,120 L90,60 C90,60 85,40 70,40 C55,40 50,60 50,60 L50,120 L40,150 Z" 
            fill="#f9d9c0" 
            stroke="#c9b0a0" 
            strokeWidth="1.5"
          />
          
          {/* Pinky - Left most finger */}
          <path 
            d="M160,150 L170,90 C172,80 170,70 160,67 C150,65 145,70 143,80 L140,150"
            className={cn(
              "hand-finger transition-all duration-300",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 3 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f9d9c0] stroke-[#c9b0a0]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Ring Finger */}
          <path 
            d="M140,150 L145,70 C147,60 140,50 130,47 C120,45 113,56 110,65 L110,150"
            className={cn(
              "hand-finger transition-all duration-300",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 2 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f9d9c0] stroke-[#c9b0a0]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Middle Finger */}
          <path 
            d="M110,150 L110,65 C110,55 105,45 90,45 C75,45 70,55 70,65 L75,150"
            className={cn(
              "hand-finger transition-all duration-300",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 1 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f9d9c0] stroke-[#c9b0a0]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Index Finger - Right most finger on left hand */}
          <path 
            d="M75,150 L70,80 C68,70 60,65 50,68 C40,71 38,80 40,90 L50,150"
            className={cn(
              "hand-finger transition-all duration-300",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 0 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f9d9c0] stroke-[#c9b0a0]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Thumb */}
          <path 
            d="M50,150 C30,140 20,120 25,100 C30,80 45,75 55,80 C65,85 65,90 65,100 L70,120 L50,150"
            className={cn(
              "hand-finger transition-all duration-300",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 4 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f9d9c0] stroke-[#c9b0a0]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Finger joints and details for better definition */}
          {/* Pinky joints */}
          <path d="M160,150 C160,140 143,137 143,130" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          <path d="M143,130 C143,120 143,110 160,105" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          
          {/* Ring finger joints */}
          <path d="M140,150 C140,140 110,137 110,130" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          <path d="M110,130 C110,120 110,110 130,105" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          
          {/* Middle finger joints */}
          <path d="M110,150 C110,140 75,137 75,130" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          <path d="M75,130 C75,120 75,110 90,105" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          
          {/* Index finger joints */}
          <path d="M75,150 C75,140 50,137 50,130" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          <path d="M50,130 C50,120 50,110 60,105" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          
          {/* Fingernails */}
          <path d="M160,80 C160,75 165,74 170,76" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          <path d="M130,58 C130,53 135,52 140,54" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          <path d="M90,55 C90,50 95,49 100,51" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          <path d="M60,75 C60,70 65,69 70,71" fill="none" stroke="#c9b0a0" strokeWidth="1" />
        </svg>
        <div className="text-center mt-2 text-sm font-medium">Left Hand</div>
      </div>
      
      {/* Right Hand */}
      <div className="relative">
        <svg width="200" height="240" viewBox="0 0 200 240" className="hand-svg">
          {/* Palm */}
          <path 
            d="M160,150 C160,170 160,190 140,210 C120,230 90,230 60,210 C40,190 40,170 40,150 L50,80 C50,80 55,60 70,60 C85,60 90,80 90,80 L90,120 L110,120 L110,60 C110,60 115,40 130,40 C145,40 150,60 150,60 L150,120 L160,150 Z" 
            fill="#f9d9c0" 
            stroke="#c9b0a0" 
            strokeWidth="1.5"
          />
          
          {/* Pinky - Right most finger */}
          <path 
            d="M40,150 L30,90 C28,80 30,70 40,67 C50,65 55,70 57,80 L60,150"
            className={cn(
              "hand-finger transition-all duration-300",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 3 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f9d9c0] stroke-[#c9b0a0]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Ring Finger */}
          <path 
            d="M60,150 L55,70 C53,60 60,50 70,47 C80,45 87,56 90,65 L90,150"
            className={cn(
              "hand-finger transition-all duration-300",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 2 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f9d9c0] stroke-[#c9b0a0]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Middle Finger */}
          <path 
            d="M90,150 L90,65 C90,55 95,45 110,45 C125,45 130,55 130,65 L125,150"
            className={cn(
              "hand-finger transition-all duration-300",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 1 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f9d9c0] stroke-[#c9b0a0]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Index Finger - Left most finger on right hand */}
          <path 
            d="M125,150 L130,80 C132,70 140,65 150,68 C160,71 162,80 160,90 L150,150"
            className={cn(
              "hand-finger transition-all duration-300",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 0 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f9d9c0] stroke-[#c9b0a0]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Thumb */}
          <path 
            d="M150,150 C170,140 180,120 175,100 C170,80 155,75 145,80 C135,85 135,90 135,100 L130,120 L150,150"
            className={cn(
              "hand-finger transition-all duration-300",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 4 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f9d9c0] stroke-[#c9b0a0]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Finger joints and details for better definition */}
          {/* Pinky joints */}
          <path d="M40,150 C40,140 57,137 57,130" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          <path d="M57,130 C57,120 57,110 40,105" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          
          {/* Ring finger joints */}
          <path d="M60,150 C60,140 90,137 90,130" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          <path d="M90,130 C90,120 90,110 70,105" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          
          {/* Middle finger joints */}
          <path d="M90,150 C90,140 125,137 125,130" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          <path d="M125,130 C125,120 125,110 110,105" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          
          {/* Index finger joints */}
          <path d="M125,150 C125,140 150,137 150,130" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          <path d="M150,130 C150,120 150,110 140,105" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          
          {/* Fingernails */}
          <path d="M40,80 C40,75 35,74 30,76" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          <path d="M70,58 C70,53 65,52 60,54" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          <path d="M110,55 C110,50 105,49 100,51" fill="none" stroke="#c9b0a0" strokeWidth="1" />
          <path d="M140,75 C140,70 135,69 130,71" fill="none" stroke="#c9b0a0" strokeWidth="1" />
        </svg>
        <div className="text-center mt-2 text-sm font-medium">Right Hand</div>
      </div>
    </div>
  );
};
