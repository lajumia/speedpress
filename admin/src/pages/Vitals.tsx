import React from 'react';
import { Card, CardHead, Row, Toggle, Badge, ProgressBar, Select, TagInput, Input, Btn } from '../components/Primitives';
import type { SpeedPressOptions } from '../types';

export function PageVitals({
  opts,
  set,
}: {
  opts: SpeedPressOptions;
  set: (k: keyof SpeedPressOptions, v: any) => void;
}) {
  const scores = [
    { label: 'LCP', desc: 'Largest Contentful Paint', value: '1.2s', pct: 92, color: 'var(--green)', status: 'Good', target: '< 2.5s' },
    { label: 'INP', desc: 'Interaction to Next Paint', value: '48ms', pct: 88, color: 'var(--green)', status: 'Good', target: '< 200ms' },
    { label: 'CLS', desc: 'Cumulative Layout Shift', value: '0.02', pct: 95, color: 'var(--green)', status: 'Good', target: '< 0.1' },
    { label: 'FCP', desc: 'First Contentful Paint', value: '0.9s', pct: 96, color: 'var(--green)', status: 'Good', target: '< 1.8s' },
    { label: 'TTFB', desc: 'Time to First Byte', value: '0.3s', pct: 90, color: 'var(--blue)', status: 'Good', target: '< 0.8s' },
    { label: 'TBT', desc: 'Total Blocking Time', value: '42ms', pct: 89, color: 'var(--blue)', status: 'Good', target: '< 200ms' },
  ];

  return (
    <div className="flex flex-col gap-[16px] animate-[fadeUp_0.3s_ease]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[12px]">
        {scores.slice(0, 3).map((s) => (
          <div
            key={s.label}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-[16px] shadow-[var(--shadow)]"
            style={{ borderTop: `3px solid ${s.color}` }}
          >
            <div className="flex justify-between items-start mb-[8px]">
              <div>
                <div className="text-[11px] font-bold text-[var(--text4)] uppercase tracking-[0.06em]">{s.label}</div>
                <div className="text-[10px] text-[var(--text4)] mt-[1px]">{s.desc}</div>
              </div>
              <Badge color="green">{s.status as any}</Badge>
            </div>
            <div className="text-[26px] font-extrabold tracking-[-0.02em]" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="mt-[8px]">
              <ProgressBar pct={s.pct} color={s.color} label="" sub={`Target: ${s.target}`} />
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardHead title="Monitoring & Insights" desc="Track real user performance and Google PageSpeed scores" icon="activity" color="var(--purple)" />
        <Row label="Real User Monitoring (RUM)" hint="Collect performance data from actual visitors using the web-vitals library">
          <Toggle checked={opts.rum_enabled} onChange={(v) => set('rum_enabled', v)} />
        </Row>
        <Row label="PageSpeed Insights API" hint="Pull live Google PageSpeed scores directly into your dashboard" last={!opts.psi_api_key}>
          <div className="w-full max-w-[360px]">
            <Input 
              value={opts.psi_api_key} 
              onChange={(v) => set('psi_api_key', v)} 
              placeholder="Enter your Google API Key" 
              type="password"
              small
            />
          </div>
        </Row>
        {opts.psi_api_key && (
          <Row label="API Status" hint="Connection to Google PageSpeed API" indent last>
            <div className="flex items-center gap-[10px]">
              <Badge color="green">Connected</Badge>
              <Btn variant="secondary" size="sm">Run Test</Btn>
            </div>
          </Row>
        )}
      </Card>
      <Card>
        <CardHead
          title="LCP Optimization"
          desc="Improve Largest Contentful Paint"
          icon="zap"
          color="var(--green)"
          action={<Toggle checked={opts.lcp_opt} onChange={(v) => set('lcp_opt', v)} />}
        />
        <Row label="Preload Hero Images" hint="Ensure the LCP image starts loading as early as possible">
          <Toggle checked={opts.preload_hero} onChange={(v) => set('preload_hero', v)} />
        </Row>
        <Row label="Fetch Priority" hint="Add fetchpriority='high' to the LCP image for faster discovery">
          <Toggle checked={opts.fetch_priority} onChange={(v) => set('fetch_priority', v)} />
        </Row>
        <Row label="Preload Critical Fonts" hint="Start loading fonts before CSS parser discovers them">
          <Toggle checked={opts.font_preload} onChange={(v) => set('font_preload', v)} />
        </Row>
        <Row label="Font-Display Strategy" hint="Control how fonts render before they fully load" last>
          <Select
            value={opts.font_display}
            onChange={(v) => set('font_display', v)}
            options={[
              { value: 'swap', label: 'swap (recommended)' },
              { value: 'optional', label: 'optional' },
              { value: 'fallback', label: 'fallback' },
              { value: 'block', label: 'block' },
            ]}
          />
        </Row>
      </Card>
      <Card>
        <CardHead title="CLS & INP Reduction" icon="activity" color="var(--blue)" />
        <Row label="CLS Fix" hint="Reserve space for images and embeds to prevent layout shifts">
          <Toggle checked={opts.cls_fix} onChange={(v) => set('cls_fix', v)} />
        </Row>
        <Row label="INP Optimization" hint="Reduce interaction latency with long-task splitting" last>
          <div className="flex items-center gap-[6px]">
            <Badge color="blue">Experimental</Badge>
            <Toggle checked={opts.inp_opt} onChange={(v) => set('inp_opt', v)} />
          </div>
        </Row>
      </Card>
      <Card>
        <CardHead title="Resource Hints" icon="preload" color="var(--accent)" />
        <Row label="DNS Prefetch" hint="Resolve DNS for third-party domains early">
          <div className="w-full max-w-[360px]">
            <TagInput values={opts.dns_prefetch} onChange={(v) => set('dns_prefetch', v)} placeholder="//fonts.googleapis.com" />
          </div>
        </Row>
        <Row label="Preconnect Domains" hint="Establish early connections (DNS + TCP + TLS)">
          <div className="w-full max-w-[360px]">
            <TagInput values={opts.preconnect_domains} onChange={(v) => set('preconnect_domains', v)} placeholder="https://fonts.googleapis.com" />
          </div>
        </Row>
        <Row label="Remove Unused Fonts" hint="Prevent loading fonts not used on the page" last>
          <Toggle checked={opts.remove_unused_fonts} onChange={(v) => set('remove_unused_fonts', v)} />
        </Row>
      </Card>
    </div>
  );
}
