
import React, { useState } from 'react';
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
import { Keyboard, Award, BookOpen, Gamepad2, Github, PanelRightClose, Code } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

type CategoryTab = {
  value: string;
  label: string;
  icon: React.ElementType;
  difficulties: string[];
};

// Define the difficulty groupings
const categoryTabs: CategoryTab[] = [
  {
    value: 'beginner',
    label: 'Beginner',
    icon: BookOpen,
    difficulties: ['beginner']
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    icon: Award,
    difficulties: ['intermediate']
  },
  {
    value: 'advanced',
    label: 'Advanced',
    icon: PanelRightClose,
    difficulties: ['advanced']
  },
  {
    value: 'programming',
    label: 'Programming',
    icon: Code,
    difficulties: ['beginner', 'intermediate', 'advanced']
  },
  {
    value: 'games',
    label: 'Games',
    icon: Gamepad2,
    difficulties: ['beginner', 'intermediate', 'advanced']
  }
];

export const TypingSidebar: React.FC = () => {
  const { lessons, selectLesson, currentLesson, selectedLanguage } = useTyping();
  const [activeTab, setActiveTab] = useState<string>('beginner');
  
  // Filter lessons by active tab
  const getFilteredLessons = () => {
    if (activeTab === 'programming') {
      return lessons.filter(lesson => lesson.category === 'Programming');
    } else if (activeTab === 'games') {
      return lessons.filter(lesson => lesson.category === 'Games');
    } else {
      return lessons.filter(lesson => lesson.difficulty === activeTab);
    }
  };
  
  // Group lessons by category within the active tab
  const getGroupedLessons = (filteredLessons: Lesson[]) => {
    return filteredLessons.reduce<Record<string, Lesson[]>>((acc, lesson) => {
      if (!acc[lesson.category]) {
        acc[lesson.category] = [];
      }
      acc[lesson.category].push(lesson);
      return acc;
    }, {});
  };
  
  const filteredLessons = getFilteredLessons();
  const groupedLessons = getGroupedLessons(filteredLessons);

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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full px-2 mb-2">
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
        
        {Object.entries(groupedLessons).length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-sidebar-foreground/70">
            No lessons found in this category.
          </div>
        ) : (
          Object.entries(groupedLessons).map(([category, categoryLessons]) => (
            <SidebarGroup key={category}>
              <SidebarGroupLabel className="flex items-center gap-2">
                {category === 'Games' ? <Gamepad2 className="h-4 w-4" /> : 
                 category === 'Programming' ? <Code className="h-4 w-4" /> : 
                 category === 'Words' ? <BookOpen className="h-4 w-4" /> : 
                 <Keyboard className="h-4 w-4" />}
                {category}
              </SidebarGroupLabel>
              <SidebarGroupContent>
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
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        )}
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
