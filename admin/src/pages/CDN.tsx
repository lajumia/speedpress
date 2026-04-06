import React from 'react';
import { Card, CardHead, Row, Toggle, Input, Btn, TagInput } from '../components/Primitives';
import type { SpeedPressOptions } from '../types';

export function PageCDN({
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
        <CardHead
          title="CDN URL Rewriting"
          icon="cdn"
          color="var(--blue)"
          action={<Toggle checked={opts.cdn_enabled} onChange={(v) => set('cdn_enabled', v)} />}
        />
        <Row label="CDN Base URL" hint="All matching assets will be rewritten to this domain">
          <div className="w-full max-w-[300px]">
            <Input value={opts.cdn_url} onChange={(v) => set('cdn_url', v)} placeholder="https://cdn.example.com" mono />
          </div>
        </Row>
        <Row label="Images Only" hint="Only rewrite image file URLs through CDN">
          <Toggle checked={opts.cdn_images_only} onChange={(v) => set('cdn_images_only', v)} />
        </Row>
        <Row label="Static Assets Only" hint="Rewrite CSS, JS, fonts and images — not dynamic URLs">
          <Toggle checked={opts.cdn_static_only} onChange={(v) => set('cdn_static_only', v)} />
        </Row>
        <Row label="Auto Purge CDN" hint="Automatically invalidate CDN cache when content changes" last>
          <Toggle checked={opts.cdn_auto_purge} onChange={(v) => set('cdn_auto_purge', v)} />
        </Row>
      </Card>
      <Card>
        <CardHead
          title="Cloudflare Integration"
          desc="Direct API integration with Cloudflare"
          icon="shield"
          color="var(--amber)"
          badge={{ label: 'Premium', color: 'amber' }}
          action={<Toggle checked={opts.cdn_cf_enabled} onChange={(v) => set('cdn_cf_enabled', v)} />}
        />
        <Row label="Cloudflare Zone ID">
          <div className="w-full max-w-[260px]">
            <Input value={opts.cdn_cf_zone} onChange={(v) => set('cdn_cf_zone', v)} placeholder="abc123def456…" mono />
          </div>
        </Row>
        <Row label="Cloudflare API Key" last>
          <div className="w-full max-w-[260px]">
            <Input value={opts.cdn_cf_key} onChange={(v) => set('cdn_cf_key', v)} placeholder="Your API token" mono />
          </div>
        </Row>
        {opts.cdn_cf_enabled && (
          <div className="p-[0_20px_16px] flex gap-[8px]">
            <Btn variant="secondary" size="sm" icon="trash" onClick={() => toast('Cloudflare cache purged', 'Edge cache cleared.', 'success')}>
              Purge CF Cache
            </Btn>
            <Btn variant="secondary" size="sm" icon="check" onClick={() => toast('Connected', 'Cloudflare API is working.', 'success')}>
              Test Connection
            </Btn>
          </div>
        )}
      </Card>
      <Card>
        <CardHead title="CDN File Extensions" icon="settings" color="var(--text3)" />
        <Row label="Extensions to Rewrite" hint="Only files with these extensions will use the CDN URL" last>
          <div className="w-full max-w-[360px]">
            <TagInput values={opts.cdn_exts} onChange={(v) => set('cdn_exts', v)} placeholder="Add extension…" />
          </div>
        </Row>
      </Card>
    </div>
  );
}
