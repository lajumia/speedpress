import React from 'react';
import { Card, CardHead, Row, Toggle, Input, ProgressBar, Btn, TagInput, Badge, Select } from '../components/Primitives';
import type { SpeedPressOptions } from '../types';

export function PagePreload({
  opts,
  set,
  runPreload,
  preloadPct,
  preloading,
}: {
  opts: SpeedPressOptions;
  set: (k: keyof SpeedPressOptions, v: any) => void;
  runPreload: () => void;
  preloadPct: number;
  preloading: boolean;
}) {
  return (
    <div className="flex flex-col gap-[16px] animate-[fadeUp_0.3s_ease]">
      <Card>
        <CardHead 
          title="Instant Page (Preload on Hover)" 
          desc="Begin preloading a page the moment a user hovers over a link"
          icon="mouse" 
          color="var(--indigo)" 
          action={<Toggle checked={opts.instant_page} onChange={(v) => set('instant_page', v)} />}
        />
        <Row label="Hover Sensitivity" hint="Preload starts after 65ms of hover (standard)" last>
          <div className="flex items-center gap-[6px]">
            <Badge color="blue">65ms</Badge>
            <Badge color="green">Recommended</Badge>
          </div>
        </Row>
      </Card>
      <Card>
        <CardHead 
          title="Speculation Rules API" 
          desc="Next-gen prerendering for near-instant page loads in modern browsers"
          icon="zap" 
          color="var(--blue)" 
          badge={{ label: 'New', color: 'blue' }}
          action={<Toggle checked={opts.speculation_rules} onChange={(v) => set('speculation_rules', v)} />}
        />
        <Row label="Optimization Mode" hint="Prerender fully loads the page in background; Prefetch only downloads resources" last>
          <Select 
            value={opts.speculation_rules_mode} 
            onChange={(v) => set('speculation_rules_mode', v)}
            options={[
              { value: 'prerender', label: 'Prerender (Full Page)' },
              { value: 'prefetch', label: 'Prefetch (Resources Only)' },
            ]}
          />
        </Row>
      </Card>
      <Card>
        <CardHead 
          title="Early Hints (103)" 
          desc="Send 103 Early Hints headers for preloaded resources"
          icon="zap" 
          color="var(--blue)" 
          action={<Toggle checked={opts.early_hints} onChange={(v) => set('early_hints', v)} />}
        />
        <Row label="Enable Early Hints" hint="Requires server or CDN support (like Cloudflare) to function correctly" last>
          <Toggle checked={opts.early_hints} onChange={(v) => set('early_hints', v)} />
        </Row>
      </Card>
      <Card>
        <CardHead
          title="Cache Preloading"
          desc="Automatically warm the cache so visitors always get instant pages"
          icon="rocket"
          color="var(--green)"
          action={<Toggle checked={opts.cache_preload} onChange={(v) => set('cache_preload', v)} />}
        />
        <Row label="Preload After Publish / Update" hint="Regenerate cache for a post immediately when saved">
          <Toggle checked={opts.cache_preload_on_publish} onChange={(v) => set('cache_preload_on_publish', v)} />
        </Row>
        <Row label="Sitemap URL" hint="SpeedPress crawls this XML sitemap to warm all pages">
          <div className="w-full max-w-[300px]">
            <Input value={opts.cache_sitemap} onChange={(v) => set('cache_sitemap', v)} placeholder="https://example.com/sitemap.xml" mono />
          </div>
        </Row>
        <div className="p-[12px_20px_16px] border-t border-[var(--border)]">
          {preloading && (
            <div className="mb-[12px]">
              <ProgressBar pct={preloadPct} color="var(--green)" label={`Warming cache… ${preloadPct}%`} />
            </div>
          )}
          <Btn icon="refresh" variant="secondary" loading={preloading} onClick={runPreload}>
            Start Preload
          </Btn>
        </div>
      </Card>
      <Card>
        <CardHead title="DNS Prefetch" icon="globe" color="var(--cyan)" />
        <Row label="DNS Prefetch Domains" hint="Hint the browser to resolve DNS for these hosts early" last>
          <div className="w-full max-w-[360px]">
            <TagInput values={opts.dns_prefetch} onChange={(v) => set('dns_prefetch', v)} placeholder="//fonts.googleapis.com" />
          </div>
        </Row>
      </Card>
      <Card>
        <CardHead title="Preconnect" icon="globe" color="var(--blue)" />
        <Row label="Preconnect Domains" hint="Establish full TCP+TLS connections early to reduce handshake latency" last>
          <div className="w-full max-w-[360px]">
            <TagInput values={opts.preconnect_domains} onChange={(v) => set('preconnect_domains', v)} placeholder="https://fonts.googleapis.com" />
          </div>
        </Row>
      </Card>
      <Card>
        <CardHead title="Prefetch Links" icon="preload" color="var(--purple)" />
        <Row label="Prefetch URLs" hint="Load these pages in the background for instant navigation" last>
          <div className="w-full max-w-[360px]">
            <TagInput values={opts.prefetch_links} onChange={(v) => set('prefetch_links', v)} placeholder="https://example.com/about" />
          </div>
        </Row>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
        <Card>
          <CardHead title="Preload Fonts" icon="zap" color="var(--amber)" />
          <Row label="Font URLs to Preload" hint='Add <link rel="preload"> for these font files' last>
            <div className="w-full max-w-[280px]">
              <TagInput values={opts.preload_fonts} onChange={(v) => set('preload_fonts', v)} placeholder="/fonts/my-font.woff2" />
            </div>
          </Row>
        </Card>
        <Card>
          <CardHead title="Preload CSS" icon="zap" color="var(--purple)" />
          <Row label="CSS Files to Preload" hint="Preload these stylesheets before they are discovered" last>
            <div className="w-full max-w-[280px]">
              <TagInput values={opts.preload_css} onChange={(v) => set('preload_css', v)} placeholder="/wp-content/themes/…/style.css" />
            </div>
          </Row>
        </Card>
        <Card>
          <CardHead title="Preload JS" icon="zap" color="var(--cyan)" />
          <Row label="JS Files to Preload" hint="Preload these scripts before they are discovered" last>
            <div className="w-full max-w-[280px]">
              <TagInput values={opts.preload_js} onChange={(v) => set('preload_js', v)} placeholder="/script.js" />
            </div>
          </Row>
        </Card>
      </div>
    </div>
  );
}
