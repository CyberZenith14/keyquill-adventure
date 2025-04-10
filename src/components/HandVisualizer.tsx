
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
          {/* Wrist/Base of Hand */}
          <path 
            d="M40,190 C40,210 60,230 100,230 C140,230 160,210 160,190 L160,170 C160,170 150,160 140,160 L60,160 C50,160 40,170 40,170 L40,190 Z" 
            fill="#f8d5c8" 
            stroke="#dda192" 
            strokeWidth="1.5"
          />
          
          {/* Palm */}
          <path 
            d="M60,160 L60,130 C60,110 75,90 100,90 C125,90 140,110 140,130 L140,160" 
            fill="#f8d5c8" 
            stroke="#dda192" 
            strokeWidth="1.5"
          />
          
          {/* Thumb */}
          <path 
            d="M60,160 C50,155 40,145 35,130 C30,115 35,100 50,95 C65,90 75,95 80,110 L60,160"
            className={cn(
              "transition-all duration-300",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 4 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f8d5c8] stroke-[#dda192]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Index Finger */}
          <path 
            d="M80,130 C80,110 80,80 80,60 C80,50 90,45 100,45 C110,45 120,50 120,60 C120,75 120,110 120,130"
            className={cn(
              "transition-all duration-300",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 0 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f8d5c8] stroke-[#dda192]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Middle Finger */}
          <path 
            d="M85,90 C85,80 85,60 87,50 C89,40 95,35 105,35 C115,35 121,40 123,50 C125,60 125,80 125,90"
            className={cn(
              "transition-all duration-300",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 1 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f8d5c8] stroke-[#dda192]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Ring Finger */}
          <path 
            d="M90,90 C90,80 90,65 92,55 C94,45 100,40 110,40 C120,40 126,45 128,55 C130,65 130,80 130,90"
            className={cn(
              "transition-all duration-300",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 2 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f8d5c8] stroke-[#dda192]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Pinky Finger */}
          <path 
            d="M95,90 C95,80 95,70 97,60 C99,50 105,45 115,45 C125,45 131,50 133,60 C135,70 135,80 135,90"
            className={cn(
              "transition-all duration-300",
              fingerInfo?.hand === 'left' && fingerInfo?.finger === 3 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f8d5c8] stroke-[#dda192]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Fingernails */}
          <ellipse cx="100" cy="48" rx="8" ry="3" fill="#f0f0f0" stroke="#dda192" strokeWidth="1" />
          <ellipse cx="105" cy="38" rx="8" ry="3" fill="#f0f0f0" stroke="#dda192" strokeWidth="1" />
          <ellipse cx="110" cy="43" rx="8" ry="3" fill="#f0f0f0" stroke="#dda192" strokeWidth="1" />
          <ellipse cx="115" cy="48" rx="8" ry="3" fill="#f0f0f0" stroke="#dda192" strokeWidth="1" />
          
          {/* Knuckle details */}
          <path d="M80,90 C85,92 95,94 100,94" fill="none" stroke="#dda192" strokeWidth="0.7" />
          <path d="M85,70 C90,72 100,74 105,74" fill="none" stroke="#dda192" strokeWidth="0.7" />
          <path d="M90,70 C95,72 105,74 110,74" fill="none" stroke="#dda192" strokeWidth="0.7" />
          <path d="M95,70 C100,72 110,74 115,74" fill="none" stroke="#dda192" strokeWidth="0.7" />
          
          {/* Finger Separation Lines */}
          <path d="M80,110 C90,109 110,109 120,110" fill="none" stroke="#dda192" strokeWidth="0.7" />
          <path d="M85,90 C95,89 115,89 125,90" fill="none" stroke="#dda192" strokeWidth="0.7" />
          <path d="M90,90 C100,89 120,89 130,90" fill="none" stroke="#dda192" strokeWidth="0.7" />
          <path d="M95,90 C105,89 125,89 135,90" fill="none" stroke="#dda192" strokeWidth="0.7" />
        </svg>
        <div className="text-center mt-2 text-sm font-medium">Left Hand</div>
      </div>
      
      {/* Right Hand */}
      <div className="relative">
        <svg width="200" height="240" viewBox="0 0 200 240" className="hand-svg">
          {/* Wrist/Base of Hand */}
          <path 
            d="M160,190 C160,210 140,230 100,230 C60,230 40,210 40,190 L40,170 C40,170 50,160 60,160 L140,160 C150,160 160,170 160,170 L160,190 Z" 
            fill="#f8d5c8" 
            stroke="#dda192" 
            strokeWidth="1.5"
          />
          
          {/* Palm */}
          <path 
            d="M140,160 L140,130 C140,110 125,90 100,90 C75,90 60,110 60,130 L60,160" 
            fill="#f8d5c8" 
            stroke="#dda192" 
            strokeWidth="1.5"
          />
          
          {/* Thumb */}
          <path 
            d="M140,160 C150,155 160,145 165,130 C170,115 165,100 150,95 C135,90 125,95 120,110 L140,160"
            className={cn(
              "transition-all duration-300",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 4 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f8d5c8] stroke-[#dda192]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Index Finger */}
          <path 
            d="M120,130 C120,110 120,80 120,60 C120,50 110,45 100,45 C90,45 80,50 80,60 C80,75 80,110 80,130"
            className={cn(
              "transition-all duration-300",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 0 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f8d5c8] stroke-[#dda192]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Middle Finger */}
          <path 
            d="M115,90 C115,80 115,60 113,50 C111,40 105,35 95,35 C85,35 79,40 77,50 C75,60 75,80 75,90"
            className={cn(
              "transition-all duration-300",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 1 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f8d5c8] stroke-[#dda192]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Ring Finger */}
          <path 
            d="M110,90 C110,80 110,65 108,55 C106,45 100,40 90,40 C80,40 74,45 72,55 C70,65 70,80 70,90"
            className={cn(
              "transition-all duration-300",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 2 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f8d5c8] stroke-[#dda192]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Pinky Finger */}
          <path 
            d="M105,90 C105,80 105,70 103,60 C101,50 95,45 85,45 C75,45 69,50 67,60 C65,70 65,80 65,90"
            className={cn(
              "transition-all duration-300",
              fingerInfo?.hand === 'right' && fingerInfo?.finger === 3 
                ? "fill-primary/40 stroke-primary stroke-[1.5px]" 
                : "fill-[#f8d5c8] stroke-[#dda192]"
            )}
            strokeWidth="1.5"
          />
          
          {/* Fingernails */}
          <ellipse cx="100" cy="48" rx="8" ry="3" fill="#f0f0f0" stroke="#dda192" strokeWidth="1" />
          <ellipse cx="95" cy="38" rx="8" ry="3" fill="#f0f0f0" stroke="#dda192" strokeWidth="1" />
          <ellipse cx="90" cy="43" rx="8" ry="3" fill="#f0f0f0" stroke="#dda192" strokeWidth="1" />
          <ellipse cx="85" cy="48" rx="8" ry="3" fill="#f0f0f0" stroke="#dda192" strokeWidth="1" />
          
          {/* Knuckle details */}
          <path d="M120,90 C115,92 105,94 100,94" fill="none" stroke="#dda192" strokeWidth="0.7" />
          <path d="M115,70 C110,72 100,74 95,74" fill="none" stroke="#dda192" strokeWidth="0.7" />
          <path d="M110,70 C105,72 95,74 90,74" fill="none" stroke="#dda192" strokeWidth="0.7" />
          <path d="M105,70 C100,72 90,74 85,74" fill="none" stroke="#dda192" strokeWidth="0.7" />
          
          {/* Finger Separation Lines */}
          <path d="M120,110 C110,109 90,109 80,110" fill="none" stroke="#dda192" strokeWidth="0.7" />
          <path d="M115,90 C105,89 85,89 75,90" fill="none" stroke="#dda192" strokeWidth="0.7" />
          <path d="M110,90 C100,89 80,89 70,90" fill="none" stroke="#dda192" strokeWidth="0.7" />
          <path d="M105,90 C95,89 75,89 65,90" fill="none" stroke="#dda192" strokeWidth="0.7" />
        </svg>
        <div className="text-center mt-2 text-sm font-medium">Right Hand</div>
      </div>
    </div>
  );
};
