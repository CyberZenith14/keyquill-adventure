
import React, { useEffect, useRef, useState } from 'react';
import { useTyping } from '@/contexts/TypingContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, RefreshCw, Repeat, Volume2, VolumeX } from 'lucide-react';
import { VirtualKeyboard } from './VirtualKeyboard';
import { HandVisualizer } from './HandVisualizer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

export const TypingPractice: React.FC = () => {
  const { toast } = useToast();
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
    setSelectedLanguage,
    loadNextLesson
  } = useTyping();
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const keyPressAudioRef = useRef<HTMLAudioElement | null>(null);
  const isMobile = useIsMobile();
  const isFirstLesson = currentLesson?.id === 'en-pos' || currentLesson?.id === 'hi-pos' || (!currentLesson && true);

  useEffect(() => {
    if (isTypingStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTypingStarted]);

  useEffect(() => {
    // Create audio element for key press sounds
    const audio = new Audio('/keypress.mp3');
    audio.volume = 0.3;
    keyPressAudioRef.current = audio;
    
    return () => {
      keyPressAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    // Auto-advance to next lesson when typing is complete
    if (isTypingComplete && autoAdvance) {
      const timer = setTimeout(() => {
        loadNextLesson();
        toast({
          title: "Lesson completed!",
          description: "Moving to the next lesson...",
        });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isTypingComplete, autoAdvance, loadNextLesson, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTypingStarted) return;
    
    // Play sound effect if enabled
    if (soundEnabled && keyPressAudioRef.current) {
      const audioClone = keyPressAudioRef.current.cloneNode() as HTMLAudioElement;
      audioClone.play().catch(err => console.error("Error playing sound:", err));
    }
    
    setUserInput(e.target.value);
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    toast({
      title: `Sound ${soundEnabled ? 'disabled' : 'enabled'}`,
      description: `Typing sounds are now ${soundEnabled ? 'off' : 'on'}.`,
    });
  };

  const toggleAutoAdvance = () => {
    setAutoAdvance(prev => !prev);
    toast({
      title: `Auto advance ${autoAdvance ? 'disabled' : 'enabled'}`,
      description: `Lessons will ${autoAdvance ? 'not' : 'now'} advance automatically.`,
    });
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
    <div className="w-full px-2 sm:px-4 py-4 sm:py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              {currentLesson?.title || 'Select a Lesson'}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              {currentLesson?.category} - {currentLesson?.difficulty.charAt(0).toUpperCase() + currentLesson?.difficulty.slice(1)}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Select 
              value={selectedLanguage} 
              onValueChange={(value) => setSelectedLanguage(value as 'english' | 'hindi')}
            >
              <SelectTrigger className="w-[140px] sm:w-[180px] h-9">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              onClick={toggleSound}
              className="flex items-center gap-2 h-9"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              {!isMobile && "Sound"}
            </Button>
            
            <Button
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              onClick={toggleAutoAdvance}
              className={`flex items-center gap-2 h-9 ${!autoAdvance ? "bg-primary/10" : ""}`}
            >
              <Repeat className="h-4 w-4" />
              {!isMobile && "Repeat"}
            </Button>

            {isTypingStarted ? (
              <Button 
                variant="outline" 
                onClick={resetPractice}
                className="flex items-center gap-2 h-9"
                size={isMobile ? "sm" : "default"}
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </Button>
            ) : (
              <Button 
                onClick={startGame}
                className="flex items-center gap-2 h-9"
                size={isMobile ? "sm" : "default"}
              >
                <PlayCircle className="h-4 w-4" />
                {isTypingComplete ? 'Try Again' : 'Start Typing'}
              </Button>
            )}
          </div>
        </div>

        <Card className="mb-4 sm:mb-6">
          <CardHeader className="pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-medium text-xs sm:text-sm">Progress:</span>
              <Progress value={progressPercentage} className="w-24 sm:w-48" />
              <span className="text-xs sm:text-sm">{Math.round(progressPercentage)}%</span>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Badge variant="outline" className="gap-1 py-1 px-2 sm:px-3 font-normal text-xs">
                <span className="font-semibold">{stats.wpm}</span> WPM
              </Badge>
              <Badge variant="outline" className="gap-1 py-1 px-2 sm:px-3 font-normal text-xs">
                <span className="font-semibold">{stats.accuracy}</span>% Accuracy
              </Badge>
              <Badge variant="outline" className="gap-1 py-1 px-2 sm:px-3 font-normal text-xs">
                <span className="font-semibold">{Math.round(stats.elapsedTime)}</span>s Time
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-8">
            {!isTypingStarted && !isTypingComplete ? (
              <div className="text-center p-4 sm:p-8">
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  {currentLesson 
                    ? "Click \"Start Typing\" to begin the lesson."
                    : "Select a lesson from the sidebar or click \"Start Typing\" to begin with the first lesson."}
                </p>
                {isFirstLesson && (
                  <div className="mb-4 bg-primary/5 p-3 sm:p-4 rounded-lg border border-primary/10">
                    <h3 className="font-medium mb-2 text-sm sm:text-base">Hand Position Guide</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                      Place your left fingers on ASDF and right fingers on JKL; keys. This is the home row position.
                      Each finger is responsible for specific keys on the keyboard.
                    </p>
                    <div className="flex justify-center">
                      <img 
                        src="/keyboard-guide.jpg" 
                        alt="Keyboard with hand position" 
                        className="rounded-lg max-w-full h-auto mx-auto max-h-[220px] shadow-md" 
                      />
                    </div>
                  </div>
                )}
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Keep your fingers on the home row (ASDF JKL;) and try to type without looking at the keyboard.
                </p>
              </div>
            ) : (
              <>
                <div className="p-2 sm:p-4 bg-secondary/50 rounded-lg mb-4 sm:mb-8 min-h-[80px] sm:min-h-[100px] relative">
                  <div className="typing-text text-sm sm:text-base">{renderTypingText()}</div>
                </div>
              
                <div className="relative mb-4 sm:mb-8">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    disabled={isTypingComplete || !isTypingStarted}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-sm sm:text-base"
                    placeholder={isTypingStarted ? "Type here..." : "Click Start to begin typing"}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                </div>

                <div className="flex flex-col items-center gap-4 sm:gap-8 mb-4">
                  <VirtualKeyboard className="mb-2 sm:mb-4 w-full overflow-x-auto" />
                  {!isMobile && <HandVisualizer />}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-sm sm:text-md font-medium">Keyboard Tips</h3>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm">
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
              <h3 className="text-sm sm:text-md font-medium">Stats Explained</h3>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm">
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
