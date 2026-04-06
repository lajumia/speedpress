import React from 'react';
import { Icons } from './Icons';
import { Badge, Card } from './Primitives';

export function StatCard({
  label,
  value,
  sub,
  color,
  icon,
  badge,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
  icon?: string;
  badge?: { label: string; color: any };
  key?: React.Key;
}) {
  const accentColor = color || 'var(--accent)';
  
  return (
    <div
      className="group relative bg-[var(--surface)] rounded-[24px] p-[24px] border border-[var(--border)] transition-all duration-500 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] hover:border-[var(--accent)]/30 overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${accentColor}, transparent)` }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110 shadow-sm"
            style={{ background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`, color: accentColor }}
          >
            <div className="w-6 h-6">{Icons[icon || 'chart']}</div>
          </div>
          {badge && <Badge color={badge.color}>{badge.label}</Badge>}
        </div>
        
        <div className="mt-auto">
          <div className="text-[13px] font-bold text-[var(--text4)] uppercase tracking-[0.1em] mb-1.5 opacity-70">{label}</div>
          <div className="text-4xl font-black text-[var(--text)] tracking-tighter leading-none">{value}</div>
          {sub && (
            <div className="mt-4 pt-4 border-t border-[var(--border)] text-[11px] font-semibold text-[var(--text3)] flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: accentColor }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accentColor }}></span>
              </span>
              {sub}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
