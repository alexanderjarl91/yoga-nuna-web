'use client';

import { useRef, useEffect } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VideoModal } from '@/components/video-modal';
import { useState } from 'react';

interface ScheduledSession {
  title: string;
  duration: string;
  level: string;
  time: string;
  image: string;
}

const weeklySchedule: Record<number, ScheduledSession> = {
  0: {
    title: 'Sunnudagsendurnæring',
    duration: '45 mín',
    level: 'Öll stig',
    time: '9:00 AM',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b'
  },
  1: {
    title: 'Mánudagsflæði',
    duration: '30 mín',
    level: 'Byrjendur',
    time: '7:00 AM',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773'
  },
  2: {
    title: 'Kraftmikill þriðjudagur',
    duration: '60 mín',
    level: 'Miðstig',
    time: '6:30 AM',
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5'
  },
  3: {
    title: 'Heilsudagur miðvikudags',
    duration: '45 mín',
    level: 'Öll stig',
    time: '8:00 AM',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e'
  },
  4: {
    title: 'Kjarnaþjálfun fimmtudags',
    duration: '40 mín',
    level: 'Framhald',
    time: '7:30 AM',
    image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7'
  },
  5: {
    title: 'Liðleiki föstudags',
    duration: '50 mín',
    level: 'Miðstig',
    time: '6:00 AM',
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3'
  },
  6: {
    title: 'Laugardagsstyrkur',
    duration: '55 mín',
    level: 'Öll stig',
    time: '10:00 AM',
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f'
  },
};

export function WeeklySchedule() {
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 0 });
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const weekDays = [...Array(7)].map((_, i) => addDays(startOfCurrentWeek, i));

  useEffect(() => {
    // Scroll to today's card on mobile
    if (containerRef.current) {
      const isMobile = window.innerWidth < 768;
      const todayIndex = weekDays.findIndex(date => isSameDay(date, today));
      if (isMobile) {
        const cardWidth = 300; // Fixed card width
        const gap = 24; // 6 * 4 = 24px (gap-6)
        const scrollPosition = todayIndex * (cardWidth + gap);
        containerRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
  }, [today, weekDays]);

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
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Vikuplanið</h2>
        <div className="flex gap-2 md:hidden">
          <Button
            size="sm"
            variant="ghost"
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 py-1"
      >
        {weekDays.map((date, index) => {
          const isToday = isSameDay(date, today);
          const session = weeklySchedule[index];

          return (
            <Card
              data-day={format(date, 'EEEE')}
              key={index}
              className={cn(
                "relative overflow-hidden transition-all duration-300 group flex-none w-[300px] md:w-[384px] snap-center border-0 my-1",
                isToday && "ring-2 ring-emerald-500"
              )}
            >
              <div className="aspect-video relative rounded-[inherit] overflow-hidden">
                <img
                  src={`${session.image}?w=400&auto=format&fit=crop&q=60`}
                  alt={session.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex flex-col">
                    <span className={cn(
                      "text-sm font-medium mb-1",
                      isToday ? "text-emerald-400" : "text-white"
                    )}
                    >
                      {format(date, 'EEEE')}
                    </span>
                    <span className="text-xs text-gray-300 mb-2">
                      {format(date, 'MMM d')}
                    </span>
                  </div>
                  <h3 className="text-sm md:text-base font-medium text-white mb-1">{session.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-emerald-400">
                    <span>{session.duration}</span>
                    <span>•</span>
                    <span>{session.level}</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <Button 
                  size="sm" 
                  className="bg-emerald-500 text-white hover:bg-emerald-600"
                  onClick={() => setIsVideoModalOpen(true)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Byrja æfingu
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="https://videos.pexels.com/video-files/4057407/4057407-uhd_2732_1440_25fps.mp4"
        title="Weekly Yoga Session"
      />
    </section>
  );
}