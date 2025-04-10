
import React, { useEffect, useRef } from 'react';
import { useTyping } from '@/contexts/TypingContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, RefreshCw } from 'lucide-react';
import { VirtualKeyboard } from './VirtualKeyboard';
import { HandVisualizer } from './HandVisualizer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const TypingPractice: React.FC = () => {
  const { 
    typingText, 
    userInput, 
    setUserInput, 
    typedCharacters, 
    currentPosition,
    stats, 
    isTypingComplete,
    isTypingStarted,
    currentLesson,
    resetPractice,
    startGame,
    selectedLanguage,
    setSelectedLanguage
  } = useTyping();
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isTypingStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTypingStarted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTypingStarted) return;
    setUserInput(e.target.value);
  };

  const renderTypingText = () => {
    return typingText.split('').map((char, index) => {
      let className = 'typing-text';
      
      if (index === currentPosition && !isTypingComplete) {
        className += ' typing-text-current';
      } else if (typedCharacters[index] === 'correct') {
        className += ' typing-text-correct';
      } else if (typedCharacters[index] === 'incorrect') {
        className += ' typing-text-incorrect';
      }
      
      return (
        <span key={index} className={className}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  const progressPercentage = typingText 
    ? (typedCharacters.filter(status => status === 'correct').length / typingText.length) * 100 
    : 0;

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">
              {currentLesson?.title || 'Select a Lesson'}
            </h1>
            <p className="text-muted-foreground">
              {currentLesson?.category} - {currentLesson?.difficulty.charAt(0).toUpperCase() + currentLesson?.difficulty.slice(1)}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Select 
              value={selectedLanguage} 
              onValueChange={(value) => setSelectedLanguage(value as 'english' | 'hindi')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>

            {isTypingStarted ? (
              <Button 
                variant="outline" 
                onClick={resetPractice}
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
                <PlayCircle className="h-4 w-4" />
                {isTypingComplete ? 'Try Again' : 'Start Typing'}
              </Button>
            )}
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-medium text-sm">Progress:</span>
              <Progress value={progressPercentage} className="w-48" />
              <span className="text-sm">{Math.round(progressPercentage)}%</span>
            </div>

            <div className="flex gap-3">
              <Badge variant="outline" className="gap-1 py-1 px-3 font-normal">
                <span className="font-semibold">{stats.wpm}</span> WPM
              </Badge>
              <Badge variant="outline" className="gap-1 py-1 px-3 font-normal">
                <span className="font-semibold">{stats.accuracy}</span>% Accuracy
              </Badge>
              <Badge variant="outline" className="gap-1 py-1 px-3 font-normal">
                <span className="font-semibold">{Math.round(stats.elapsedTime)}</span>s Time
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            {!isTypingStarted && !isTypingComplete ? (
              <div className="text-center p-8">
                <p className="text-muted-foreground mb-4">
                  {currentLesson 
                    ? "Click \"Start Typing\" to begin the lesson."
                    : "Select a lesson from the sidebar or click \"Start Typing\" to begin with the first lesson."}
                </p>
                {!currentLesson && (
                  <div className="mb-4 bg-primary/5 p-4 rounded-lg border border-primary/10">
                    <h3 className="font-medium mb-2">Hand Position Guide</h3>
                    <p className="text-sm text-muted-foreground">
                      Place your left fingers on ASDF and right fingers on JKL; keys. This is the home row position.
                      Each finger is responsible for specific keys on the keyboard.
                    </p>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  Keep your fingers on the home row (ASDF JKL;) and try to type without looking at the keyboard.
                </p>
              </div>
            ) : (
              <>
                <div className="p-4 bg-secondary/50 rounded-lg mb-8 min-h-[100px] relative">
                  <div className="typing-text">{renderTypingText()}</div>
                </div>
              
                <div className="relative mb-8">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    disabled={isTypingComplete || !isTypingStarted}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                    placeholder={isTypingStarted ? "Type here..." : "Click Start to begin typing"}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                </div>

                <div className="flex flex-col items-center gap-8 mb-4">
                  <VirtualKeyboard className="mb-4" />
                  <HandVisualizer />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-md font-medium">Keyboard Tips</h3>
            </CardHeader>
            <CardContent className="text-sm">
              <ul className="list-disc pl-4 space-y-1">
                <li>Keep your fingers on the home row (ASDF JKL;)</li>
                <li>Use your left pinky for 'A', left ring finger for 'S', etc.</li>
                <li>Try to type without looking at the keyboard</li>
                <li>Focus on accuracy first, then speed</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-md font-medium">Stats Explained</h3>
            </CardHeader>
            <CardContent className="text-sm">
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>WPM:</strong> Words Per Minute (average typing speed)</li>
                <li><strong>Accuracy:</strong> Percentage of correctly typed characters</li>
                <li><strong>Time:</strong> Total elapsed time for the lesson</li>
                <li>Professional typists average 65-75 WPM with high accuracy</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
