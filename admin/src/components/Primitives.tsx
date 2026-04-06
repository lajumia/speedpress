import React, { useState } from 'react';
import { Icons } from './Icons';

export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="relative w-[42px] h-[24px] rounded-[12px] border-none cursor-pointer shrink-0 transition-colors duration-200"
      style={{
        background: checked ? 'var(--accent)' : 'var(--border2)',
        boxShadow: checked ? '0 0 0 3px var(--accent-bg)' : 'none',
      }}
    >
      <span
        className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.25)] block"
        style={{ left: checked ? '21px' : '3px' }}
      />
    </button>
  );
}

interface BtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: string;
  disabled?: boolean;
  full?: boolean;
  style?: React.CSSProperties;
  key?: React.Key;
}

export function Btn({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  loading,
  icon,
  disabled,
  full,
  style = {},
}: BtnProps) {
  const padding = { sm: '6px 14px', md: '10px 20px', lg: '14px 28px' }[size];
  const fontSize = { sm: 12, md: 14, lg: 15 }[size];
  const variants = {
    primary: { background: 'var(--accent)', color: '#fff', border: 'none', boxShadow: '0 4px 14px 0 var(--accent-glow)' },
    secondary: { background: 'var(--surface2)', color: 'var(--text2)', border: '1px solid var(--border)', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.05)' },
    ghost: { background: 'transparent', color: 'var(--text3)', border: 'none' },
    danger: { background: 'var(--red-bg)', color: 'var(--red)', border: '1px solid var(--red-border)' },
    success: { background: 'var(--green-bg)', color: 'var(--green)', border: '1px solid var(--green-border)' },
    outline: { background: 'transparent', color: 'var(--accent)', border: '1.5px solid var(--accent)' },
  };
  const s = variants[variant];

  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`inline-flex items-center justify-center gap-[8px] rounded-[12px] font-bold transition-all duration-200 tracking-tight ${
        loading || disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:-translate-y-[1px] active:translate-y-[1px] hover:shadow-lg active:shadow-sm'
      } ${full ? 'w-full' : 'w-auto'}`}
      style={{
        fontSize,
        padding,
        ...s,
        ...style,
      }}
    >
      {loading ? (
        <span className="w-[14px] h-[14px] shrink-0 animate-spin">{Icons.spinner}</span>
      ) : (
        icon && <span className="w-[1.1em] h-[1.1em] shrink-0">{Icons[icon]}</span>
      )}
      {children}
    </button>
  );
}

export function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  mono,
  prefix,
  suffix,
  small,
}: {
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  mono?: boolean;
  prefix?: string;
  suffix?: string;
  small?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative flex items-center w-full">
      {prefix && (
        <span className="absolute left-[10px] text-[var(--text4)] text-[12px] pointer-events-none z-[1]">
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-[var(--surface)] rounded-[7px] text-[var(--text)] outline-none transition-colors duration-150 leading-[1.4]"
        style={{
          border: `1.5px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
          padding: small
            ? `5px ${suffix ? 28 : 10}px 5px ${prefix ? 26 : 10}px`
            : `8px ${suffix ? 28 : 12}px 8px ${prefix ? 26 : 12}px`,
          fontSize: small ? 12 : 13,
          fontFamily: mono ? 'var(--font-mono)' : 'inherit',
        }}
      />
      {suffix && (
        <span className="absolute right-[10px] text-[var(--text4)] text-[12px] pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
  );
}

export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
  mono,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  mono?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="w-full bg-[var(--surface)] rounded-[7px] text-[var(--text)] p-[8px_12px] text-[12px] outline-none resize-y transition-colors duration-150 leading-[1.6]"
      style={{
        border: `1.5px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
        fontFamily: mono ? 'var(--font-mono)' : 'inherit',
      }}
    />
  );
}

export function Select({
  value,
  onChange,
  options,
  small,
}: {
  value: string | number;
  onChange: (v: string) => void;
  options: { value: string | number; label: string }[] | string[];
  small?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="bg-[var(--surface)] rounded-[7px] text-[var(--text)] outline-none cursor-pointer font-inherit appearance-none bg-no-repeat"
      style={{
        border: `1.5px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
        padding: small ? '4px 28px 4px 10px' : '8px 32px 8px 12px',
        fontSize: small ? 11 : 13,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%236b7280' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'/%3E%3C/svg%3E")`,
        backgroundPosition: 'right 6px center',
        backgroundSize: 14,
      }}
    >
      {options.map((o) => {
        const val = typeof o === 'string' ? o : o.value;
        const label = typeof o === 'string' ? o : o.label;
        return (
          <option key={val} value={val}>
            {label}
          </option>
        );
      })}
    </select>
  );
}

export function TagInput({
  values,
  onChange,
  placeholder,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [v, setV] = useState('');
  const add = () => {
    const t = v.trim();
    if (t && !values.includes(t)) {
      onChange([...values, t]);
    }
    setV('');
  };
  return (
    <div className="border-[1.5px] border-[var(--border)] rounded-[7px] bg-[var(--surface)] p-[6px_8px] min-h-[40px]">
      <div className={`flex flex-wrap gap-[4px] ${values.length ? 'mb-[4px]' : ''}`}>
        {values.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-[4px] bg-[var(--accent-bg)] text-[var(--accent)] text-[11px] font-semibold p-[2px_8px] rounded-[20px] border border-[var(--accent-border)]"
          >
            {t}
            <button
              onClick={() => onChange(values.filter((x) => x !== t))}
              className="bg-none border-none cursor-pointer text-[var(--accent)] p-0 flex leading-none opacity-70"
            >
              <span className="w-[10px] h-[10px]">{Icons.x}</span>
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-[6px]">
        <input
          value={v}
          onChange={(e) => setV(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className="flex-1 border-none outline-none text-[12px] text-[var(--text)] font-inherit bg-transparent"
        />
        <button
          onClick={add}
          className="bg-none border-none cursor-pointer text-[var(--accent)] p-[0_2px] flex items-center"
        >
          <span className="w-[14px] h-[14px]">{Icons.plus}</span>
        </button>
      </div>
    </div>
  );
}

export function Badge({
  children,
  color = 'gray',
  dot,
}: {
  children: React.ReactNode;
  color?: 'gray' | 'green' | 'red' | 'amber' | 'blue' | 'purple' | 'orange' | 'cyan';
  dot?: boolean | 'pulse';
}) {
  const colors = {
    gray: { bg: 'var(--surface2)', txt: 'var(--text3)', br: 'var(--border)' },
    green: { bg: 'var(--green-bg)', txt: 'var(--green)', br: 'var(--green-border)' },
    red: { bg: 'var(--red-bg)', txt: 'var(--red)', br: 'var(--red-border)' },
    amber: { bg: 'var(--amber-bg)', txt: 'var(--amber)', br: 'var(--amber-border)' },
    blue: { bg: 'var(--blue-bg)', txt: 'var(--blue)', br: 'var(--blue-border)' },
    purple: { bg: 'var(--purple-bg)', txt: 'var(--purple)', br: 'var(--purple-border)' },
    orange: { bg: 'var(--accent-bg)', txt: 'var(--accent)', br: 'var(--accent-border)' },
    cyan: { bg: 'var(--cyan-bg)', txt: 'var(--cyan)', br: 'var(--cyan-border)' },
  };
  const s = colors[color];
  return (
    <span
      className="inline-flex items-center gap-[6px] text-[10px] font-extrabold tracking-[0.06em] p-[3px_10px] rounded-[20px] whitespace-nowrap border uppercase"
      style={{ background: s.bg, color: s.txt, borderColor: s.br }}
    >
      {dot && (
        <span
          className={`w-[6px] h-[6px] rounded-full inline-block ${dot === 'pulse' ? 'animate-[pulse_2s_infinite]' : ''}`}
          style={{ background: s.txt }}
        />
      )}
      {children}
    </span>
  );
}

export function Card({ children, style = {}, className = '' }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <div
      className={`bg-[var(--surface)] border border-[var(--border)] rounded-[24px] overflow-hidden shadow-[0_8px_30px_-10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function CardHead({
  title,
  desc,
  icon,
  color,
  badge,
  action,
  extra,
}: {
  title: string;
  desc?: string;
  icon?: string;
  color?: string;
  badge?: { label: string; color?: any };
  action?: React.Key | React.ReactNode;
  extra?: React.ReactNode;
}) {
  const accentColor = color || 'var(--accent)';
  return (
    <div
      className="p-[18px_20px] sm:p-[24px_28px] border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center gap-[14px] sm:gap-[18px] relative overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${accentColor}, transparent)` }}
      />
      
      <div className="flex items-center gap-[14px] sm:gap-[18px] flex-1 min-w-0 relative z-[1]">
        {icon && (
          <span
            className="w-[40px] h-[40px] sm:w-[46px] sm:h-[46px] rounded-[12px] sm:rounded-[14px] shrink-0 flex items-center justify-center relative z-[1] shadow-sm"
            style={{ background: `linear-gradient(135deg, ${accentColor}25, ${accentColor}10)`, color: accentColor }}
          >
            <span className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]">{Icons[icon]}</span>
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-[15px] sm:text-[16px] font-black text-[var(--text)] flex items-center gap-[8px] sm:gap-[10px] flex-wrap tracking-tight">
            {title}
            {badge && <Badge color={badge.color || 'orange'}>{badge.label}</Badge>}
          </div>
          {desc && <div className="text-[11px] sm:text-[12px] text-[var(--text3)] mt-[2px] sm:mt-[4px] font-semibold opacity-70 tracking-wide uppercase">{desc}</div>}
        </div>
      </div>
      
      <div className="flex items-center gap-[8px] relative z-[1] mt-[4px] sm:mt-0">
        {extra && <div className="shrink-0">{extra}</div>}
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}

export function Row({
  label,
  hint,
  children,
  last,
  warning,
  indent,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  last?: boolean;
  warning?: boolean;
  indent?: boolean;
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-[12px] sm:gap-[24px] transition-colors duration-200 ${
        last ? '' : 'border-b border-[var(--border)]'
      } hover:bg-[var(--surface2)]/30 p-[16px_20px] sm:p-[20px_28px] ${indent ? 'pl-[32px] sm:pl-[48px]' : ''}`}
      style={{
        background: warning ? 'var(--amber-bg)' : 'transparent',
      }}
    >
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-bold text-[var(--text2)] flex items-center gap-[8px]">
          {label}
          {warning && <span className="w-[14px] h-[14px] text-[var(--amber)]">{Icons.warning}</span>}
        </div>
        {hint && <div className="text-[12px] text-[var(--text4)] mt-[4px] leading-[1.6] font-medium opacity-80">{hint}</div>}
      </div>
      <div className="shrink-0 w-full sm:w-auto flex justify-start sm:justify-end overflow-x-auto">{children}</div>
    </div>
  );
}

export function SearchableSelect({
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  small,
}: {
  value: string | number;
  onChange: (v: string) => void;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  small?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const filtered = options.filter(o => 
    o.label.toLowerCase().includes(search.toLowerCase()) || 
    String(o.value).toLowerCase().includes(search.toLowerCase())
  );

  const selected = options.find(o => o.value === value);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-[var(--surface)] rounded-[7px] text-[var(--text)] outline-none cursor-pointer font-inherit flex items-center justify-between transition-all duration-150"
        style={{
          border: `1.5px solid ${open ? 'var(--accent)' : 'var(--border)'}`,
          padding: small ? '6px 10px' : '10px 12px',
          fontSize: small ? 12 : 13,
        }}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <span className="w-[14px] h-[14px] text-[var(--text4)] shrink-0">{Icons.chevronDown}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[998]" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-[4px] bg-[var(--surface)] border border-[var(--border)] rounded-[10px] shadow-xl z-[999] overflow-hidden animate-[popIn_0.2s_ease]">
            <div className="p-[8px] border-b border-[var(--border)] bg-[var(--surface2)]">
              <div className="relative flex items-center">
                <span className="absolute left-[8px] w-[14px] h-[14px] text-[var(--text4)]">{Icons.search}</span>
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-[6px] p-[6px_8px_6px_28px] text-[12px] outline-none focus:border-[var(--accent)] text-[var(--text)]"
                />
              </div>
            </div>
            <div className="max-h-[240px] overflow-y-auto p-[4px]">
              {filtered.length === 0 ? (
                <div className="p-[12px] text-center text-[12px] text-[var(--text4)]">No results found</div>
              ) : (
                filtered.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => {
                      onChange(String(o.value));
                      setOpen(false);
                      setSearch('');
                    }}
                    className={`w-full text-left p-[8px_12px] rounded-[6px] border-none cursor-pointer text-[13px] transition-colors ${
                      o.value === value ? 'bg-[var(--accent-bg)] text-[var(--accent)] font-bold' : 'bg-transparent text-[var(--text2)] hover:bg-[var(--surface2)]'
                    }`}
                  >
                    <div className="font-bold">{o.label}</div>
                    <div className="text-[10px] opacity-60 font-mono">{o.value}</div>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function ProgressBar({ pct, color, label, sub, size = 'md' }: { pct: number; color?: string; label?: string; sub?: string; size?: 'sm' | 'md' | 'lg'; key?: React.Key }) {
  const accentColor = color || 'var(--accent)';
  const height = { sm: 4, md: 6, lg: 10 }[size];
  return (
    <div className="w-full">
      {(label || sub) && (
        <div className="flex justify-between items-end mb-[6px]">
          <span className="text-[11px] font-semibold text-[var(--text3)] uppercase tracking-[0.04em]">{label}</span>
          <span className="text-[12px] font-bold font-mono" style={{ color: accentColor }}>
            {sub || `${pct}%`}
          </span>
        </div>
      )}
      <div className="bg-[var(--border)] rounded-[20px] overflow-hidden relative" style={{ height }}>
        {/* Background track glow */}
        <div 
          className="absolute inset-0 opacity-[0.1] blur-[2px]"
          style={{ background: accentColor, width: `${pct}%` }}
        />
        <div
          className="h-full rounded-[20px] transition-[width] duration-700 ease-out relative z-[1]"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`,
            boxShadow: `0 0 10px ${accentColor}44`
          }}
        />
      </div>
    </div>
  );
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 600,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: number;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-[16px] sm:p-[24px]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
        onClick={onClose}
      />
      <div
        className="bg-[var(--surface)] border border-[var(--border)] rounded-[24px] shadow-2xl w-full relative z-[1001] overflow-hidden animate-[popIn_0.3s_ease-out]"
        style={{ maxWidth }}
      >
        <div className="p-[20px_24px] border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface2)]/50">
          <h3 className="text-[18px] font-black text-[var(--text)] tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="w-[32px] h-[32px] rounded-full hover:bg-[var(--border)] flex items-center justify-center text-[var(--text3)] transition-colors border-none cursor-pointer"
          >
            <span className="w-[18px] h-[18px]">{Icons.x}</span>
          </button>
        </div>
        <div className="p-[24px] max-h-[70vh] overflow-y-auto">{children}</div>
        {footer && (
          <div className="p-[16px_24px] border-t border-[var(--border)] bg-[var(--surface2)]/30 flex justify-end gap-[12px]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
