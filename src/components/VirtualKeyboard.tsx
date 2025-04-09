
import React from 'react';
import { cn } from '@/lib/utils';

interface VirtualKeyboardProps {
  activeKey?: string | null;
  className?: string;
}

const keyboardLayout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
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

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ 
  activeKey = null,
  className
}) => {
  return (
    <div className={cn("p-2 rounded-lg", className)}>
      <div className="flex flex-col items-center gap-1">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((key) => {
              const isActive = activeKey?.toLowerCase() === key.toLowerCase();
              const keyWidth = keyWidths[key] || 'w-10';
              
              return (
                <div
                  key={key}
                  className={cn(
                    "keyboard-key",
                    keyWidth,
                    isActive && "keyboard-key-active"
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
