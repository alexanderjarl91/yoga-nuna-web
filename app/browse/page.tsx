'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WeeklySchedule } from '@/components/weekly-schedule';
import { FavoritesSection } from '@/components/favorites-section';
import { Card } from '@/components/ui/card';
import { Play, Info, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useState, useRef } from 'react';
import { VideoModal } from '@/components/video-modal';

// Featured yoga session
const featuredSession = {
  title: 'Morgunflæði',
  description: 'Byrjaðu daginn með þessu orkugefandi 20 mínútna vinyasa flæði. Hentar öllum getustigum, þessi tími einblínir á að vekja líkama og huga.',
  image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&auto=format&fit=crop&q=80',
  duration: '20 mín',
  level: 'Öll stig'
};

// Trending sessions
const trendingSessions = [
  {
    id: 1,
    title: 'Mjúk morgunteygja',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60',
    duration: '15 mín',
    level: 'Byrjendur'
  },
  {
    id: 2,
    title: 'Kraftmikið Vinyasa flæði',
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800&auto=format&fit=crop&q=60',
    duration: '25 mín',
    level: 'Miðstig'
  },
  {
    id: 3,
    title: 'Núvitund og hugleiðsla',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&auto=format&fit=crop&q=60',
    duration: '15 mín',
    level: 'Öll stig'
  },
  {
    id: 4,
    title: 'Kjarnaflæði',
    image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&auto=format&fit=crop&q=60',
    duration: '20 mín',
    level: 'Miðstig'
  },
  {
    id: 5,
    title: 'Endurnærandi kvöldflæði',
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&auto=format&fit=crop&q=60',
    duration: '25 mín',
    level: 'Öll stig'
  },
  {
    id: 11,
    title: 'Sólarkveðjur',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60',
    duration: '20 mín',
    level: 'Öll stig'
  },
  {
    id: 12,
    title: 'Yin jóga flæði',
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&auto=format&fit=crop&q=60',
    duration: '25 mín',
    level: 'Miðstig'
  },
  {
    id: 13,
    title: 'Kraftmikil kjarnaæfing',
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&auto=format&fit=crop&q=60',
    duration: '20 mín',
    level: 'Framhald'
  },
  {
    id: 14,
    title: 'Liðleikaþjálfun',
    image: 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?w=800&auto=format&fit=crop&q=60',
    duration: '25 mín',
    level: 'Miðstig'
  },
  {
    id: 15,
    title: 'Meðvitaðar hreyfingar',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60',
    duration: '15 mín',
    level: 'Byrjendur'
  }
];

// Popular sessions
const popularSessions = [
  {
    id: 6,
    title: 'Streitulosandi flæði',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60',
    duration: '20 mín',
    level: 'Byrjendur'
  },
  {
    id: 7,
    title: 'Jafnvægi og liðleiki',
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&auto=format&fit=crop&q=60',
    duration: '25 mín',
    level: 'Miðstig'
  },
  {
    id: 8,
    title: 'Orkugefandi flæði',
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&auto=format&fit=crop&q=60',
    duration: '20 mín',
    level: 'Öll stig'
  },
  {
    id: 9,
    title: 'Djúp teygja',
    image: 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?w=800&auto=format&fit=crop&q=60',
    duration: '15 mín',
    level: 'Byrjendur'
  },
  {
    id: 10,
    title: 'Kvöldslökun',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60',
    duration: '20 mín',
    level: 'Öll stig'
  },
];

const CarouselSection = ({ title, items }: { title: string; items: typeof trendingSessions }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [maxScroll, setMaxScroll] = useState(0);
  const [visibleItems, setVisibleItems] = useState(0);
  const hasFilters = selectedLevel !== 'all' || selectedDuration !== 'all';

  const clearFilters = () => {
    setSelectedLevel('all');
    setSelectedDuration('all');
  };

  const filteredItems = items.filter(item => {
    const levelMatch = selectedLevel === 'all' || item.level === selectedLevel;
    const durationMatch = selectedDuration === 'all' || item.duration === selectedDuration;
    return levelMatch && durationMatch;
  });

  const uniqueLevels = Array.from(new Set(items.map(item => item.level)));
  const uniqueDurations = Array.from(new Set(items.map(item => item.duration)));

  useEffect(() => {
    const updateMaxScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const itemWidth = 316; // 300px card + 16px gap
        const newVisibleItems = Math.floor(containerWidth / itemWidth);
        setVisibleItems(newVisibleItems);
        setMaxScroll(container.scrollWidth - containerWidth);
      }
    };

    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll);
    return () => window.removeEventListener('resize', updateMaxScroll);
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;
    
    const itemWidth = 316; // 300px card + 16px gap
    const currentIndex = Math.round(scrollPosition / itemWidth);
    const newIndex = direction === 'left' 
      ? Math.max(0, currentIndex - visibleItems)
      : currentIndex + visibleItems;
    
    const newPosition = Math.min(maxScroll, Math.max(0, newIndex * itemWidth));
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    setScrollPosition(newPosition);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const newPosition = container.scrollLeft;
    setScrollPosition(newPosition);
  };

  return (
    <section className="mb-12 relative group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex gap-4">
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-[180px] border-white/20 bg-transparent text-white">
              <SelectValue placeholder="Erfiðleikastig" />
            </SelectTrigger>
            <SelectContent className="bg-black border-white/20">
              <SelectItem value="all">Öll stig</SelectItem>
              {uniqueLevels.map(level => (
                <SelectItem 
                  key={level} 
                  value={level}
                  className="hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                >
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedDuration} onValueChange={setSelectedDuration}>
            <SelectTrigger className="w-[180px] border-white/20 bg-transparent text-white">
              <SelectValue placeholder="Lengd" />
            </SelectTrigger>
            <SelectContent className="bg-black border-white/20">
              <SelectItem value="all">Allar lengdir</SelectItem>
              {uniqueDurations.map(duration => (
                <SelectItem 
                  key={duration} 
                  value={duration}
                  className="hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                >
                  {duration}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="relative group">
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-hidden scroll-smooth"
          onScroll={handleScroll}
        > 
          {filteredItems.length === 0 && (
            <div className="w-full flex flex-col items-center justify-center py-12 text-center">
              <p className="text-zinc-400 mb-4">Engar æfingar fundust með síunni</p>
              {hasFilters && (
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Hreinsa síu
                </Button>
              )}
            </div>
          )}
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex-none w-[300px] relative group/item overflow-hidden rounded"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full aspect-[16/9] object-cover transition-transform duration-300 group-hover/item:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="flex gap-2 mb-1">
                  <span className="text-xs text-emerald-400">{item.duration}</span>
                  <span className="text-xs text-emerald-400">•</span>
                  <span className="text-xs text-emerald-400">{item.level}</span>
                </div>
                <h3 className="text-sm font-medium text-white">{item.title}</h3>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
                <Button size="sm" className="bg-emerald-500 text-white hover:bg-emerald-600">
                  <Play 
                    className="h-4 w-4" 
                    onClick={() => setIsVideoModalOpen(true)}
                  />
                </Button>
                <Button size="sm" variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* Left scroll button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-4 w-4 text-white" />
        </Button>
        {/* Right scroll button */}
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoUrl="https://videos.pexels.com/video-files/4057407/4057407-uhd_2732_1440_25fps.mp4"
          title="Yoga Session"
        />
        <Button
          size="sm"
          variant="ghost"
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-4 w-4 text-white" />
        </Button>
      </div>
    </section>
  );
};

export default function BrowsePage() {
  const { user } = useAuth();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center px-4 md:px-12">
        <div className="absolute inset-0">
          <img
            src={featuredSession.image}
            alt={featuredSession.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>
        <div className="relative max-w-2xl">
          <div className="flex gap-3 mb-4">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-500 rounded-full text-sm">
              {featuredSession.duration}
            </span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-500 rounded-full text-sm">
              {featuredSession.level}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">{featuredSession.title}</h2>
          <p className="text-base md:text-lg mb-8">{featuredSession.description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-emerald-500 text-white hover:bg-emerald-600"
              onClick={() => setIsVideoModalOpen(true)}
            >
              <Play className="mr-2 h-5 w-5" /> Byrja æfingu
            </Button>
            <Button size="lg" variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700">
              <Info className="mr-2 h-5 w-5" /> Meiri upplýsingar
            </Button>
          </div>
        </div>
      </section>
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="https://videos.pexels.com/video-files/4057407/4057407-uhd_2732_1440_25fps.mp4"
        title="Featured Yoga Session"
      />

      {/* Yoga Sessions */}
      <main className="relative z-10 px-4 md:px-12 pb-12 -mt-32">
        {/* Featured Classes */}
        <WeeklySchedule />
        <FavoritesSection />

        {/* Popular Classes */}
        <CarouselSection title="Allir tímar" items={trendingSessions} />
      </main>
    </div>
  );
}