import React from 'react';
import { StatCard } from '../components/StatCard';
import { Card, CardHead, Btn, Badge, ProgressBar } from '../components/Primitives';

export function PageMonitor({ toast }: { toast: (title: string, msg: string, type?: any) => void }) {
  const pages = [
    { url: '/', score: 97, lcp: '1.2s', cls: '0.02', ttfb: '0.3s', status: 'good' },
    { url: '/shop/', score: 88, lcp: '2.1s', cls: '0.05', ttfb: '0.4s', status: 'good' },
    { url: '/blog/', score: 91, lcp: '1.8s', cls: '0.01', ttfb: '0.3s', status: 'good' },
    { url: '/checkout/', score: 72, lcp: '3.4s', cls: '0.12', ttfb: '0.7s', status: 'warn' },
    { url: '/contact/', score: 95, lcp: '1.1s', cls: '0.00', ttfb: '0.2s', status: 'good' },
  ];

  return (
    <div className="flex flex-col gap-[16px] animate-[fadeUp_0.3s_ease]">
      <div className="grid grid-cols-4 gap-[12px]">
        <StatCard
          label="PageSpeed Score"
          value="94"
          sub="Desktop average"
          color="var(--green)"
          icon="activity"
          badge={{ label: 'A+', color: 'green' }}
        />
        <StatCard label="Cache Hit Ratio" value="94%" sub="Last 24 hours" color="var(--blue)" icon="cache" />
        <StatCard label="Slow Pages" value="1" sub="Score < 80" color="var(--amber)" icon="warning" badge={{ label: 'Action needed', color: 'amber' }} />
        <StatCard label="Avg TTFB" value="0.3s" sub="Server response" color="var(--purple)" icon="zap" />
      </div>
      <Card>
        <CardHead
          title="Page Performance Report"
          desc="Core Web Vitals scores per page"
          icon="chart"
          color="var(--blue)"
          action={
            <Btn variant="secondary" size="sm" icon="refresh" onClick={() => toast('Scanning…', 'Running PageSpeed on all pages.', 'info')}>
              Rescan All
            </Btn>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['URL', 'Score', 'LCP', 'CLS', 'TTFB', 'Status'].map((h) => (
                  <th
                    key={h}
                    className="p-[10px_16px] text-left text-[11px] font-bold text-[var(--text4)] uppercase tracking-[0.06em]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pages.map((p, i) => (
                <tr
                  key={p.url}
                  className={`border-b transition-colors duration-150 ${i < pages.length - 1 ? 'border-[var(--border)]' : 'border-transparent'}`}
                  style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface2)' }}
                >
                  <td className="p-[12px_16px] font-mono text-[12px] text-[var(--text2)]">{p.url}</td>
                  <td className="p-[12px_16px]">
                    <div className="flex items-center gap-[6px]">
                      <div
                        className="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center text-[12px] font-extrabold"
                        style={{
                          background: p.score >= 90 ? 'var(--green-bg)' : p.score >= 70 ? 'var(--amber-bg)' : 'var(--red-bg)',
                          color: p.score >= 90 ? 'var(--green)' : p.score >= 70 ? 'var(--amber)' : 'var(--red)',
                        }}
                      >
                        {p.score}
                      </div>
                    </div>
                  </td>
                  <td
                    className="p-[12px_16px] font-mono text-[12px]"
                    style={{ color: parseFloat(p.lcp) > 2.5 ? 'var(--red)' : 'var(--green)' }}
                  >
                    {p.lcp}
                  </td>
                  <td
                    className="p-[12px_16px] font-mono text-[12px]"
                    style={{ color: parseFloat(p.cls) > 0.1 ? 'var(--red)' : 'var(--green)' }}
                  >
                    {p.cls}
                  </td>
                  <td className="p-[12px_16px] font-mono text-[12px] text-[var(--text2)]">{p.ttfb}</td>
                  <td className="p-[12px_16px]">
                    <Badge color={p.status === 'good' ? 'green' : 'amber'}>{p.status === 'good' ? 'Good' : 'Needs Work'}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card>
        <CardHead title="Cache Hit Ratio" icon="chart" color="var(--accent)" />
        <div className="p-[16px_20px] flex flex-col gap-[12px]">
          {[
            { label: 'Page Cache Hits', pct: 94, color: 'var(--green)' },
            { label: 'Object Cache Hits', pct: 87, color: 'var(--blue)' },
            { label: 'Browser Cache', pct: 78, color: 'var(--purple)' },
            { label: 'CDN Cache', pct: 92, color: 'var(--cyan)' },
          ].map((r) => (
            <ProgressBar key={r.label} label={r.label} pct={r.pct} color={r.color} />
          ))}
        </div>
      </Card>
    </div>
  );
}
