import React from 'react';
import { StatCard } from '../components/StatCard';
import { Card, CardHead, Row, Toggle, Input, Select, Badge, ProgressBar, Btn, TagInput } from '../components/Primitives';
import type { SpeedPressOptions } from '../types';

export function PageCaching({
  opts,
  set,
  toast,
  runPreload,
  preloadPct,
  preloading,
}: {
  opts: SpeedPressOptions;
  set: (k: keyof SpeedPressOptions, v: any) => void;
  toast: (title: string, msg: string, type?: any) => void;
  runPreload: () => void;
  preloadPct: number;
  preloading: boolean;
}) {
  return (
    <div className="flex flex-col gap-[16px] animate-[fadeUp_0.3s_ease]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[12px]">
        <StatCard label="Cached Pages" value="312" color="var(--blue)" icon="cache" sub="0.4MB on disk" />
        <StatCard label="Hit Rate" value="94%" color="var(--green)" icon="activity" sub="Last 24h" />
        <StatCard label="Cache Age" value="2h 14m" color="var(--amber)" icon="clock" sub="Since last clear" />
        <StatCard label="Redis Status" value={opts.cache_redis ? 'Active' : 'Off'} color="var(--purple)" icon="zap" sub="Object cache" />
      </div>

      <Card>
        <CardHead
          title="Page Cache"
          desc="Serve static HTML to anonymous visitors"
          icon="cache"
          color="var(--blue)"
          action={<Toggle checked={opts.cache_enabled} onChange={(v) => set('cache_enabled', v)} />}
        />
        <Row label="Cache Expiry" hint="How long pages stay cached before being regenerated">
          <div className="flex items-center gap-[8px]">
            <div className="w-[110px]">
              <Input value={opts.cache_expiry} onChange={(v) => set('cache_expiry', parseInt(v) || 86400)} type="number" suffix="sec" />
            </div>
          </div>
        </Row>
        <Row label="Mobile Cache" hint="Create a separate cache copy for mobile visitors">
          <Toggle checked={opts.cache_mobile} onChange={(v) => set('cache_mobile', v)} />
        </Row>
        <Row label="Logged-in User Cache" hint="Cache pages for authenticated users (not recommended for members sites)">
          <Toggle checked={opts.cache_loggedin} onChange={(v) => set('cache_loggedin', v)} />
        </Row>
        <Row label="Browser Caching" hint="Set Expires/Cache-Control headers for static assets">
          <Toggle checked={opts.cache_browser} onChange={(v) => set('cache_browser', v)} />
        </Row>
        <Row label="Smart Cache Invalidation" hint="Only clear related pages when content changes, not the entire cache">
          <Toggle checked={opts.cache_smart_invalidation} onChange={(v) => set('cache_smart_invalidation', v)} />
        </Row>
        <Row label="Automatic Cache Purge" hint="Automatically clear cache when posts/pages are updated">
          <Toggle checked={opts.cache_auto_purge} onChange={(v) => set('cache_auto_purge', v)} />
        </Row>
        <Row label="Gzip Compression" hint="Compress text-based resources (HTML, CSS, JS) using Gzip">
          <Toggle checked={opts.gzip_compression} onChange={(v) => set('gzip_compression', v)} />
        </Row>
        <Row label="Brotli Compression" hint="Next-gen compression, more efficient than Gzip (requires HTTPS)" last>
          <div className="flex items-center gap-[6px]">
            <Badge color="blue">Best</Badge>
            <Toggle checked={opts.brotli_compression} onChange={(v) => set('brotli_compression', v)} />
          </div>
        </Row>
      </Card>

      <Card>
        <CardHead
          title="Cache Preloading"
          desc="Warm the cache proactively so visitors always get a cached page"
          icon="rocket"
          color="var(--green)"
          action={<Toggle checked={opts.cache_preload} onChange={(v) => set('cache_preload', v)} />}
        />
        <Row label="Preload on Publish/Update" hint="Regenerate cache immediately after saving a post or page">
          <Toggle checked={opts.cache_preload_on_publish} onChange={(v) => set('cache_preload_on_publish', v)} />
        </Row>
        <Row label="Sitemap-Based Preload" hint="Crawl your sitemap to warm all pages at once">
          <div className="w-full max-w-[280px]">
            <Input value={opts.cache_sitemap} onChange={(v) => set('cache_sitemap', v)} placeholder="https://example.com/sitemap.xml" mono />
          </div>
        </Row>
        <Row label="Scheduled Cache Warmup" hint="Automatically re-warm cache on a schedule">
          <div className="flex items-center gap-[8px]">
            {opts.cache_schedule && (
              <Select
                value={opts.cache_schedule_freq}
                onChange={(v) => set('cache_schedule_freq', v)}
                options={[
                  { value: 'hourly', label: 'Hourly' },
                  { value: 'daily', label: 'Daily' },
                  { value: 'weekly', label: 'Weekly' },
                ]}
                small
              />
            )}
            <Toggle checked={opts.cache_schedule} onChange={(v) => set('cache_schedule', v)} />
          </div>
        </Row>
        <div className="p-[12px_20px_16px] border-t border-[var(--border)]">
          {preloading && (
            <div className="mb-[12px]">
              <ProgressBar pct={preloadPct} color="var(--green)" label="Preloading pages…" />
            </div>
          )}
          <Btn icon="refresh" variant="secondary" loading={preloading} onClick={runPreload}>
            {preloading ? `Preloading ${preloadPct}%` : 'Start Preload Now'}
          </Btn>
        </div>
      </Card>

      <Card>
        <CardHead title="Object Cache" desc="Store database queries and objects in memory for faster repeated access" icon="zap" color="var(--purple)" />
        <Row label="Redis Object Cache" hint="Requires Redis extension. Dramatically speeds up WP queries.">
          <div className="flex items-center gap-[8px]">
            <Badge color="cyan">Recommended</Badge>
            <Toggle checked={opts.cache_redis} onChange={(v) => set('cache_redis', v)} />
          </div>
        </Row>
        {opts.cache_redis && (
          <>
            <Row label="Redis Host" indent>
              <div className="w-full max-w-[180px]">
                <Input value={opts.cache_redis_host} onChange={(v) => set('cache_redis_host', v)} mono small />
              </div>
            </Row>
            <Row label="Redis Port" indent>
              <div className="w-full max-w-[100px]">
                <Input value={opts.cache_redis_port} onChange={(v) => set('cache_redis_port', parseInt(v))} type="number" mono small />
              </div>
            </Row>
          </>
        )}
        <Row label="Memcached Support" hint="Alternative to Redis for object caching">
          <Toggle checked={opts.cache_memcached} onChange={(v) => set('cache_memcached', v)} />
        </Row>
        <Row label="Edge Cache Support" hint="Integrate with Cloudflare, Fastly or Varnish edge caches" last>
          <Toggle checked={opts.cache_edge} onChange={(v) => set('cache_edge', v)} />
        </Row>
      </Card>

      <Card>
        <CardHead title="Cache Exclusion Rules" desc="Bypass cache for specific pages, cookies, or user agents" icon="shield" color="var(--amber)" />
        <Row label="Excluded URLs" hint="Never cache these URL patterns (supports wildcards: /cart, /checkout/*, etc.)">
          <div className="w-full max-w-[360px]">
            <TagInput values={opts.cache_exclude_urls} onChange={(v) => set('cache_exclude_urls', v)} placeholder="Add URL pattern and press Enter…" />
          </div>
        </Row>
        <Row label="Excluded Cookies" hint="Skip cache when the request contains these cookies">
          <div className="w-full max-w-[360px]">
            <TagInput values={opts.cache_exclude_cookies} onChange={(v) => set('cache_exclude_cookies', v)} placeholder="Cookie name…" />
          </div>
        </Row>
        <Row label="Excluded User-Agents" hint="Never cache requests from these user agent strings" last>
          <div className="w-full max-w-[360px]">
            <TagInput values={opts.cache_exclude_ua} onChange={(v) => set('cache_exclude_ua', v)} placeholder="User-agent substring…" />
          </div>
        </Row>
      </Card>

      <Card>
        <CardHead
          title="Scheduled Cache Clearing"
          icon="clock"
          color="var(--text3)"
          action={
            <Btn variant="danger" size="sm" icon="trash" onClick={() => toast('Cache cleared', 'All cached pages removed.', 'success')}>
              Clear All Cache
            </Btn>
          }
        />
        <div className="p-[14px_20px] flex gap-[10px] flex-wrap">
          {[
            { l: 'Clear Page Cache', c: 'secondary' },
            { l: 'Clear CSS Cache', c: 'secondary' },
            { l: 'Clear JS Cache', c: 'secondary' },
            { l: 'Clear Object Cache', c: 'secondary' },
          ].map((b) => (
            <Btn key={b.l} variant={b.c as any} size="sm" icon="trash" onClick={() => toast(`${b.l.replace('Clear ', '')} cleared`, '', 'success')}>
              {b.l}
            </Btn>
          ))}
        </div>
      </Card>
    </div>
  );
}
