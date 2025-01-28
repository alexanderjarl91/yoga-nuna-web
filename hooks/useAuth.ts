// Simulated authentication hook
'use client';

import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  signIn: async (email: string, password: string) => {
    set({ isLoading: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({
      user: {
        id: '1',
        email,
        name: email.split('@')[0],
      },
      isLoading: false,
    });
  },
  signOut: () => {
    set({ user: null });
  },
}));