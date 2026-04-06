import React, { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { Card, CardHead, Btn, Toggle, ProgressBar, Badge } from '../components/Primitives';
import type { SpeedPressOptions } from '../types';
import { SetupWizard } from '../components/SetupWizard';

export function PageDashboard({
  opts,
  set,
  toast,
  setPage,
  preloadPct,
  preloading,
  runPreload,
}: {
  opts: SpeedPressOptions;
  set: (k: keyof SpeedPressOptions, v: any) => void;
  toast: (title: string, msg: string, type?: any) => void;
  setPage: (p: string) => void;
  preloadPct: number;
  preloading: boolean;
  runPreload: () => void;
}) {
  const [wizardOpen, setWizardOpen] = useState(false);
  const stats = [
    { label: 'Cached Pages', value: '312', sub: 'Updated 2m ago', color: 'var(--accent)', icon: 'cache', badge: { label: '+12% this week', color: 'orange' } },
    { label: 'Cache Hit Rate', value: '94%', sub: 'Last 24 hours', color: 'var(--green)', icon: 'activity', badge: { label: 'Excellent', color: 'green' } },
    { label: 'Avg Load Time', value: '0.8s', sub: 'vs 3.2s uncached', color: 'var(--blue)', icon: 'zap', badge: { label: '-75%', color: 'blue' } },
    { label: 'PageSpeed Score', value: '97', sub: 'Desktop · Last scan', color: 'var(--purple)', icon: 'star', badge: { label: 'A+', color: 'purple' } },
  ];

  const features: { label: string; key: keyof SpeedPressOptions; page: string; color: string }[] = [
    { label: 'Page Caching', key: 'cache_enabled', page: 'caching', color: 'var(--blue)' },
    { label: 'HTML Minify', key: 'min_html', page: 'files', color: 'var(--purple)' },
    { label: 'CSS Minify', key: 'min_css', page: 'files', color: 'var(--purple)' },
    { label: 'JS Minify', key: 'min_js', page: 'files', color: 'var(--purple)' },
    { label: 'Lazy Load Images', key: 'lazy_images', page: 'media', color: 'var(--amber)' },
    { label: 'WebP Conversion', key: 'webp', page: 'media', color: 'var(--amber)' },
    { label: 'Defer JS', key: 'defer_js', page: 'files', color: 'var(--cyan)' },
    { label: 'Critical CSS', key: 'critical_css', page: 'files', color: 'var(--cyan)' },
    { label: 'Font Preload', key: 'font_preload', page: 'vitals', color: 'var(--green)' },
    { label: 'LCP Optimization', key: 'lcp_opt', page: 'vitals', color: 'var(--green)' },
    { label: 'Cache Preload', key: 'cache_preload', page: 'caching', color: 'var(--accent)' },
    { label: 'Disable Emojis', key: 'disable_emojis', page: 'scripts', color: 'var(--text3)' },
  ];

  const vitals = [
    { label: 'LCP', value: '1.2s', score: 92, color: 'var(--green)', target: '< 2.5s' },
    { label: 'INP', value: '48ms', score: 88, color: 'var(--green)', target: '< 200ms' },
    { label: 'CLS', value: '0.02', score: 95, color: 'var(--green)', target: '< 0.1' },
    { label: 'FCP', value: '0.9s', score: 96, color: 'var(--green)', target: '< 1.8s' },
    { label: 'TTFB', value: '0.3s', score: 90, color: 'var(--blue)', target: '< 0.8s' },
    { label: 'TBT', value: '42ms', score: 89, color: 'var(--blue)', target: '< 200ms' },
  ];

  return (
    <>
      <div className="animate-[fadeUp_0.3s_ease]">
      {!opts.setup_wizard_completed && (
        <div className="bg-[var(--accent)] rounded-[12px] p-[24px] mb-[22px] text-white flex flex-col sm:flex-row items-center justify-between gap-[20px] shadow-[0_10px_30px_rgba(var(--accent-rgb),0.3)] relative overflow-hidden group">
          <div className="absolute top-[-20px] right-[-20px] w-[120px] h-[120px] bg-white/10 rounded-full blur-[40px] group-hover:scale-125 transition-transform duration-700" />
          <div className="absolute bottom-[-10px] left-[10%] w-[80px] h-[80px] bg-white/5 rounded-full blur-[20px]" />
          <div className="flex items-center gap-[20px] relative z-10">
            <div className="w-[56px] h-[56px] rounded-[16px] bg-white/20 flex items-center justify-center text-[28px] backdrop-blur-md border border-white/30">
              🚀
            </div>
            <div>
              <h2 className="text-[20px] font-bold mb-[4px]">Welcome to SpeedPress!</h2>
              <p className="text-white/80 text-[14px]">Let's optimize your site in 3 simple steps with our smart Setup Wizard.</p>
            </div>
          </div>
          <div className="flex gap-[12px] relative z-10 w-full sm:w-auto">
            <Btn variant="secondary" onClick={() => setWizardOpen(true)}>
              Launch Wizard
            </Btn>
            <Btn variant="ghost" onClick={() => set('setup_wizard_completed', true)}>
              Skip for now
            </Btn>
          </div>
        </div>
      )}


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px] mb-[22px]">
        {stats.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            sub={s.sub}
            color={s.color}
            icon={s.icon}
            badge={s.badge as any}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] mb-[16px]">
        <Card>
          <CardHead
            title="Feature Status"
            desc="Enable/disable core features"
            icon="zap"
            color="var(--accent)"
            action={
              <Btn variant="outline" size="sm" onClick={() => setPage('caching')}>
                Configure All
              </Btn>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {features.map((f, i) => (
              <div
                key={f.key}
                className={`flex items-center justify-between p-[12px_20px] border-b border-[var(--border)] transition-colors duration-200 hover:bg-[var(--surface2)] ${
                  i % 2 === 0 ? 'sm:border-r border-[var(--border)]' : ''
                }`}
              >
                <div className="flex items-center gap-[10px]">
                  <div
                    className="w-[8px] h-[8px] rounded-full shrink-0 transition-all duration-300"
                    style={{
                      background: opts[f.key] ? f.color : 'var(--border2)',
                      boxShadow: opts[f.key] ? `0 0 8px ${f.color}88` : 'none',
                    }}
                  />
                  <span
                    className="text-[13px] font-semibold text-[var(--text2)] cursor-pointer transition-colors duration-150 hover:text-[var(--accent)]"
                    onClick={() => setPage(f.page)}
                  >
                    {f.label}
                  </span>
                </div>
                <Toggle checked={!!opts[f.key]} onChange={(v) => set(f.key, v)} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead
            title="Core Web Vitals"
            desc="Real performance metrics"
            icon="activity"
            color="var(--green)"
            action={
              <Badge color="green" dot="pulse">
                Live
              </Badge>
            }
          />
          <div className="p-[20px] flex flex-col gap-[14px]">
            {vitals.map((v) => (
              <div key={v.label} className="flex items-center gap-[16px] group">
                <div className="w-[40px] flex flex-col">
                  <span className="text-[11px] font-extrabold text-[var(--text3)] font-mono tracking-tighter">{v.label}</span>
                  <div className="h-[2px] w-0 group-hover:w-full transition-all duration-300" style={{ background: v.color }} />
                </div>
                <div className="flex-1">
                  <ProgressBar pct={v.score} color={v.color} label="" sub={v.value} />
                </div>
                <div className="w-[70px] text-right">
                  <div className="text-[10px] text-[var(--text4)] font-mono uppercase tracking-tighter">Target</div>
                  <div className="text-[10px] font-bold text-[var(--text3)] font-mono">{v.target}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-[16px]">
        <Card>
          <CardHead title="Quick Actions" icon="rocket" color="var(--accent)" />
          <div className="p-[16px_20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[10px]">
            {[
              { label: 'Clear All Cache', icon: 'trash', v: 'secondary', action: () => toast('Cache cleared', 'All 312 cached pages removed.', 'success') },
              { label: 'Clear CSS Cache', icon: 'trash', v: 'secondary', action: () => toast('CSS cache cleared', 'Minified CSS files removed.', 'success') },
              { label: 'Clear JS Cache', icon: 'trash', v: 'secondary', action: () => toast('JS cache cleared', 'Minified JS files removed.', 'success') },
              { label: 'Preload Cache', icon: 'refresh', v: 'secondary', action: runPreload },
              { label: 'Optimize DB', icon: 'db', v: 'secondary', action: () => toast('DB optimized', '187 items removed.', 'success') },
              { label: 'Run PageSpeed', icon: 'activity', v: 'secondary', action: () => toast('PageSpeed scan started', 'Results in ~30 seconds…', 'info') },
            ].map((a) => (
              <Btn key={a.label} variant={a.v as any} size="sm" icon={a.icon} onClick={a.action} full>
                {a.label}
              </Btn>
            ))}
          </div>
          {preloading && (
            <div className="p-[0_20px_16px]">
              <ProgressBar pct={preloadPct} color="var(--green)" label="Warming cache…" />
            </div>
          )}
        </Card>

        <Card>
          <CardHead title="1-Click Optimize" icon="zap" color="var(--accent)" badge={{ label: 'Recommended', color: 'orange' }} />
          <div className="p-[16px_20px]">
            <div className="bg-[var(--accent-bg)] border border-[var(--accent-border)] rounded-[9px] p-[14px_16px] mb-[14px]">
              <div className="text-[13px] font-bold text-[var(--accent)] mb-[4px]">Auto Mode</div>
              <div className="text-[11px] text-[var(--text3)] leading-[1.5]">
                SpeedPress will apply all recommended settings based on your site type automatically.
              </div>
            </div>
            <Btn full icon="zap" onClick={() => toast('Auto-optimized!', '15 settings applied for maximum performance.', 'success')}>
              Apply Recommended
            </Btn>
            <div className="mt-[8px]">
              <Btn full variant="secondary" icon="eye" onClick={() => toast('Compatibility checked', 'No conflicts detected.', 'success')}>
                Check Compatibility
              </Btn>
            </div>
          </div>
          <div className="p-[0_20px_16px]">
            <div className="text-[11px] text-[var(--text4)] leading-[1.5] p-[10px_0] border-t border-[var(--border)]">
              <strong className="text-[var(--text3)]">Safe Mode:</strong> Test changes without affecting live visitors.
            </div>
            <Btn full variant="ghost" size="sm" icon="shield" onClick={() => toast('Safe mode activated', 'Changes are preview-only.', 'info')}>
              Enable Safe Mode
            </Btn>
          </div>
        </Card>
      </div>
      </div>

      <SetupWizard
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        opts={opts}
        set={set}
      />
    </>
  );
}
