import React from 'react';
import { Card, CardHead, Btn, Badge, Row, Toggle, Textarea } from '../components/Primitives';
import type { SpeedPressOptions } from '../types';

export function PageDeveloper({
  opts,
  set,
  toast,
}: {
  opts: SpeedPressOptions;
  set: (k: keyof SpeedPressOptions, v: any) => void;
  toast: (title: string, msg: string, type?: any) => void;
}) {
  return (
    <div className="flex flex-col gap-[16px] animate-[fadeUp_0.3s_ease]">
      <Card>
        <CardHead title="WP-CLI Commands" desc="Manage SpeedPress from the command line" icon="dev" color="var(--purple)" />
        <div className="p-[16px_20px] flex flex-col gap-[8px]">
          {[
            { cmd: 'wp speedpress cache clear', desc: 'Clear all cached pages' },
            { cmd: 'wp speedpress cache preload', desc: 'Warm the cache from sitemap' },
            { cmd: 'wp speedpress db clean', desc: 'Run database cleanup' },
            { cmd: 'wp speedpress optimize', desc: 'Apply all recommended settings' },
            { cmd: 'wp speedpress status', desc: 'Show current status and stats' },
          ].map((c) => (
            <div
              key={c.cmd}
              className="bg-[var(--surface2)] border border-[var(--border)] rounded-[8px] p-[10px_14px] flex justify-between items-center"
            >
              <div>
                <code className="text-[12px] font-mono text-[var(--accent)] font-semibold">{c.cmd}</code>
                <div className="text-[11px] text-[var(--text4)] mt-[2px]">{c.desc}</div>
              </div>
              <Btn variant="ghost" size="sm" icon="copy" onClick={() => toast('Copied!', c.cmd, 'success')}>
                Copy
              </Btn>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <CardHead title="Action Hooks & Filters" icon="dev" color="var(--cyan)" />
        <div className="p-[16px_20px] flex flex-col gap-[6px]">
          {[
            { hook: 'speedpress_before_cache_write', type: 'action', desc: 'Fires before writing cache file' },
            { hook: 'speedpress_after_cache_clear', type: 'action', desc: 'Fires after cache is cleared' },
            { hook: 'speedpress_cache_exclude_urls', type: 'filter', desc: 'Filter array of excluded URLs' },
            { hook: 'speedpress_minify_css_output', type: 'filter', desc: 'Filter minified CSS output' },
            { hook: 'speedpress_is_cacheable', type: 'filter', desc: 'Filter whether current page is cacheable' },
          ].map((h) => (
            <div
              key={h.hook}
              className="flex items-center gap-[10px] p-[8px_12px] bg-[var(--surface2)] rounded-[7px] border border-[var(--border)]"
            >
              <Badge color={h.type === 'action' ? 'blue' : 'purple'}>{h.type as any}</Badge>
              <code className="text-[12px] font-mono text-[var(--text2)] flex-1">{h.hook}</code>
              <span className="text-[11px] text-[var(--text4)]">{h.desc}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <CardHead title="Debug & Safe Mode" icon="shield" color="var(--amber)" />
        <Row label="Safe Mode" hint="Apply optimizations for preview only — no live impact">
          <div className="flex items-center gap-[6px]">
            <Badge color="blue">Non-destructive</Badge>
            <Toggle checked={opts.safe_mode} onChange={(v) => set('safe_mode', v)} />
          </div>
        </Row>
        <Row label="Conflict Detection" hint="Detect incompatible plugins and themes">
          <Toggle checked={opts.conflict_detection} onChange={(v) => set('conflict_detection', v)} />
        </Row>
        <Row label="Automatic Rollback" hint="Roll back changes if a fatal error is detected" last>
          <Toggle checked={opts.auto_rollback} onChange={(v) => set('auto_rollback', v)} />
        </Row>
      </Card>
      <Card>
        <CardHead title="Regex Exclusion Rules" icon="code" color="var(--text3)" />
        <div className="p-[12px_20px_16px]">
          <div className="text-[12px] text-[var(--text3)] mb-[8px]">Advanced URL exclusion patterns using regular expressions</div>
          <Textarea value="" onChange={() => {}} placeholder={'/product/[0-9]+/\n/category/(.*)/\n/wp-admin/(.*)'} rows={4} mono />
        </div>
      </Card>
    </div>
  );
}
