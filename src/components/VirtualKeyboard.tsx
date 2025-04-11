
import React from 'react';
import { cn } from '@/lib/utils';
import { useTyping, fingerMap, hindiKeyboardMap } from '@/contexts/TypingContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface VirtualKeyboardProps {
  activeKey?: string | null;
  className?: string;
}

// English keyboard layout
const englishKeyboardLayout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Fn', 'Ctrl']
];

// Hindi keyboard layout
const hindiKeyboardLayout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'ौ', 'ै', 'ा', 'ी', 'ू', 'ब', 'ह', 'ग', 'द', 'ज', 'ड', '़', '\\'],
  ['Caps', 'ो', 'े', '्', 'ि', 'ु', 'प', 'र', 'क', 'त', 'च', 'ट', 'Enter'],
  ['Shift', 'ॉ', 'ं', 'म', 'न', 'व', 'ल', 'स', ',', '.', 'य', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Fn', 'Ctrl']
];

const keyWidths: Record<string, string> = {
  'Backspace': 'w-16',
  'Tab': 'w-16',
  'Caps': 'w-16',
  'Enter': 'w-16',
  'Shift': 'w-20',
  'Ctrl': 'w-12',
  'Win': 'w-12',
  'Alt': 'w-12',
  'Space': 'w-64',
  'Fn': 'w-12',
};

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ className }) => {
  const { currentKey, typedCharacters, typingText, currentPosition, selectedLanguage } = useTyping();
  const isMobile = useIsMobile();
  
  // Determine which keyboard layout to use
  const keyboardLayout = selectedLanguage === 'english' ? englishKeyboardLayout : hindiKeyboardLayout;
  
  // Check if the current key is uppercase (so we should highlight Shift)
  const isCapitalLetter = currentKey && currentKey === currentKey.toUpperCase() && currentKey.toLowerCase() !== currentKey;
  
  return (
    <div className={cn("p-2 rounded-lg shadow-sm", className, isMobile ? "scale-75 origin-top" : "")}>
      <div className="flex flex-col items-center gap-1">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((key) => {
              // For Hindi layout, find the equivalent English key for correct finger mapping
              const englishKey = selectedLanguage === 'hindi' 
                ? Object.entries(hindiKeyboardMap).find(([_, value]) => value === key)?.[0] || key 
                : key;
              
              // Determine if this key is active (currently to be typed)
              const isActive = currentKey?.toLowerCase() === key.toLowerCase();
              
              // Special case for Shift key - highlight if current key is uppercase
              const isShiftKey = key === 'Shift';
              const isShiftActive = isShiftKey && isCapitalLetter;
              
              // Determine if this key has been correctly or incorrectly typed
              const keyStatus = typingText.toLowerCase().split('').map((char, i) => {
                if (char === key.toLowerCase() && i < currentPosition) {
                  return typedCharacters[i];
                }
                return null;
              }).find(status => status !== null);
              
              const keyWidth = keyWidths[key] || 'w-10';
              
              return (
                <div
                  key={key}
                  className={cn(
                    "keyboard-key h-10 flex items-center justify-center rounded-md text-sm font-medium",
                    keyWidth,
                    isActive && "border-primary shadow-sm",
                    isActive && "keyboard-key-active bg-primary/20 border-primary",
                    isShiftActive && "keyboard-key-active bg-primary/20 border-primary",
                    keyStatus === 'correct' && "bg-green-500/20 text-green-700 border-green-500",
                    keyStatus === 'incorrect' && "bg-red-500/20 text-red-700 border-red-500"
                  )}
                >
                  {key === 'Space' ? '' : key}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
