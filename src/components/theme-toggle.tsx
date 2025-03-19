'use client';

import * as React from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface ThemeToggleProps {
  variant?: 'icon' | 'full';
}

export function ThemeToggle({ variant = 'icon' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  if (variant === 'full') {
    return (
      <DropdownMenuItem
        className="flex items-center justify-between"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        onSelect={e => e.preventDefault()}
      >
        <div className="flex items-center gap-2">
          <Palette className="size-4" />
          <span>Theme</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuItem>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
