
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Timer, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const GAME_DURATION = 30; // seconds
const WORD_LIST = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'
];

export const TypingGame: React.FC = () => {
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateWordList = () => {
    const randomWords = Array.from({ length: 50 }, () => 
      WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    );
    setCurrentWords(randomWords);
  };

  const startGame = () => {
    generateWordList();
    setUserInput('');
    setCorrectWords([]);
    setIsGameActive(true);
    setTimeLeft(GAME_DURATION);
    setScore(0);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const endGame = () => {
    setIsGameActive(false);
    
    // Calculate WPM
    const wpm = Math.round((correctWords.length / GAME_DURATION) * 60);
    
    toast({
      title: "Game Over!",
      description: `You typed ${correctWords.length} words in ${GAME_DURATION} seconds (${wpm} WPM)`,
    });
    
    setScore(wpm);
  };

  useEffect(() => {
    if (isGameActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            endGame();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isGameActive]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isGameActive) return;
    
    const value = e.target.value;
    setUserInput(value);
    
    // Check if user typed a space (completed a word)
    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      
      // If the typed word matches the current word
      if (typedWord === currentWords[0]) {
        const updatedCorrectWords = [...correctWords, typedWord];
        setCorrectWords(updatedCorrectWords);
      }
      
      // Remove the first word and shift the list
      setCurrentWords(prevWords => prevWords.slice(1));
      setUserInput('');
      
      // Generate more words if running low
      if (currentWords.length < 10) {
        const additionalWords = Array.from({ length: 20 }, () => 
          WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
        );
        setCurrentWords(prevWords => [...prevWords, ...additionalWords]);
      }
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Speed Typing Game</h1>
            <p className="text-muted-foreground">
              Type as many words as you can in {GAME_DURATION} seconds
            </p>
          </div>
          
          <div className="flex gap-3">
            {isGameActive ? (
              <Button 
                variant="outline" 
                onClick={() => {
                  if (timerRef.current) {
                    clearInterval(timerRef.current);
                  }
                  setIsGameActive(false);
                }}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </Button>
            ) : (
              <Button 
                onClick={startGame}
                className="flex items-center gap-2"
              >
                <Timer className="h-4 w-4" />
                Start Game
              </Button>
            )}
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-medium text-sm">Time Left:</span>
              <Progress value={(timeLeft / GAME_DURATION) * 100} className="w-48" />
              <span className="text-sm">{timeLeft}s</span>
            </div>

            <div className="flex gap-3">
              {score > 0 && (
                <Badge variant="outline" className="gap-1 py-1 px-3 font-normal">
                  <Trophy className="h-3 w-3 mr-1 text-yellow-500" />
                  <span className="font-semibold">{score}</span> WPM
                </Badge>
              )}
              <Badge variant="outline" className="gap-1 py-1 px-3 font-normal">
                <span className="font-semibold">{correctWords.length}</span> Words
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            {!isGameActive && correctWords.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-muted-foreground mb-4">
                  Click "Start Game" to begin. Type as many words as you can before the timer runs out!
                </p>
                <p className="text-sm text-muted-foreground">
                  Press space after each word to submit it and move to the next word.
                </p>
              </div>
            ) : (
              <>
                <div className="p-4 bg-secondary/50 rounded-lg mb-8 min-h-[100px] relative">
                  <div className="flex flex-wrap gap-2 font-mono text-xl">
                    <span className="typing-text typing-text-current">{currentWords[0]}</span>
                    {currentWords.slice(1, 10).map((word, index) => (
                      <span key={index} className="typing-text">{word}</span>
                    ))}
                  </div>
                </div>
              
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    disabled={!isGameActive}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                    placeholder={isGameActive ? "Type here..." : "Click Start to begin the game"}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {correctWords.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Words Typed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {correctWords.map((word, index) => (
                  <Badge key={index} variant="secondary">{word}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
