'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

const DEFAULT_EMAIL = 'a@a.is';
const DEFAULT_PASSWORD = 'aaaa';

export default function LoginPage() {
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const router = useRouter();
  const { signIn, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push('/browse');
    } catch (error) {
      // Handle error silently
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left side - Image */}
      <div className="hidden md:block">
        <div className="relative h-full">
          <img
            src="https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=2969&auto=format&fit=crop"
            alt="Yoga"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex items-center justify-center p-8 bg-white dark:bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-emerald-500 mb-6">
              YogaApp
            </h1>
            <h2 className="text-2xl font-medium text-zinc-900 dark:text-white mb-2">
              Velkomin/n aftur
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Skráðu þig inn til að halda áfram
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Netfang"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 rounded-lg"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Lykilorð"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 rounded-lg"
                required
              />
            </div>
            <Button 
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg mt-8" 
              disabled={isLoading}
            >
              {isLoading ? 'Skrái inn...' : 'Skrá inn'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}