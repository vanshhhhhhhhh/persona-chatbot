"use client";

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { personas, PersonaId } from '@/lib/personas';
import { Send, User, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState, useMemo } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ChatInterfaceProps {
  personaId: PersonaId;
}

export function ChatInterface({ personaId }: ChatInterfaceProps) {
  const activePersona = personas[personaId];
  const [localInput, setLocalInput] = useState('');

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/chat',
        body: { personaId },
      }),
    [personaId]
  );

  const { messages, setMessages, sendMessage, status, error } = useChat({
    transport,
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [{ type: 'text', text: activePersona.greeting }],
      },
    ],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoading = status === 'streaming' || status === 'submitted';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        parts: [{ type: 'text', text: activePersona.greeting }],
      },
    ]);
    setLocalInput('');
  }, [personaId, activePersona.greeting, setMessages]);

  const doSend = (text: string) => {
    if (!text.trim() || isLoading) return;
    setLocalInput('');
    sendMessage({ text: text.trim() });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSend(localInput);
  };

  const getMessageText = (msg: { parts?: { type: string; text?: string }[]; content?: string }) => {
    if (msg.parts) {
      return msg.parts
        .filter((p) => p.type === 'text')
        .map((p) => p.text)
        .join('');
    }
    return (msg as { content?: string }).content ?? '';
  };

  return (
    <div className="flex flex-col h-[600px] bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden relative">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => {
          const role = message.role as string;
          return (
          <div
            key={message.id}
            className={cn(
              'flex w-full',
              role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'flex gap-3 max-w-[85%]',
                role === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm text-xs font-bold',
                  role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                )}
              >
                {role === 'user' ? <User size={16} /> : activePersona.avatar}
              </div>
              <div
                className={cn(
                  'px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm whitespace-pre-wrap',
                  role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-tl-sm'
                )}
              >
                {getMessageText(message)}
              </div>
            </div>
          </div>
          );
        })}

        {isLoading && (
          <div className="flex w-full justify-start">
            <div className="flex gap-3 max-w-[85%] flex-row">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-bold">
                {activePersona.avatar}
              </div>
              <div className="px-4 py-3 rounded-2xl bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-tl-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">{activePersona.name} is typing...</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-950/50 border border-red-900 text-red-400 rounded-xl text-sm text-center">
            Error: Could not connect to the API. Please ensure your API key is set correctly.
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {activePersona.suggestionChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => doSend(chip)}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-full text-sm transition-colors text-left cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-zinc-950 border-t border-zinc-800">
        <form onSubmit={handleFormSubmit} className="flex gap-2">
          <input
            className="flex-1 bg-zinc-900 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600/50 border border-zinc-800 placeholder-zinc-500 transition-all"
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            placeholder={`Ask ${activePersona.name} a question...`}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !localInput.trim()}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg flex items-center justify-center shrink-0 relative"
          >
            <Send size={18} className={cn(isLoading && 'opacity-0')} />
            {isLoading && <Loader2 size={18} className="absolute animate-spin" />}
          </button>
        </form>
      </div>
    </div>
  );
}
