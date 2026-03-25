/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Info, 
  Car, 
  Gift, 
  CheckCircle2, 
  XCircle, 
  PartyPopper,
  Navigation,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from './lib/utils';

// --- Components ---

const CountdownItem = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center p-3 rounded-2xl glass min-w-[80px]">
    <span className="text-3xl font-bold font-display">{value.toString().padStart(2, '0')}</span>
    <span className="text-[10px] uppercase tracking-widest opacity-60">{label}</span>
  </div>
);

const Section = ({ title, icon: Icon, children, className }: { title: string; icon: any; children: React.ReactNode; className?: string }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={cn("p-6 rounded-3xl glass space-y-4", className)}
  >
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
        <Icon size={20} />
      </div>
      <h2 className="text-lg font-semibold font-display tracking-tight">{title}</h2>
    </div>
    <div className="text-zinc-300 leading-relaxed">
      {children}
    </div>
  </motion.section>
);

// --- Main App ---

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [rsvpStatus, setRsvpStatus] = useState<'pending' | 'confirmed' | 'declined'>('pending');
  const [showConfetti, setShowConfetti] = useState(false);

  const targetDate = new Date('2026-04-25T19:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getWhatsAppUrl = (status: 'confirmed' | 'declined') => {
    const phoneNumber = '5511951397293';
    const message = status === 'confirmed' 
      ? 'Olá! Confirmo minha presença no seu aniversário no dia 25 de abril! 🎉'
      : 'Olá! Infelizmente não poderei comparecer ao seu aniversário, mas agradeço muito pelo convite! ❤️';
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  };

  const handleRSVP = (status: 'confirmed' | 'declined') => {
    setRsvpStatus(status);
    
    // Open WhatsApp after a short delay to let the user see the confirmation UI and confetti
    setTimeout(() => {
      window.open(getWhatsAppUrl(status), '_blank');
    }, 1200);

    if (status === 'confirmed') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#a855f7', '#6366f1']
      });
    }
  };

  const openMap = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=Rua+Antônio+da+Cunha+Coelho,+106+–+Moinho+Velho', '_blank');
  };

  return (
    <div className="min-h-screen bg-zinc-950 selection:bg-purple-500/30">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-pink-600/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full" />
      </div>

      <main className="relative max-w-lg mx-auto px-6 py-12 space-y-8">
        {/* Hero Section */}
        <header className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="inline-block p-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-2xl shadow-purple-500/20"
          >
            <PartyPopper size={40} className="text-white" />
          </motion.div>
          
          <div className="space-y-2">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-bold tracking-[0.2em] text-purple-400 uppercase"
            >
              Você está convidado
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black font-display tracking-tighter"
            >
              MEU <span className="text-gradient">ANIVERSÁRIO</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm max-w-[280px] mx-auto leading-relaxed"
          >
            Está chegando a hora de comemorar mais um ano da minha vida, e eu não poderia deixar essa data passar sem celebrar com você!
          </motion.p>
        </header>

        {/* Countdown */}
        <div className="flex justify-center gap-3">
          <CountdownItem value={timeLeft.days} label="Dias" />
          <CountdownItem value={timeLeft.hours} label="Horas" />
          <CountdownItem value={timeLeft.minutes} label="Minutos" />
          <CountdownItem value={timeLeft.seconds} label="Segs" />
        </div>

        {/* Details Grid */}
        <div className="grid gap-4">
          <Section title="Quando" icon={Calendar}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">25 de Abril, 2026</p>
                <p className="text-sm opacity-60">Sábado</p>
              </div>
              <div className="flex items-center gap-2 text-sm bg-white/5 px-3 py-1 rounded-full">
                <Clock size={14} />
                <span>19:00h</span>
              </div>
            </div>
          </Section>

          <Section title="Onde" icon={MapPin}>
            <p className="text-white font-medium">Rua Antônio da Cunha Coelho, 106</p>
            <p className="text-sm opacity-60">Moinho Velho, São Paulo - SP</p>
            <button 
              onClick={openMap}
              className="w-full mt-4 flex items-center justify-center gap-2 p-3 rounded-2xl bg-white text-zinc-950 font-bold text-sm hover:bg-zinc-200 transition-colors"
            >
              <Navigation size={16} />
              Abrir no Google Maps
            </button>
          </Section>

          <Section title="Regras da Casa" icon={Info}>
            <p className="text-sm">
              Respeito é essencial. Não será tolerado qualquer tipo de comportamento agressivo, ofensas, preconceito ou agressões físicas. Vamos manter um ambiente leve e agradável para todos. ✨
            </p>
          </Section>

          <Section title="Como Chegar" icon={Car}>
            <p className="text-sm">
              O local possui espaço para estacionar, porém a rua é um pouco estreita. 
              <span className="block mt-2 font-medium text-purple-400">Recomendo ir de Uber ou aplicativo para maior comodidade.</span>
            </p>
          </Section>

          <Section title="Presentes" icon={Gift}>
            <p className="text-sm italic">
              "Presente é sempre bem-vindo! Afinal, todo mundo gosta de ganhar um mimo no aniversário, não é mesmo? 😄"
            </p>
          </Section>
        </div>

        {/* RSVP Section */}
        <div className="sticky bottom-6 z-50">
          <div className="p-6 rounded-[2.5rem] glass shadow-2xl shadow-black/50 border-white/10">
            <AnimatePresence mode="wait">
              {rsvpStatus === 'pending' ? (
                <motion.div 
                  key="pending"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-4"
                >
                  <h3 className="text-center font-bold font-display">Você vai conseguir ir?</h3>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleRSVP('confirmed')}
                      className="flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <CheckCircle2 size={18} />
                      Sim, eu vou!
                    </button>
                    <button 
                      onClick={() => handleRSVP('declined')}
                      className="flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10 transition-all"
                    >
                      <XCircle size={18} />
                      Não poderei
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-2"
                >
                  {rsvpStatus === 'confirmed' ? (
                    <>
                      <div className="inline-flex p-2 rounded-full bg-green-500/20 text-green-400 mb-2">
                        <CheckCircle2 size={24} />
                      </div>
                      <h3 className="font-bold text-xl">Presença Confirmada!</h3>
                      <p className="text-sm text-zinc-400 mb-4">Mal posso esperar para te ver lá! 🎉</p>
                      <a 
                        href={getWhatsAppUrl('confirmed')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition-colors"
                      >
                        Enviar WhatsApp manualmente
                      </a>
                    </>
                  ) : (
                    <>
                      <div className="inline-flex p-2 rounded-full bg-red-500/20 text-red-400 mb-2">
                        <XCircle size={24} />
                      </div>
                      <h3 className="font-bold text-xl">Que pena!</h3>
                      <p className="text-sm text-zinc-400 mb-4">Sentiremos sua falta, mas fica para a próxima! ❤️</p>
                      <a 
                        href={getWhatsAppUrl('declined')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-700 text-white text-xs font-bold hover:bg-zinc-600 transition-colors"
                      >
                        Enviar WhatsApp manualmente
                      </a>
                    </>
                  )}
                  <button 
                    onClick={() => setRsvpStatus('pending')}
                    className="mt-4 text-xs text-purple-400 font-medium underline underline-offset-4"
                  >
                    Alterar resposta
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <footer className="text-center pt-8 pb-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
            Criado com carinho para celebrar a vida
          </p>
        </footer>
      </main>
    </div>
  );
}
