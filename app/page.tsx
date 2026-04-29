"use client";

import { useState } from 'react';
import { personas, PersonaId } from '@/lib/personas';
import { ChatInterface } from '@/components/ChatInterface';
import { GraduationCap } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const [activePersonaId, setActivePersonaId] = useState<PersonaId>('abhimanyu');

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-500/20">
              <GraduationCap size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Scaler AI Mentors</h1>
              <p className="text-zinc-400 text-sm mt-1">Chat with our industry leaders and accelerate your career.</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          
          {/* Sidebar / Persona Switcher */}
          <aside className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4 px-1">Select a Mentor</h2>
              <div className="flex flex-col gap-3">
                {(Object.keys(personas) as PersonaId[]).map((pId) => {
                  const persona = personas[pId];
                  const isActive = pId === activePersonaId;
                  return (
                    <button
                      key={pId}
                      onClick={() => setActivePersonaId(pId)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left w-full border",
                        isActive 
                          ? "bg-zinc-900 border-blue-500/50 shadow-lg shadow-blue-900/10 ring-1 ring-blue-500/50" 
                          : "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/80 hover:border-zinc-700"
                      )}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-inner transition-colors",
                        isActive ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-400"
                      )}>
                        {persona.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-zinc-100 truncate">{persona.name}</div>
                        <div className="text-xs text-zinc-400 truncate mt-0.5">{persona.role}</div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Persona Description */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="font-semibold text-zinc-200 mb-2 flex items-center gap-2">
                About {personas[activePersonaId].name}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {personas[activePersonaId].description}
              </p>
            </div>
          </aside>

          {/* Chat Area */}
          <section className="min-w-0">
            <ChatInterface personaId={activePersonaId} />
          </section>

        </div>
      </div>
    </main>
  );
}
