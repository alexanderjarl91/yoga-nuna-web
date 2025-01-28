'use client';

import { Search, Heart, Bot as Lotus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const { signOut } = useAuth();

  return (
    <header className="fixed w-full bg-gradient-to-b from-background/90 to-transparent z-50 backdrop-blur-lg px-4 md:px-12">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4 md:gap-8">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-emerald-500">
              YogaApp
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <Search className="w-5 h-5 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
          <Heart className="w-5 h-5 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
          <ThemeToggle />
          <Button 
            variant="ghost" 
            onClick={signOut} 
            className="hover:text-gray-600 dark:hover:text-gray-300 hidden md:inline-flex"
          >
            Útskrá
          </Button>
        </div>
      </div>
    </header>
  );
}