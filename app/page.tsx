'use client';

import { Button } from '@/components/ui/button';
import { UserPlus, LogIn, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const features = [
  'Ótakmarkaður aðgangur að öllum jógatímum',
  'Sérsniðnar æfingaáætlanir',
  'Hágæða myndbönd í HD gæðum',
  'Leiðbeiningar frá reyndum kennurum',
  'Aðgengi í gegnum öll tæki',
  'Nýtt efni í hverri viku'
];

const plans = [
  {
    name: 'Mánaðaráskrift',
    price: '4.990 kr',
    period: '/mánuður',
    description: 'Fullur aðgangur með mánaðarlegri áskrift',
    features: [
      'Enginn binditími',
      'Aðgangur að öllu efni',
      'Hægt að hætta hvenær sem er'
    ]
  },
  {
    name: 'Ársáskrift',
    price: '39.990 kr',
    period: '/ár',
    description: 'Sparaðu með árlegri áskrift',
    features: [
      '33% afsláttur',
      'Aðgangur að öllu efni',
      'Sérstök tilboð og bónusar'
    ],
    featured: true
  }
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2969&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-zinc-900/70 backdrop-blur-sm" />
        <div className="relative container mx-auto px-4 py-12 lg:py-24">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-500 mb-6 md:mb-8">YogaApp</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Þín leið að innri ró
            </h1>
            <p className="text-white text-base md:text-lg mb-6 md:mb-8">
              Umbreyttu huga og líkama með leiðbeindum jógatímum. Byrjaðu æfinguna í dag.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  <UserPlus className="mr-2 h-4 w-4" /> Nýskráning
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-zinc-800 text-white hover:bg-zinc-700">
                  <LogIn className="mr-2 h-4 w-4" /> Skrá inn
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="relative py-32 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80')] opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Hvað færðu?
            </h2>
            <p className="text-zinc-400">
              Allt sem þú þarft til að stunda jóga heima hjá þér á þægilegan og árangursríkan hátt.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group flex items-start gap-4 p-8 rounded-2xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.1)]"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-500/50 transition-all duration-300">
                    <Check className="w-5 h-5 text-emerald-500" />
                  </div>
                </div>
                <p className="text-lg font-medium text-zinc-100 group-hover:text-white transition-colors duration-300">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-32 bg-gradient-to-b from-zinc-800 to-zinc-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80')] opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Einfaldar verðlausnir
            </h2>
            <p className="text-zinc-400 text-lg">
              Veldu þá áskrift sem hentar þér best og byrjaðu að æfa strax í dag.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.featured ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]'
                    : 'bg-zinc-900'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className={plan.featured ? 'text-white/80' : 'text-zinc-400'}>
                    {plan.period}
                  </span>
                </div>
                <p className={`mb-6 ${plan.featured ? 'text-white/80' : 'text-zinc-400'}`}>
                  {plan.description}
                </p>
                <Button
                  className={`w-full mb-8 ${
                    plan.featured
                      ? 'bg-white text-emerald-500 hover:bg-white/90 shadow-lg'
                      : 'bg-emerald-500 text-white hover:bg-emerald-600'
                  }`}
                >
                  Velja áskrift <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className={`h-5 w-5 ${
                        plan.featured ? 'text-white' : 'text-emerald-500'
                      }`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Um okkur</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-zinc-400 hover:text-white">Saga</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white">Kennarar</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white">Hafa samband</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Þjónusta</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-zinc-400 hover:text-white">Jógatímar</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white">Námskeið</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white">Einkatímar</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Hjálp</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-zinc-400 hover:text-white">Algengar spurningar</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white">Skilmálar</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white">Persónuvernd</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Samfélagsmiðlar</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-zinc-400 hover:text-white">Instagram</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white">Facebook</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-400">
            <p>&copy; 2024 YogaApp. Allur réttur áskilinn.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}