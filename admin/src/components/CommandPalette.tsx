import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icons';
import { NAV } from '../constants';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
}

export function CommandPalette({ isOpen, onClose, onSelect }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = NAV.filter(item => !item.sep).filter(item => {
    const searchStr = `${item.label} ${item.keywords || ''}`.toLowerCase();
    return searchStr.includes(query.toLowerCase());
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          onSelect(filteredItems[selectedIndex].id!);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onSelect, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[10vh] p-[16px] bg-[var(--ink)]/40 backdrop-blur-[4px] animate-[fadeIn_0.2s_ease]">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-[600px] bg-[var(--surface)] rounded-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[var(--border)] overflow-hidden animate-[popIn_0.2s_ease]">
        <div className="flex items-center p-[16px] border-b border-[var(--border)] gap-[12px]">
          <span className="text-[var(--text4)] w-[20px] h-[20px]">{Icons.search}</span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-[16px] text-[var(--text1)] placeholder:text-[var(--text4)]"
            placeholder="Search settings, tools, and documentation..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <div className="flex items-center gap-[4px] px-[8px] py-[4px] bg-[var(--surface2)] rounded-[4px] border border-[var(--border)]">
            <span className="text-[10px] font-bold text-[var(--text4)]">ESC</span>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-[8px]">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <button
                key={item.id}
                className={`w-full flex items-center justify-between p-[12px] rounded-[8px] transition-colors ${
                  idx === selectedIndex ? 'bg-[var(--accent)] text-white' : 'hover:bg-[var(--surface2)] text-[var(--text2)]'
                }`}
                onClick={() => {
                  onSelect(item.id!);
                  onClose();
                }}
              >
                <div className="flex items-center gap-[12px]">
                  <span className={`w-[18px] h-[18px] ${idx === selectedIndex ? 'text-white' : 'text-[var(--text4)]'}`}>
                    {Icons[item.icon as keyof typeof Icons]}
                  </span>
                  <div className="flex flex-col items-start">
                    <span className="text-[14px] font-medium">{item.label}</span>
                    <span className={`text-[11px] ${idx === selectedIndex ? 'text-white/70' : 'text-[var(--text4)]'}`}>
                      {item.section === 'perf' ? 'Performance' : item.section === 'mgmt' ? 'Management' : item.section === 'adv' ? 'Advanced' : 'General'}
                    </span>
                  </div>
                </div>
                {idx === selectedIndex && (
                  <span className="text-[12px] opacity-70">Enter</span>
                )}
              </button>
            ))
          ) : (
            <div className="p-[32px] text-center">
              <div className="text-[var(--text4)] mb-[8px] flex justify-center">
                <span className="w-[32px] h-[32px] opacity-20">{Icons.search}</span>
              </div>
              <p className="text-[var(--text3)] text-[14px]">No results found for "{query}"</p>
            </div>
          )}
        </div>

        <div className="p-[12px] bg-[var(--surface2)] border-t border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <div className="flex items-center gap-[6px]">
              <span className="px-[6px] py-[2px] bg-[var(--surface)] border border-[var(--border)] rounded-[4px] text-[10px] font-bold text-[var(--text4)]">↑↓</span>
              <span className="text-[11px] text-[var(--text4)]">Navigate</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <span className="px-[6px] py-[2px] bg-[var(--surface)] border border-[var(--border)] rounded-[4px] text-[10px] font-bold text-[var(--text4)]">↵</span>
              <span className="text-[11px] text-[var(--text4)]">Select</span>
            </div>
          </div>
          <div className="text-[11px] text-[var(--text4)]">
            SpeedPress Search
          </div>
        </div>
      </div>
    </div>
  );
}
