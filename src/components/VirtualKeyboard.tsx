
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

// Mobile optimized keyboard layouts (simplified)
const mobileEnglishLayout = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
  ['123', ',', 'Space', '.', 'Enter']
];

const mobileHindiLayout = [
  ['ौ', 'ै', 'ा', 'ी', 'ू', 'ब', 'ह', 'ग', 'द', 'ज'],
  ['ो', 'े', '्', 'ि', 'ु', 'प', 'र', 'क', 'त', 'च'],
  ['Shift', 'ॉ', 'ं', 'म', 'न', 'व', 'ल', 'स', 'Backspace'],
  ['123', ',', 'Space', '.', 'Enter']
];

const keyWidths: Record<string, string> = {
  'Backspace': 'w-16 sm:w-16',
  'Tab': 'w-16 sm:w-16',
  'Caps': 'w-16 sm:w-16',
  'Enter': 'w-16 sm:w-16',
  'Shift': 'w-14 sm:w-20',
  'Ctrl': 'w-12 sm:w-12',
  'Win': 'w-12 sm:w-12',
  'Alt': 'w-12 sm:w-12',
  'Space': 'w-32 sm:w-64',
  'Fn': 'w-12 sm:w-12',
  '123': 'w-10',
};

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ className }) => {
  const { currentKey, typedCharacters, typingText, currentPosition, selectedLanguage } = useTyping();
  const isMobile = useIsMobile();
  
  // Determine which keyboard layout to use based on device and language
  const keyboardLayout = isMobile 
    ? (selectedLanguage === 'english' ? mobileEnglishLayout : mobileHindiLayout)
    : (selectedLanguage === 'english' ? englishKeyboardLayout : hindiKeyboardLayout);
  
  // Check if the current key is uppercase (so we should highlight Shift)
  const isCapitalLetter = currentKey && currentKey === currentKey.toUpperCase() && currentKey.toLowerCase() !== currentKey;
  
  return (
    <div className={cn("p-2 rounded-lg shadow-sm", className, isMobile ? "scale-90 origin-top" : "")}>
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
              
              const keyWidth = keyWidths[key] || (isMobile ? 'w-8' : 'w-10');
              const keyHeight = isMobile ? 'h-9' : 'h-10';
              
              return (
                <div
                  key={key}
                  className={cn(
                    "keyboard-key flex items-center justify-center rounded-md text-sm font-medium",
                    keyWidth,
                    keyHeight,
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
