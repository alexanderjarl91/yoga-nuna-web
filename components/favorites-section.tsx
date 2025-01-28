'use client';

import { useRef, useState } from 'react';
import { Play, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { VideoModal } from './video-modal';

interface FavoriteSession {
  id: number;
  title: string;
  image: string;
  duration: string;
  level: string;
}

const favoriteSessions: FavoriteSession[] = [
  {
    id: 1,
    title: 'Morgunflæði',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60',
    duration: '20 mín',
    level: 'Öll stig'
  },
  {
    id: 2,
    title: 'Kvöldslökun',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60',
    duration: '15 mín',
    level: 'Byrjendur'
  },
  {
    id: 3,
    title: 'Kraftmikið flæði',
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800&auto=format&fit=crop&q=60',
    duration: '30 mín',
    level: 'Miðstig'
  }
];

export function FavoritesSection() {
  const [favorites, setFavorites] = useState(favoriteSessions);
  const [selectedSession, setSelectedSession] = useState<FavoriteSession | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRemove = () => {
    if (selectedSession) {
      setFavorites(favorites.filter(session => session.id !== selectedSession.id));
      setIsRemoveDialogOpen(false);
      setSelectedSession(null);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = container.clientWidth;
      const newPosition = direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="mb-12 relative group">
      <h2 className="text-xl font-semibold mb-4">Æfingarnar mínar</h2>
      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-hidden scroll-smooth"
        >
          {favorites.map((session) => (
            <div
              key={session.id}
              className="flex-none w-[300px] relative group/item overflow-hidden rounded"
            >
              <img
                src={session.image}
                alt={session.title}
                className="w-full aspect-[16/9] object-cover transition-transform duration-300 group-hover/item:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="flex gap-2 mb-1">
                  <span className="text-xs text-emerald-400">{session.duration}</span>
                  <span className="text-xs text-emerald-400">•</span>
                  <span className="text-xs text-emerald-400">{session.level}</span>
                </div>
                <h3 className="text-sm font-medium text-white">{session.title}</h3>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
                <Button 
                  size="sm" 
                  className="bg-emerald-500 text-white hover:bg-emerald-600"
                  onClick={() => setIsVideoModalOpen(true)}
                >
                  <Play className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="bg-zinc-800 text-white hover:bg-zinc-700"
                  onClick={() => {
                    setSelectedSession(session);
                    setIsRemoveDialogOpen(true);
                  }}
                >
                  <Heart className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* Left arrow */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full z-10"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-4 w-4 text-white" />
        </Button>
        {/* Right arrow */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full z-10"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-4 w-4 text-white" />
        </Button>
      </div>

      <AlertDialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Fjarlægja úr uppáhaldi</AlertDialogTitle>
            <AlertDialogDescription>
              Ertu viss um að þú viljir fjarlægja {selectedSession?.title} úr uppáhöldum?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hætta við</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleRemove}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Fjarlægja
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="https://videos.pexels.com/video-files/4057407/4057407-uhd_2732_1440_25fps.mp4"
        title="Favorite Yoga Session"
      />
    </section>
  );
}