
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
import { Keyboard, Award, BookOpen, Gamepad2, Github } from 'lucide-react';

type CategoryMap = {
  [key: string]: {
    icon: React.ElementType;
    items: Lesson[];
  };
};

export const TypingSidebar: React.FC = () => {
  const { lessons, selectLesson, currentLesson } = useTyping();

  // Group lessons by category
  const categories = lessons.reduce<CategoryMap>((acc, lesson) => {
    if (!acc[lesson.category]) {
      const icon = lesson.category === 'Basics' 
        ? Keyboard 
        : lesson.category === 'Words' 
        ? BookOpen 
        : lesson.category === 'Games' 
        ? Gamepad2 
        : Award;

      acc[lesson.category] = {
        icon,
        items: [],
      };
    }
    acc[lesson.category].items.push(lesson);
    return acc;
  }, {});

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 px-2">
        <Keyboard className="h-6 w-6" />
        <span className="font-bold text-lg">KeyQuill</span>
      </SidebarHeader>
      <SidebarContent className="h-[calc(100vh-120px)]">
        {Object.entries(categories).map(([category, { icon: Icon, items }]) => (
          <SidebarGroup key={category}>
            <SidebarGroupLabel className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {category}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((lesson) => (
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
                      <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
                        lesson.difficulty === 'beginner' 
                          ? 'bg-green-200 text-green-800' 
                          : lesson.difficulty === 'intermediate'
                          ? 'bg-blue-200 text-blue-800'
                          : 'bg-purple-200 text-purple-800'
                      }`}>
                        {lesson.difficulty.charAt(0).toUpperCase()}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
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
