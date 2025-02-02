import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YogaApp - Jógatímar á netinu',
  description: 'Umbreyttu æfingunni þinni með leiðbeindum jógatímum fyrir öll stig',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
      >
        <body className={`${inter.className} bg-background overflow-x-hidden`} suppressHydrationWarning>
          {children}
          <Toaster />
        </body>
      </ThemeProvider>
    </html>
  );
}
