import React from 'react';
import { Icons } from './Icons';
import type { ToastItem } from '../types';

export function Toaster({ items }: { items: ToastItem[] }) {
  return (
    <div className="fixed bottom-[80px] right-[24px] z-[9999] flex flex-col gap-[8px] pointer-events-none">
      {items.map((t) => (
        <div
          key={t.id}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-[8px] p-[11px_16px] min-w-[260px] max-w-[340px] shadow-[var(--shadow3)] animate-[toastIn_0.25s_ease] flex items-start gap-[10px]"
          style={{
            borderLeft: `3px solid ${
              t.type === 'error' ? 'var(--red)' : t.type === 'warn' ? 'var(--amber)' : t.type === 'info' ? 'var(--blue)' : 'var(--green)'
            }`,
          }}
        >
          <span
            className="w-[15px] h-[15px] shrink-0 mt-[1px]"
            style={{
              color: t.type === 'error' ? 'var(--red)' : t.type === 'warn' ? 'var(--amber)' : t.type === 'info' ? 'var(--blue)' : 'var(--green)',
            }}
          >
            {t.type === 'error' ? Icons.x : t.type === 'warn' ? Icons.warning : t.type === 'info' ? Icons.info : Icons.check}
          </span>
          <div>
            <div className="text-[13px] font-semibold text-[var(--text)]">{t.title}</div>
            {t.msg && <div className="text-[11px] text-[var(--text3)] mt-[2px]">{t.msg}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
