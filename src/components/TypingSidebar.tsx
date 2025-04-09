
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Lesson, useTyping } from '@/contexts/TypingContext';
import { Keyboard, Award, BookOpen, Gamepad2, Github, CheckCircle2, PanelRightClose } from 'lucide-react';

type DifficultyMap = {
  [key: string]: {
    icon: React.ElementType;
    label: string;
    items: Lesson[];
  };
};

export const TypingSidebar: React.FC = () => {
  const { lessons, selectLesson, currentLesson, selectedLanguage } = useTyping();

  // Group lessons by difficulty
  const difficulties = lessons.reduce<DifficultyMap>((acc, lesson) => {
    const difficulty = lesson.difficulty;
    
    if (!acc[difficulty]) {
      let icon: React.ElementType = Keyboard;
      let label = 'Unknown';
      
      if (difficulty === 'beginner') {
        icon = CheckCircle2;
        label = 'Beginner';
      } else if (difficulty === 'intermediate') {
        icon = Award;
        label = 'Intermediate';
      } else if (difficulty === 'advanced') {
        icon = PanelRightClose;
        label = 'Advanced';
      }
      
      acc[difficulty] = {
        icon,
        label,
        items: [],
      };
    }
    
    acc[difficulty].items.push(lesson);
    return acc;
  }, {});

  // Separate lessons by category within each difficulty
  const getGroupedLessons = (difficultyLessons: Lesson[]) => {
    return difficultyLessons.reduce<Record<string, Lesson[]>>((acc, lesson) => {
      if (!acc[lesson.category]) {
        acc[lesson.category] = [];
      }
      acc[lesson.category].push(lesson);
      return acc;
    }, {});
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 px-2">
        <Keyboard className="h-6 w-6" />
        <span className="font-bold text-lg">KeyQuill</span>
        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-auto">
          {selectedLanguage === 'english' ? 'EN' : 'HI'}
        </span>
      </SidebarHeader>
      <SidebarContent className="h-[calc(100vh-120px)]">
        {Object.entries(difficulties).map(([difficulty, { icon: DifficultyIcon, label, items }]) => (
          <SidebarGroup key={difficulty}>
            <SidebarGroupLabel className="flex items-center gap-2">
              <DifficultyIcon className="h-4 w-4" />
              {label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {Object.entries(getGroupedLessons(items)).map(([category, categoryLessons]) => (
                <div key={category} className="mb-2">
                  <div className="text-xs text-sidebar-foreground/70 px-2 py-1">{category}</div>
                  <SidebarMenu>
                    {categoryLessons.map((lesson) => (
                      <SidebarMenuItem key={lesson.id}>
                        <SidebarMenuButton
                          onClick={() => selectLesson(lesson)}
                          className={
                            currentLesson?.id === lesson.id
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : ""
                          }
                        >
                          <span className="text-sm">{lesson.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </div>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="px-2 py-2">
        <div className="flex items-center text-xs text-sidebar-foreground/80 justify-between">
          <span>KeyQuill - Version 1.0</span>
          <a 
            href="https://github.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-sidebar-foreground"
          >
            <Github className="h-3 w-3" />
            <span>GitHub</span>
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
