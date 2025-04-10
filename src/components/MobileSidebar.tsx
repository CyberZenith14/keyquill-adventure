
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { TypingSidebar } from '@/components/TypingSidebar';

export const MobileSidebar = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 md:hidden">
          <Menu className="h-4 w-4" />
          <span>Lessons</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[calc(100dvh-3rem)] max-h-none p-0">
        <div className="pt-6 pb-4 h-full overflow-hidden flex flex-col">
          <div className="flex justify-between items-center px-6 pb-2">
            <h2 className="text-lg font-semibold">Lessons</h2>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DrawerClose>
          </div>
          <div className="flex-1 overflow-auto">
            <TypingSidebar drawerMode={true} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
