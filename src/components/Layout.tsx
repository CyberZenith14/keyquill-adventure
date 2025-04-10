
import React from 'react';
import { TypingSidebar } from '@/components/TypingSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import { TypingProvider } from '@/contexts/TypingContext';
import { MobileSidebar } from '@/components/MobileSidebar';

export const Layout: React.FC = () => {
  return (
    <TypingProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <TypingSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="h-14 border-b bg-card flex items-center px-4 lg:px-6">
              <SidebarTrigger className="lg:hidden mr-2" />
              <MobileSidebar />
              <div className="ml-auto flex items-center gap-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
                >
                  GitHub
                </a>
              </div>
            </header>
            <main className="flex-1 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TypingProvider>
  );
};
