
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Define the lesson structure
export interface Lesson {
  id: string;
  title: string;
  content: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: 'english' | 'hindi';
}

// Define which finger to use for each key
export const fingerMap: Record<string, {finger: number, hand: 'left' | 'right'}> = {
  // Left hand
  '`': {finger: 0, hand: 'left'}, '~': {finger: 0, hand: 'left'},
  '1': {finger: 0, hand: 'left'}, '!': {finger: 0, hand: 'left'},
  '2': {finger: 1, hand: 'left'}, '@': {finger: 1, hand: 'left'},
  '3': {finger: 2, hand: 'left'}, '#': {finger: 2, hand: 'left'},
  '4': {finger: 3, hand: 'left'}, '$': {finger: 3, hand: 'left'},
  '5': {finger: 3, hand: 'left'}, '%': {finger: 3, hand: 'left'},
  'q': {finger: 0, hand: 'left'}, 'Q': {finger: 0, hand: 'left'},
  'w': {finger: 1, hand: 'left'}, 'W': {finger: 1, hand: 'left'},
  'e': {finger: 2, hand: 'left'}, 'E': {finger: 2, hand: 'left'},
  'r': {finger: 3, hand: 'left'}, 'R': {finger: 3, hand: 'left'},
  't': {finger: 3, hand: 'left'}, 'T': {finger: 3, hand: 'left'},
  'a': {finger: 0, hand: 'left'}, 'A': {finger: 0, hand: 'left'},
  's': {finger: 1, hand: 'left'}, 'S': {finger: 1, hand: 'left'},
  'd': {finger: 2, hand: 'left'}, 'D': {finger: 2, hand: 'left'},
  'f': {finger: 3, hand: 'left'}, 'F': {finger: 3, hand: 'left'},
  'g': {finger: 3, hand: 'left'}, 'G': {finger: 3, hand: 'left'},
  'z': {finger: 0, hand: 'left'}, 'Z': {finger: 0, hand: 'left'},
  'x': {finger: 1, hand: 'left'}, 'X': {finger: 1, hand: 'left'},
  'c': {finger: 2, hand: 'left'}, 'C': {finger: 2, hand: 'left'},
  'v': {finger: 3, hand: 'left'}, 'V': {finger: 3, hand: 'left'},
  'b': {finger: 3, hand: 'left'}, 'B': {finger: 3, hand: 'left'},
  
  // Right hand
  '6': {finger: 0, hand: 'right'}, '^': {finger: 0, hand: 'right'},
  '7': {finger: 0, hand: 'right'}, '&': {finger: 0, hand: 'right'},
  '8': {finger: 1, hand: 'right'}, '*': {finger: 1, hand: 'right'},
  '9': {finger: 2, hand: 'right'}, '(': {finger: 2, hand: 'right'},
  '0': {finger: 3, hand: 'right'}, ')': {finger: 3, hand: 'right'},
  '-': {finger: 3, hand: 'right'}, '_': {finger: 3, hand: 'right'},
  '=': {finger: 3, hand: 'right'}, '+': {finger: 3, hand: 'right'},
  'y': {finger: 0, hand: 'right'}, 'Y': {finger: 0, hand: 'right'},
  'u': {finger: 0, hand: 'right'}, 'U': {finger: 0, hand: 'right'},
  'i': {finger: 1, hand: 'right'}, 'I': {finger: 1, hand: 'right'},
  'o': {finger: 2, hand: 'right'}, 'O': {finger: 2, hand: 'right'},
  'p': {finger: 3, hand: 'right'}, 'P': {finger: 3, hand: 'right'},
  '[': {finger: 3, hand: 'right'}, '{': {finger: 3, hand: 'right'},
  ']': {finger: 3, hand: 'right'}, '}': {finger: 3, hand: 'right'},
  '\\': {finger: 3, hand: 'right'}, '|': {finger: 3, hand: 'right'},
  'h': {finger: 0, hand: 'right'}, 'H': {finger: 0, hand: 'right'},
  'j': {finger: 0, hand: 'right'}, 'J': {finger: 0, hand: 'right'},
  'k': {finger: 1, hand: 'right'}, 'K': {finger: 1, hand: 'right'},
  'l': {finger: 2, hand: 'right'}, 'L': {finger: 2, hand: 'right'},
  ';': {finger: 3, hand: 'right'}, ':': {finger: 3, hand: 'right'},
  '\'': {finger: 3, hand: 'right'}, '"': {finger: 3, hand: 'right'},
  'n': {finger: 0, hand: 'right'}, 'N': {finger: 0, hand: 'right'},
  'm': {finger: 0, hand: 'right'}, 'M': {finger: 0, hand: 'right'},
  ',': {finger: 1, hand: 'right'}, '<': {finger: 1, hand: 'right'},
  '.': {finger: 2, hand: 'right'}, '>': {finger: 2, hand: 'right'},
  '/': {finger: 3, hand: 'right'}, '?': {finger: 3, hand: 'right'},
  
  // Space bar (both thumbs)
  ' ': {finger: 4, hand: 'right'}, // Conventionally right thumb is used
};

// Hindi keyboard mapping
export const hindiKeyboardMap: Record<string, string> = {
  'q': 'ौ', 'w': 'ै', 'e': 'ा', 'r': 'ी', 't': 'ू', 'y': 'ब', 'u': 'ह', 'i': 'ग', 'o': 'द', 'p': 'ज', '[': 'ड', ']': '़',
  'a': 'ो', 's': 'े', 'd': '्', 'f': 'ि', 'g': 'ु', 'h': 'प', 'j': 'र', 'k': 'क', 'l': 'त', ';': 'च', '\'': 'ट',
  'z': 'ॉ', 'x': 'ं', 'c': 'म', 'v': 'न', 'b': 'व', 'n': 'ल', 'm': 'स', ',': ',', '.': '.', '/': 'य',
  // And other characters...
};

// Lesson data with categories
const englishLessons: Lesson[] = [
  // Beginner lessons
  {
    id: 'en-b1',
    title: 'Home Row Keys',
    content: 'asdf jkl; asdf jkl; asdf jkl; asdf jkl;',
    category: 'Basics',
    difficulty: 'beginner',
    language: 'english'
  },
  {
    id: 'en-b2',
    title: 'Top Row Keys',
    content: 'qwer tyui qwer tyui qwer tyui qwer tyui',
    category: 'Basics',
    difficulty: 'beginner',
    language: 'english'
  },
  {
    id: 'en-b3',
    title: 'Bottom Row Keys',
    content: 'zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm,',
    category: 'Basics',
    difficulty: 'beginner',
    language: 'english'
  },
  {
    id: 'en-b4',
    title: 'Numbers Row',
    content: '1234 5678 1234 5678 1234 5678 1234 5678',
    category: 'Basics',
    difficulty: 'beginner',
    language: 'english'
  },
  {
    id: 'en-b5',
    title: 'Common Words',
    content: 'the and for you that this with have from they',
    category: 'Words',
    difficulty: 'beginner',
    language: 'english'
  },
  {
    id: 'en-b6',
    title: 'Short Sentences',
    content: 'The quick fox jumps. A lazy dog sleeps. The rain falls softly.',
    category: 'Words',
    difficulty: 'beginner',
    language: 'english'
  },
  // Intermediate lessons
  {
    id: 'en-i1',
    title: 'Capitalization',
    content: 'The Quick Brown Fox Jumps Over The Lazy Dog.',
    category: 'Words',
    difficulty: 'intermediate',
    language: 'english'
  },
  {
    id: 'en-i2',
    title: 'Punctuation',
    content: 'Hello, world! How are you? I\'m fine; thanks for asking.',
    category: 'Words',
    difficulty: 'intermediate',
    language: 'english'
  },
  {
    id: 'en-i3',
    title: 'Common Phrases',
    content: 'Thank you very much. Please try again. I would like to help.',
    category: 'Words',
    difficulty: 'intermediate',
    language: 'english'
  },
  // Advanced lessons
  {
    id: 'en-a1',
    title: 'Complex Sentences',
    content: 'Although typing can be difficult at first, with practice and perseverance, your speed and accuracy will improve dramatically over time.',
    category: 'Words',
    difficulty: 'advanced',
    language: 'english'
  },
  {
    id: 'en-a2',
    title: 'Coding Syntax',
    content: 'function typingTest() { const speed = calculateWPM(); return speed; }',
    category: 'Programming',
    difficulty: 'advanced',
    language: 'english'
  },
  {
    id: 'en-g1',
    title: 'Typing Race',
    content: 'Ready, set, go! Type as fast as you can to win the race!',
    category: 'Games',
    difficulty: 'intermediate',
    language: 'english'
  }
];

// Hindi lessons
const hindiLessons: Lesson[] = [
  // Beginner lessons
  {
    id: 'hi-b1',
    title: 'Hindi Home Row',
    content: 'कमल जगत कमल जगत कमल जगत कमल जगत',
    category: 'Basics',
    difficulty: 'beginner',
    language: 'hindi'
  },
  {
    id: 'hi-b2',
    title: 'Hindi Vowels',
    content: 'अ आ इ ई उ ऊ ए ऐ ओ औ अं अः',
    category: 'Basics',
    difficulty: 'beginner',
    language: 'hindi'
  },
  {
    id: 'hi-b3',
    title: 'Hindi Consonants',
    content: 'क ख ग घ ङ च छ ज झ ञ ट ठ',
    category: 'Basics',
    difficulty: 'beginner',
    language: 'hindi'
  },
  {
    id: 'hi-b4',
    title: 'Simple Hindi Words',
    content: 'नमस्ते धन्यवाद शुभ प्रभात',
    category: 'Words',
    difficulty: 'beginner',
    language: 'hindi'
  },
  // Intermediate lessons
  {
    id: 'hi-i1',
    title: 'Hindi Phrases',
    content: 'आपका दिन शुभ हो। मैं ठीक हूँ। आप कैसे हैं?',
    category: 'Words',
    difficulty: 'intermediate',
    language: 'hindi'
  },
  {
    id: 'hi-i2',
    title: 'Hindi Sentences',
    content: 'हिंदी एक बहुत सुंदर भाषा है। टाइपिंग अभ्यास करना महत्वपूर्ण है।',
    category: 'Words',
    difficulty: 'intermediate',
    language: 'hindi'
  },
  // Advanced lessons
  {
    id: 'hi-a1',
    title: 'Complex Hindi Text',
    content: 'आज का दिन बहुत अच्छा है। मैं बाहर जाकर टहलना चाहता हूँ। क्या आप मेरे साथ चलेंगे?',
    category: 'Words',
    difficulty: 'advanced',
    language: 'hindi'
  }
];

// Combine lessons
const allLessons = [...englishLessons, ...hindiLessons];

type TypingStats = {
  wpm: number;
  accuracy: number;
  elapsedTime: number;
};

type TypingContextType = {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  typingText: string;
  userInput: string;
  typedCharacters: ('correct' | 'incorrect' | 'untyped')[];
  currentPosition: number;
  isTypingComplete: boolean;
  isTypingStarted: boolean;
  stats: TypingStats;
  selectedLanguage: 'english' | 'hindi';
  currentKey: string | null;
  setUserInput: (input: string) => void;
  selectLesson: (lesson: Lesson) => void;
  resetPractice: () => void;
  startGame: () => void;
  setSelectedLanguage: (language: 'english' | 'hindi') => void;
};

const TypingContext = createContext<TypingContextType | null>(null);

export const TypingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lessons, setLessons] = useState<Lesson[]>(allLessons);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [typingText, setTypingText] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [typedCharacters, setTypedCharacters] = useState<('correct' | 'incorrect' | 'untyped')[]>([]);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [isTypingStarted, setIsTypingStarted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [stats, setStats] = useState<TypingStats>({ wpm: 0, accuracy: 0, elapsedTime: 0 });
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'hindi'>('english');
  const [currentKey, setCurrentKey] = useState<string | null>(null);

  // Filter lessons by language
  useEffect(() => {
    setLessons(allLessons.filter(lesson => lesson.language === selectedLanguage));
    // If changing language, reset current lesson if it's from a different language
    if (currentLesson && currentLesson.language !== selectedLanguage) {
      setCurrentLesson(null);
      resetPractice();
    }
  }, [selectedLanguage]);

  const selectLesson = useCallback((lesson: Lesson) => {
    setCurrentLesson(lesson);
    setTypingText(lesson.content);
    resetPractice();
  }, []);

  const resetPractice = useCallback(() => {
    setUserInput('');
    setCurrentPosition(0);
    setIsTypingComplete(false);
    setIsTypingStarted(false);
    setStartTime(null);
    setStats({ wpm: 0, accuracy: 0, elapsedTime: 0 });
    setTypedCharacters(Array(typingText.length).fill('untyped'));
    setCurrentKey(null);
  }, [typingText]);

  const startGame = useCallback(() => {
    if (!currentLesson) return;
    resetPractice();
    setIsTypingStarted(true);
    setStartTime(Date.now());
  }, [currentLesson, resetPractice]);

  // Update typed characters and progress
  useEffect(() => {
    if (!isTypingStarted || isTypingComplete) return;

    const newTypedCharacters = [...typedCharacters];
    let i = 0;
    let incorrectCount = 0;
    
    for (i = 0; i < userInput.length && i < typingText.length; i++) {
      if (userInput[i] === typingText[i]) {
        newTypedCharacters[i] = 'correct';
      } else {
        newTypedCharacters[i] = 'incorrect';
        incorrectCount++;
      }
    }
    
    setTypedCharacters(newTypedCharacters);
    setCurrentPosition(userInput.length);
    
    // Set current key for finger highlighting
    if (userInput.length < typingText.length) {
      setCurrentKey(typingText[userInput.length]);
    } else {
      setCurrentKey(null);
    }

    // Check if typing is complete
    if (userInput.length >= typingText.length) {
      setIsTypingComplete(true);
    }

    // Calculate stats
    if (startTime && userInput.length > 0) {
      const timeElapsed = (Date.now() - startTime) / 1000; // seconds
      const wordsTyped = userInput.length / 5; // Approximating word length as 5 characters
      const wpm = Math.round((wordsTyped / timeElapsed) * 60);
      const accuracy = Math.round(((userInput.length - incorrectCount) / userInput.length) * 100);

      setStats({
        wpm,
        accuracy,
        elapsedTime: timeElapsed
      });
    }
  }, [userInput, typingText, typedCharacters, isTypingStarted, isTypingComplete, startTime]);

  const contextValue = {
    lessons,
    currentLesson,
    typingText,
    userInput,
    typedCharacters,
    currentPosition,
    isTypingComplete,
    isTypingStarted,
    stats,
    selectedLanguage,
    currentKey,
    setUserInput,
    selectLesson,
    resetPractice,
    startGame,
    setSelectedLanguage
  };

  return (
    <TypingContext.Provider value={contextValue}>
      {children}
    </TypingContext.Provider>
  );
};

export const useTyping = () => {
  const context = useContext(TypingContext);
  if (!context) {
    throw new Error('useTyping must be used within a TypingProvider');
  }
  return context;
};
