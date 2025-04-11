
import React, { useState, useEffect } from 'react';
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
} from '@/components/ui/sidebar';
import { Lesson, useTyping } from '@/contexts/TypingContext';
import { Keyboard, Award, BookOpen, Gamepad2, Github, PanelRightClose, Code, FileText } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type CategoryTab = {
  value: string;
  label: string;
  icon: React.ElementType;
};

// Define the category tabs
const categoryTabs: CategoryTab[] = [
  {
    value: 'beginner',
    label: 'Beginner',
    icon: BookOpen,
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    icon: Award,
  },
  {
    value: 'advanced',
    label: 'Advanced',
    icon: PanelRightClose,
  },
  {
    value: 'paragraphs',
    label: 'Paragraphs',
    icon: FileText,
  },
  {
    value: 'programming',
    label: 'Programming',
    icon: Code,
  },
  {
    value: 'games',
    label: 'Games',
    icon: Gamepad2,
  }
];

export const TypingSidebar: React.FC<{ drawerMode?: boolean }> = ({ drawerMode = false }) => {
  const { lessons, selectLesson, currentLesson, selectedLanguage, isTypingStarted } = useTyping();
  const [activeTab, setActiveTab] = useState<string>('beginner');
  
  // Group lessons by category and difficulty
  const groupedLessons = lessons.reduce<Record<string, Record<string, Lesson[]>>>((acc, lesson) => {
    if (!acc[lesson.category]) {
      acc[lesson.category] = {};
    }
    
    if (!acc[lesson.category][lesson.difficulty]) {
      acc[lesson.category][lesson.difficulty] = [];
    }
    
    acc[lesson.category][lesson.difficulty].push(lesson);
    return acc;
  }, {});
  
  // Scroll to section when tab is clicked
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Set first lesson as current if none selected
  useEffect(() => {
    if (!currentLesson && lessons.length > 0) {
      const beginnerLessons = lessons.filter(
        lesson => lesson.difficulty === 'beginner'
      );
      if (beginnerLessons.length > 0) {
        selectLesson(beginnerLessons[0]);
      }
    }
  }, [lessons, currentLesson, selectLesson]);

  // Handle lesson selection with confirmation if typing is in progress
  const handleLessonSelect = (lesson: Lesson) => {
    if (isTypingStarted) {
      if (window.confirm('Are you sure you want to switch lessons? Current progress will be lost.')) {
        selectLesson(lesson);
      }
    } else {
      selectLesson(lesson);
    }
  };

  // Content for sidebar that works in both normal and drawer mode
  const SidebarContents = () => (
    <>
      <SidebarHeader className={`flex items-center gap-2 px-2 ${drawerMode ? 'hidden' : ''}`}>
        <Keyboard className="h-6 w-6" />
        <span className="font-bold text-lg">KeyQuill</span>
        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-auto">
          {selectedLanguage === 'english' ? 'EN' : 'HI'}
        </span>
      </SidebarHeader>
      
      <SidebarContent className={drawerMode ? "h-full" : "h-[calc(100vh-120px)]"}>
        <Tabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value);
          scrollToSection(value);
        }} className="w-full px-2 mb-2">
          <TabsList className="flex w-full justify-between">
            {categoryTabs.map((tab) => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="flex gap-1 items-center text-xs"
              >
                <tab.icon className="h-3 w-3" />
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        {/* Beginner Section */}
        <div id="beginner">
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 bg-muted/50 sticky top-0 z-10">
              <BookOpen className="h-4 w-4" />
              Beginner Lessons
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {Object.entries(groupedLessons)
                .filter(([_, difficultyGroups]) => 'beginner' in difficultyGroups)
                .map(([category, difficultyGroups]) => (
                  <SidebarMenu key={`${category}-beginner`}>
                    <SidebarMenuItem>
                      <div className="text-xs font-medium py-1 px-2 text-muted-foreground">{category}</div>
                    </SidebarMenuItem>
                    {difficultyGroups['beginner'].map((lesson) => (
                      <SidebarMenuItem key={lesson.id}>
                        <SidebarMenuButton
                          onClick={() => handleLessonSelect(lesson)}
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
                ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        
        {/* Intermediate Section */}
        <div id="intermediate">
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 bg-muted/50 sticky top-0 z-10">
              <Award className="h-4 w-4" />
              Intermediate Lessons
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {Object.entries(groupedLessons)
                .filter(([_, difficultyGroups]) => 'intermediate' in difficultyGroups)
                .map(([category, difficultyGroups]) => (
                  <SidebarMenu key={`${category}-intermediate`}>
                    <SidebarMenuItem>
                      <div className="text-xs font-medium py-1 px-2 text-muted-foreground">{category}</div>
                    </SidebarMenuItem>
                    {difficultyGroups['intermediate'].map((lesson) => (
                      <SidebarMenuItem key={lesson.id}>
                        <SidebarMenuButton
                          onClick={() => handleLessonSelect(lesson)}
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
                ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        
        {/* Advanced Section */}
        <div id="advanced">
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 bg-muted/50 sticky top-0 z-10">
              <PanelRightClose className="h-4 w-4" />
              Advanced Lessons
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {Object.entries(groupedLessons)
                .filter(([_, difficultyGroups]) => 'advanced' in difficultyGroups)
                .map(([category, difficultyGroups]) => (
                  <SidebarMenu key={`${category}-advanced`}>
                    <SidebarMenuItem>
                      <div className="text-xs font-medium py-1 px-2 text-muted-foreground">{category}</div>
                    </SidebarMenuItem>
                    {difficultyGroups['advanced'].map((lesson) => (
                      <SidebarMenuItem key={lesson.id}>
                        <SidebarMenuButton
                          onClick={() => handleLessonSelect(lesson)}
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
                ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        
        {/* Paragraphs Section */}
        <div id="paragraphs">
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 bg-muted/50 sticky top-0 z-10">
              <FileText className="h-4 w-4" />
              Paragraph Practice
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {Object.entries(groupedLessons)
                .filter(([category]) => category === 'Paragraphs')
                .map(([category, difficultyGroups]) => (
                  Object.entries(difficultyGroups).map(([difficulty, lessons]) => (
                    <SidebarMenu key={`${category}-${difficulty}`}>
                      <SidebarMenuItem>
                        <div className="text-xs font-medium py-1 px-2 text-muted-foreground">
                          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </div>
                      </SidebarMenuItem>
                      {lessons.map((lesson) => (
                        <SidebarMenuItem key={lesson.id}>
                          <SidebarMenuButton
                            onClick={() => handleLessonSelect(lesson)}
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
                  ))
                ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        
        {/* Programming Section */}
        <div id="programming">
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 bg-muted/50 sticky top-0 z-10">
              <Code className="h-4 w-4" />
              Programming Lessons
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {Object.entries(groupedLessons)
                .filter(([category]) => category === 'Programming')
                .map(([category, difficultyGroups]) => (
                  Object.entries(difficultyGroups).map(([difficulty, lessons]) => (
                    <SidebarMenu key={`${category}-${difficulty}`}>
                      <SidebarMenuItem>
                        <div className="text-xs font-medium py-1 px-2 text-muted-foreground">
                          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </div>
                      </SidebarMenuItem>
                      {lessons.map((lesson) => (
                        <SidebarMenuItem key={lesson.id}>
                          <SidebarMenuButton
                            onClick={() => handleLessonSelect(lesson)}
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
                  ))
                ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        
        {/* Games Section */}
        <div id="games">
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 bg-muted/50 sticky top-0 z-10">
              <Gamepad2 className="h-4 w-4" />
              Games Lessons
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {Object.entries(groupedLessons)
                .filter(([category]) => category === 'Games')
                .map(([category, difficultyGroups]) => (
                  Object.entries(difficultyGroups).map(([difficulty, lessons]) => (
                    <SidebarMenu key={`${category}-${difficulty}`}>
                      <SidebarMenuItem>
                        <div className="text-xs font-medium py-1 px-2 text-muted-foreground">
                          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </div>
                      </SidebarMenuItem>
                      {lessons.map((lesson) => (
                        <SidebarMenuItem key={lesson.id}>
                          <SidebarMenuButton
                            onClick={() => handleLessonSelect(lesson)}
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
                  ))
                ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
      
      <SidebarFooter className={`px-2 py-2 ${drawerMode ? 'hidden' : ''}`}>
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
    </>
  );

  // If in drawer mode, just return the contents without the Sidebar wrapper
  if (drawerMode) {
    return <SidebarContents />;
  }

  // Normal sidebar for larger screens
  return (
    <Sidebar>
      <SidebarContents />
    </Sidebar>
  );
};
