import React, { useState, useEffect } from 'react';
import { Icons } from './components/Icons';
import { NAV, DEFAULT_OPTIONS } from './constants';
import type { SpeedPressOptions, ToastItem, DbLogItem } from './types';
import { Toaster } from './components/Toaster';
import { Btn, Badge } from './components/Primitives';

// Pages
import { PageDashboard } from './pages/Dashboard';
import { PageLicense } from './pages/License';
import { PageCaching } from './pages/Caching';
import { PageFiles } from './pages/Files';
import { PageAssetMgr } from './pages/AssetMgr';
import { PageMedia } from './pages/Media';
import { PageVitals } from './pages/Vitals';
import { PagePreload } from './pages/Preload';
import { PageDatabase } from './pages/Database';
import { PageCDN } from './pages/CDN';
import { PageEcommerce } from './pages/Ecommerce';
import { PageScripts } from './pages/Scripts';
import { PageMonitor } from './pages/Monitor';
import { PageDeveloper } from './pages/Developer';
import { PageSecurity } from './pages/Security';
import { PageTools } from './pages/Tools';
import { PageFonts } from './pages/Fonts';
import { PageAnalytics } from './pages/Analytics';
import { PageLazyLoad } from './pages/LazyLoad';
import { PageHelp } from './pages/Help';
import { RightSidebar } from './components/RightSidebar';
import { CommandPalette } from './components/CommandPalette';

export default function App() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState('dashboard');
  const [opts, setOpts] = useState<SpeedPressOptions>(DEFAULT_OPTIONS);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [sideCollapsed, setSideCollapsed] = useState(false);
  const [preloadPct, setPreloadPct] = useState(0);
  const [preloading, setPreloading] = useState(false);
  const [dbLog, setDbLog] = useState<DbLogItem[]>([]);
  const [quickOpen, setQuickOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rightSideOpen, setRightSideOpen] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const theme = dark ? 'dark' : 'light';
    // In a real app, we might apply classes to documentElement
    // Here we use the CSS variables defined in index.css
    if (dark) {
      document.documentElement.style.setProperty('--bg', '#0c0e14');
      document.documentElement.style.setProperty('--bg2', '#11131b');
      document.documentElement.style.setProperty('--surface', '#161923');
      document.documentElement.style.setProperty('--surface2', '#1c2030');
      document.documentElement.style.setProperty('--border', '#252a3a');
      document.documentElement.style.setProperty('--border2', '#2e354a');
      document.documentElement.style.setProperty('--text', '#f0f2f8');
      document.documentElement.style.setProperty('--text2', '#c8cdd8');
      document.documentElement.style.setProperty('--text3', '#7d8499');
      document.documentElement.style.setProperty('--text4', '#4a5068');
      document.documentElement.style.setProperty('--sidebar-bg', '#111420');
      document.documentElement.style.setProperty('--sidebar-border', '#1e2335');
      document.documentElement.style.setProperty('--header-bg', 'rgba(17,20,32,.92)');
    } else {
      document.documentElement.style.setProperty('--bg', '#f4f5f7');
      document.documentElement.style.setProperty('--bg2', '#eef0f3');
      document.documentElement.style.setProperty('--surface', '#ffffff');
      document.documentElement.style.setProperty('--surface2', '#f9fafb');
      document.documentElement.style.setProperty('--border', '#e4e6ea');
      document.documentElement.style.setProperty('--border2', '#d1d5db');
      document.documentElement.style.setProperty('--text', '#0f1117');
      document.documentElement.style.setProperty('--text2', '#374151');
      document.documentElement.style.setProperty('--text3', '#6b7280');
      document.documentElement.style.setProperty('--text4', '#9ca3af');
      document.documentElement.style.setProperty('--sidebar-bg', '#ffffff');
      document.documentElement.style.setProperty('--sidebar-border', '#e4e6ea');
      document.documentElement.style.setProperty('--header-bg', 'rgba(255,255,255,.92)');
    }
    document.body.style.background = 'var(--bg)';
  }, [dark]);

  const toast = (title: string, msg: string, type: ToastItem['type'] = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, title, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  };

  const set = (k: keyof SpeedPressOptions, v: any) => setOpts((o) => ({ ...o, [k]: v }));

  const save = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast('Settings saved', 'All changes applied successfully.', 'success');
    setSaving(false);
  };

  const runPreload = async () => {
    if (preloading) return;
    setPreloading(true);
    setPreloadPct(0);
    for (let i = 4; i <= 100; i += 4) {
      await new Promise((r) => setTimeout(r, 100));
      setPreloadPct(i);
    }
    toast('Preload complete', 'Cache has been warmed.', 'success');
    setPreloading(false);
  };

  const currentNav = NAV.find((n) => n.id === page);

  const pageProps = {
    opts,
    set,
    setOpts,
    toast,
    setPage,
    runPreload,
    preloadPct,
    preloading,
    dbLog,
    setDbLog,
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <PageDashboard {...pageProps} />;
      case 'license': return <PageLicense {...pageProps} />;
      case 'caching': return <PageCaching {...pageProps} />;
      case 'files': return <PageFiles {...pageProps} />;
      case 'assetmgr': return <PageAssetMgr {...pageProps} />;
      case 'media': return <PageMedia {...pageProps} />;
      case 'vitals': return <PageVitals {...pageProps} />;
      case 'preload': return <PagePreload {...pageProps} />;
      case 'database': return <PageDatabase {...pageProps} />;
      case 'cdn': return <PageCDN {...pageProps} />;
      case 'ecommerce': return <PageEcommerce {...pageProps} />;
      case 'scripts': return <PageScripts {...pageProps} />;
      case 'monitor': return <PageMonitor toast={toast} />;
      case 'developer': return <PageDeveloper {...pageProps} />;
      case 'security': return <PageSecurity {...pageProps} />;
      case 'tools': return <PageTools {...pageProps} />;
      case 'fonts': return <PageFonts {...pageProps} />;
      case 'analytics': return <PageAnalytics {...pageProps} />;
      case 'lazyload': return <PageLazyLoad {...pageProps} />;
      case 'help': return <PageHelp />;
      default: return <PageDashboard {...pageProps} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Right Sidebar Overlay */}
      {rightSideOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] xl:hidden"
          onClick={() => setRightSideOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`shrink-0 bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] flex flex-col sticky top-0 h-screen transition-all duration-200 ease-in-out shadow-[var(--shadow)] z-[200] 
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
          fixed lg:sticky top-0 left-0`}
        style={{ width: sideCollapsed ? 64 : 260 }}
      >
        <div className={`p-[16px_18px] border-b border-[var(--border)] flex items-center gap-[10px] h-[60px] shrink-0 ${sideCollapsed ? 'justify-center p-[16px_12px]' : ''}`}>
          <div className="w-[32px] h-[32px] rounded-[9px] bg-[var(--accent)] shrink-0 flex items-center justify-center text-white shadow-[0_2px_10px_var(--accent-glow)] animate-[glow_3s_ease-in-out_infinite]">
            <span className="w-[17px] h-[17px]">{Icons.bolt}</span>
          </div>
          {!sideCollapsed && (
            <div className="overflow-hidden whitespace-nowrap">
              <div className="text-[16px] font-extrabold text-[var(--text)] tracking-[-0.02em]">SpeedPress</div>
              <div className="text-[10px] text-[var(--text4)] font-mono mt-[-1px]">v2.0.0</div>
            </div>
          )}
          <button
            onClick={() => setSideCollapsed((c) => !c)}
            className="ml-auto bg-none border-none cursor-pointer text-[var(--text4)] w-[24px] h-[24px] flex items-center justify-center rounded-[6px] shrink-0"
          >
            <span
              className="w-[16px] h-[16px] transition-transform duration-200"
              style={{ transform: sideCollapsed ? 'rotate(180deg)' : 'none' }}
            >
              {Icons.collapse}
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-[8px_0]">
          {NAV.map((n, i) => {
            if (n.sep) {
              return !sideCollapsed ? (
                <div
                  key={i}
                  className="p-[12px_16px_4px] text-[9px] font-extrabold text-[var(--text4)] uppercase tracking-[0.12em] whitespace-nowrap"
                >
                  {n.label}
                </div>
              ) : (
                <div key={i} className="h-[1px] bg-[var(--border)] m-[8px_10px]" />
              );
            }
            const active = page === n.id;
            return (
              <button
                key={n.id}
                onClick={() => {
                  setPage(n.id!);
                  if (window.innerWidth < 1024) setMobileMenuOpen(false);
                }}
                title={sideCollapsed ? n.label : ''}
                className={`flex items-center gap-[9px] p-[9px_14px] border-none cursor-pointer rounded-[8px] m-[1px_6px] transition-all duration-150 font-inherit text-[13px] ${
                  active ? 'bg-[var(--accent-bg)] text-[var(--accent)] font-bold shadow-[inset_0_0_0_1px_var(--accent-border)]' : 'bg-transparent text-[var(--text3)] font-medium'
                } ${sideCollapsed ? 'justify-center p-[9px_0] gap-0' : 'justify-start'}`}
                style={{ width: 'calc(100% - 12px)' }}
              >
                <span className="w-[17px] h-[17px] shrink-0">{Icons[n.icon!]}</span>
                {!sideCollapsed && <span className="whitespace-nowrap overflow-hidden">{n.label}</span>}
                {!sideCollapsed && n.id === 'caching' && opts.cache_enabled && (
                  <span className="ml-auto w-[7px] h-[7px] rounded-full bg-[var(--green)] animate-[pulse_2s_infinite] shrink-0" />
                )}
                {!sideCollapsed && n.id === 'license' && opts.license_status !== 'active' && (
                  <span className="ml-auto">
                    <Badge color="amber">Setup</Badge>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-[10px] border-t border-[var(--border)]">
          <button
            onClick={() => setDark((d) => !d)}
            title="Toggle theme"
            className={`w-full flex items-center gap-[9px] p-[8px_10px] border-none cursor-pointer rounded-[8px] bg-[var(--surface2)] text-[var(--text3)] font-inherit text-[12px] font-medium transition-all duration-150 ${
              sideCollapsed ? 'justify-center' : 'justify-start'
            }`}
          >
            <span className="w-[16px] h-[16px] shrink-0">{dark ? Icons.sun : Icons.moon}</span>
            {!sideCollapsed && <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="h-[60px] bg-[var(--header-bg)] backdrop-blur-[12px] border-b border-[var(--border)] flex items-center p-[0_12px] lg:p-[0_24px] gap-[12px] sticky top-0 z-[90] shrink-0">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden w-[36px] h-[36px] flex items-center justify-center rounded-[8px] bg-[var(--surface2)] text-[var(--text3)] border-none cursor-pointer"
          >
            <span className="w-[20px] h-[20px]">{Icons.menu || Icons.collapse}</span>
          </button>
          <button 
            onClick={() => setCommandOpen(true)}
            className="sm:hidden w-[36px] h-[36px] flex items-center justify-center rounded-[8px] bg-[var(--surface2)] text-[var(--text3)] border-none cursor-pointer"
          >
            <span className="w-[18px] h-[18px]">{Icons.search}</span>
          </button>
          <div className="min-w-0">
            <div className="text-[14px] lg:text-[16px] font-bold text-[var(--text)] truncate">{currentNav?.label || 'Dashboard'}</div>
            <div className="text-[10px] lg:text-[11px] text-[var(--text4)] truncate">speedpress.io · yourdomain.com</div>
          </div>
          <div className="hidden md:flex gap-[6px] ml-[8px]">
            {opts.cache_enabled && <Badge color="green" dot="pulse">Cache On</Badge>}
            {opts.license_status === 'active' && <Badge color="blue">Pro</Badge>}
          </div>

          {/* Global Search Button */}
          <div className="hidden sm:flex items-center ml-[12px] flex-1 max-w-[300px]">
            <button 
              onClick={() => setCommandOpen(true)}
              className="w-full flex items-center gap-[10px] p-[8px_12px] bg-[var(--surface2)] border border-[var(--border)] rounded-[8px] text-[var(--text4)] hover:text-[var(--text2)] hover:border-[var(--border2)] transition-all group"
            >
              <span className="w-[16px] h-[16px]">{Icons.search}</span>
              <span className="text-[13px] font-medium">Search settings...</span>
              <div className="ml-auto flex items-center gap-[4px] px-[6px] py-[2px] bg-[var(--surface)] border border-[var(--border)] rounded-[4px]">
                <span className="text-[10px] font-bold opacity-60">⌘K</span>
              </div>
            </button>
          </div>

          <div className="ml-auto flex gap-[6px] lg:gap-[8px] items-center">
            <button
              onClick={() => setRightSideOpen(!rightSideOpen)}
              title={rightSideOpen ? "Hide Resources" : "Show Resources"}
              className={`w-[36px] h-[36px] flex items-center justify-center rounded-[8px] border-none cursor-pointer transition-all duration-200 ${
                rightSideOpen ? 'bg-[var(--accent-bg)] text-[var(--accent)]' : 'bg-[var(--surface2)] text-[var(--text3)] hover:text-[var(--text2)]'
              }`}
            >
              <span className="w-[20px] h-[20px]">{Icons.book}</span>
            </button>
            <Btn variant="secondary" size="sm" icon="trash" onClick={() => toast('Cache cleared', 'All cached pages removed.', 'success')}>
              <span className="hidden sm:inline">Clear Cache</span>
            </Btn>
            <Btn size="sm" icon="check" loading={saving} onClick={save}>
              <span className="hidden sm:inline">Save Changes</span>
              <span className="sm:hidden">Save</span>
            </Btn>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-[16px] lg:p-[24px]">
          <div>{renderPage()}</div>
        </div>
      </div>

      <RightSidebar open={rightSideOpen} onClose={() => setRightSideOpen(false)} />

      {/* Quick Actions FAB */}
      <div className="fixed bottom-[20px] right-[20px] lg:bottom-[24px] lg:right-[24px] z-[1000] flex flex-col items-end gap-[12px]">
        {quickOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-[8px] z-[-1] transition-all duration-300" 
              onClick={() => setQuickOpen(false)}
            />
            <div className="flex flex-col gap-[10px] animate-[popIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]">
              {[
                { label: 'Clear Cache', icon: 'trash', action: () => { toast('Cache cleared', '', 'success'); setQuickOpen(false); } },
                { label: 'Preload', icon: 'refresh', action: () => { runPreload(); setQuickOpen(false); } },
                { label: 'Optimize DB', icon: 'db', action: () => { toast('DB optimized', '', 'success'); setQuickOpen(false); } },
                { label: 'PageSpeed Scan', icon: 'activity', action: () => { toast('Scanning…', 'Report ready in ~30s.', 'info'); setQuickOpen(false); } },
                { label: 'Safe Mode', icon: 'shield', action: () => { set('safe_mode', !opts.safe_mode); toast(opts.safe_mode ? 'Safe mode off' : 'Safe mode on', '', 'info'); setQuickOpen(false); } },
              ].map((a, i) => (
                <div 
                  key={a.label} 
                  className="flex items-center gap-[14px] justify-end group"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="bg-[var(--text)] text-[var(--bg)] rounded-[10px] p-[8px_16px] text-[14px] font-bold shadow-[0_8px_24px_rgba(0,0,0,0.3)] whitespace-nowrap transition-all duration-200 transform group-hover:scale-105">
                    {a.label}
                  </div>
                  <button
                    onClick={a.action}
                    className="w-[48px] h-[48px] rounded-[14px] border-none bg-[var(--surface)] cursor-pointer text-[var(--text)] flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:scale-110 active:scale-90 transition-all duration-150 shrink-0 border border-[var(--border)]"
                  >
                    <span className="w-[20px] h-[20px]">{Icons[a.icon]}</span>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
        <button
          onClick={() => setQuickOpen((o) => !o)}
          className={`w-[60px] h-[60px] rounded-[18px] border-none cursor-pointer text-white flex items-center justify-center transition-all duration-300 z-[1001] ${
            quickOpen ? 'bg-[var(--text)] rotate-[45deg] shadow-[0_12px_40px_rgba(0,0,0,0.4)]' : 'bg-[var(--accent)] shadow-[0_8px_32px_var(--accent-glow)] hover:scale-105'
          }`}
        >
          <span className="w-[26px] h-[26px]">{Icons.plus}</span>
        </button>
      </div>

      <Toaster items={toasts} />
      
      <CommandPalette 
        isOpen={commandOpen} 
        onClose={() => setCommandOpen(false)} 
        onSelect={setPage} 
      />
    </div>
  );
}
