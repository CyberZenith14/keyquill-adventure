
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

// Define lesson types
export interface Lesson {
  id: string;
  title: string;
  category: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  elapsedTime: number;
}

interface TypingContextType {
  currentLesson: Lesson | null;
  lessons: Lesson[];
  typingText: string;
  userInput: string;
  typedCharacters: ('correct' | 'incorrect' | 'untyped')[];
  currentPosition: number;
  stats: TypingStats;
  isTypingComplete: boolean;
  isTypingStarted: boolean;
  setUserInput: (input: string) => void;
  selectLesson: (lesson: Lesson) => void;
  resetPractice: () => void;
  startGame: () => void;
}

const defaultStats: TypingStats = {
  wpm: 0,
  accuracy: 0,
  correctChars: 0,
  incorrectChars: 0,
  totalChars: 0,
  elapsedTime: 0,
};

const lessonsData: Lesson[] = [
  {
    id: 'home-row',
    title: 'Home Row',
    category: 'Basics',
    content: 'asdf jkl; asdf jkl; asdf jkl; fjdk slal fjdk slal fjdk slal',
    difficulty: 'beginner',
  },
  {
    id: 'top-row',
    title: 'Top Row',
    category: 'Basics',
    content: 'qwer tyui qwer tyui qwer tyui rtyu qiwe rtyu qiwe rtyu qiwe',
    difficulty: 'beginner',
  },
  {
    id: 'bottom-row',
    title: 'Bottom Row',
    category: 'Basics',
    content: 'zxcv bnm, zxcv bnm, zxcv bnm, cvbn m,zx cvbn m,zx cvbn m,zx',
    difficulty: 'beginner',
  },
  {
    id: 'common-words',
    title: 'Common Words',
    category: 'Words',
    content: 'the and that have this with from they will some what there when',
    difficulty: 'intermediate',
  },
  {
    id: 'capitalization',
    title: 'Capitalization',
    category: 'Words',
    content: 'The Quick Brown Fox Jumps Over The Lazy Dog. A Fast Black Dog.',
    difficulty: 'intermediate',
  },
  {
    id: 'punctuation',
    title: 'Punctuation',
    category: 'Advanced',
    content: 'Hello, world! How are you? I\'m fine, thank you. Let\'s go!',
    difficulty: 'advanced',
  },
  {
    id: 'numbers',
    title: 'Numbers & Symbols',
    category: 'Advanced',
    content: '1234 5678 90!@ #$% ^&* () _+ -={}',
    difficulty: 'advanced',
  },
  {
    id: 'paragraph',
    title: 'Paragraph Practice',
    category: 'Advanced',
    content: 'The sun was setting behind the mountains, casting a golden glow over the valley. Birds were returning to their nests, singing their evening songs. It was a peaceful end to a busy day.',
    difficulty: 'advanced',
  },
  {
    id: 'speed-game',
    title: 'Speed Game',
    category: 'Games',
    content: 'Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!',
    difficulty: 'advanced',
  },
];

const TypingContext = createContext<TypingContextType | undefined>(undefined);

export const TypingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lessons] = useState<Lesson[]>(lessonsData);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [typingText, setTypingText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [typedCharacters, setTypedCharacters] = useState<('correct' | 'incorrect' | 'untyped')[]>([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [stats, setStats] = useState<TypingStats>(defaultStats);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Initialize with first lesson
  useEffect(() => {
    if (lessons.length > 0 && !currentLesson) {
      selectLesson(lessons[0]);
    }
  }, [lessons]);

  // Process user input
  useEffect(() => {
    if (!typingText || !isTypingStarted) return;
    
    if (!startTime && userInput.length > 0) {
      setStartTime(Date.now());
    }

    const newTypedCharacters = typingText.split('').map((char, index) => {
      if (index >= userInput.length) return 'untyped';
      return userInput[index] === char ? 'correct' : 'incorrect';
    });

    setTypedCharacters(newTypedCharacters);
    setCurrentPosition(userInput.length);

    // Calculate stats
    const correctChars = newTypedCharacters.filter(status => status === 'correct').length;
    const incorrectChars = newTypedCharacters.filter(status => status === 'incorrect').length;
    const totalChars = typingText.length;
    const accuracy = totalChars > 0 ? (correctChars / (correctChars + incorrectChars)) * 100 : 0;

    let wpm = 0;
    if (startTime) {
      const elapsedTimeInMinutes = (Date.now() - startTime) / 1000 / 60;
      if (elapsedTimeInMinutes > 0) {
        // Standard calculation: 5 characters = 1 word
        wpm = Math.round((correctChars / 5) / elapsedTimeInMinutes);
      }
    }

    setStats({
      wpm,
      accuracy: Math.round(accuracy),
      correctChars,
      incorrectChars,
      totalChars,
      elapsedTime: startTime ? (Date.now() - startTime) / 1000 : 0,
    });

    // Check if typing is complete
    if (userInput.length === typingText.length) {
      setIsTypingComplete(true);
      toast({
        title: "Lesson completed!",
        description: `WPM: ${wpm}, Accuracy: ${Math.round(accuracy)}%`,
      });
    }
  }, [userInput, typingText, startTime, isTypingStarted]);

  const selectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setTypingText(lesson.content);
    resetPractice();
  };

  const resetPractice = () => {
    setUserInput('');
    setTypedCharacters(typingText.split('').map(() => 'untyped'));
    setCurrentPosition(0);
    setStats(defaultStats);
    setIsTypingComplete(false);
    setIsTypingStarted(false);
    setStartTime(null);
  };

  const startGame = () => {
    setIsTypingStarted(true);
  };

  return (
    <TypingContext.Provider
      value={{
        currentLesson,
        lessons,
        typingText,
        userInput,
        typedCharacters,
        currentPosition,
        stats,
        isTypingComplete,
        isTypingStarted,
        setUserInput,
        selectLesson,
        resetPractice,
        startGame,
      }}
    >
      {children}
    </TypingContext.Provider>
  );
};

export const useTyping = () => {
  const context = useContext(TypingContext);
  if (context === undefined) {
    throw new Error('useTyping must be used within a TypingProvider');
  }
  return context;
};
