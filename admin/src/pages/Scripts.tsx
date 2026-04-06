import React from 'react';
import { Card, CardHead, Row, Toggle, Badge, Select } from '../components/Primitives';
import type { SpeedPressOptions } from '../types';

export function PageScripts({
  opts,
  set,
}: {
  opts: SpeedPressOptions;
  set: (k: keyof SpeedPressOptions, v: any) => void;
}) {
  return (
    <div className="flex flex-col gap-[16px] animate-[fadeUp_0.3s_ease]">
      <Card>
        <CardHead title="WordPress Bloat Removal" icon="script" color="var(--red)" />
        <Row label="Disable Emojis" hint="Remove wp-emoji-release.min.js (~10KB savings)">
          <div className="flex items-center gap-[6px]">
            <Badge color="green">~10KB</Badge>
            <Toggle checked={opts.disable_emojis} onChange={(v) => set('disable_emojis', v)} />
          </div>
        </Row>
        <Row label="Disable Embeds" hint="Remove oEmbed scripts that auto-embed links">
          <div className="flex items-center gap-[6px]">
            <Badge color="green">~6KB</Badge>
            <Toggle checked={opts.disable_embeds} onChange={(v) => set('disable_embeds', v)} />
          </div>
        </Row>
        <Row label="Disable jQuery Migrate" hint="Remove legacy jQuery support script">
          <div className="flex items-center gap-[6px]">
            <Badge color="green">~8KB</Badge>
            <Toggle checked={opts.disable_jquery_migrate} onChange={(v) => set('disable_jquery_migrate', v)} />
          </div>
        </Row>
        <Row label="Disable Dashicons" hint="Remove Dashicons from frontend for non-admins">
          <div className="flex items-center gap-[6px]">
            <Badge color="green">~30KB</Badge>
            <Toggle checked={opts.disable_dashicons} onChange={(v) => set('disable_dashicons', v)} />
          </div>
        </Row>
        <Row label="Disable RSS Feeds" hint="Disable all WordPress RSS feeds if you don't use them">
          <Toggle checked={opts.disable_rss} onChange={(v) => set('disable_rss', v)} />
        </Row>
        <Row label="Remove RSS Links" hint="Remove RSS feed links from the head">
          <Toggle checked={opts.disable_rss_links} onChange={(v) => set('disable_rss_links', v)} />
        </Row>
        <Row label="Disable Password Strength" hint="Remove the heavy password strength meter script from the frontend">
          <Toggle checked={opts.disable_password_strength} onChange={(v) => set('disable_password_strength', v)} />
        </Row>
        <Row label="Remove Query Strings" hint="Remove version query strings from CSS/JS for better caching" last>
          <Toggle checked={opts.remove_query_strings} onChange={(v) => set('remove_query_strings', v)} />
        </Row>
      </Card>

      <Card>
        <CardHead title="Gutenberg Optimization" icon="code" color="var(--indigo)" />
        <Row label="Disable Block Library CSS" hint="Remove default Gutenberg block styles (38KB)">
          <Toggle checked={opts.disable_block_library} onChange={(v) => set('disable_block_library', v)} />
        </Row>
        <Row label="Disable Global Styles" hint="Remove theme.json generated styles and SVG filters">
          <Toggle checked={opts.disable_global_styles} onChange={(v) => set('disable_global_styles', v)} />
        </Row>
        <Row label="Disable Gutenberg Editor" hint="Switch back to the Classic Editor for all post types">
          <Toggle checked={opts.disable_gutenberg} onChange={(v) => set('disable_gutenberg', v)} />
        </Row>
        <Row label="Disable Block Widgets" hint="Restore the classic widgets screen">
          <Toggle checked={opts.disable_block_widgets} onChange={(v) => set('disable_block_widgets', v)} />
        </Row>
        <Row label="Disable SVG Filters" hint="Remove the inline SVG filters injected by WordPress" last>
          <Toggle checked={opts.disable_svg_filters} onChange={(v) => set('disable_svg_filters', v)} />
        </Row>
      </Card>

      <Card>
        <CardHead 
          title="Heartbeat API Control" 
          desc="WordPress Heartbeat AJAX runs on every page and consumes server resources"
          icon="heart" 
          color="var(--red)" 
          action={<Toggle checked={!opts.disable_heartbeat} onChange={(v) => set('disable_heartbeat', !v)} />}
        />
        <Row label="Heartbeat in Dashboard" hint="Control how often the WordPress admin pings the server">
          <Select 
            value={opts.heartbeat_dashboard} 
            onChange={(v) => set('heartbeat_dashboard', v)} 
            options={[
              { value: 'default', label: 'Default (15s)' },
              { value: 'modify', label: 'Modify (60s)' },
              { value: 'disable', label: 'Disable' },
            ]}
          />
        </Row>
        <Row label="Heartbeat in Editor" hint="Control how often the post editor auto-saves and pings the server">
          <Select 
            value={opts.heartbeat_editor} 
            onChange={(v) => set('heartbeat_editor', parseInt(v))} 
            options={[
              { value: 15, label: '15s' },
              { value: 60, label: '60s (recommended)' },
              { value: 120, label: '2 min' },
              { value: 300, label: '5 min' },
            ]}
          />
        </Row>
        <Row label="Heartbeat in Frontend" hint="Control how often the frontend pings the server (usually for e-commerce or notifications)" last>
          <Select 
            value={opts.heartbeat_frontend} 
            onChange={(v) => set('heartbeat_frontend', v)} 
            options={[
              { value: 'default', label: 'Default' },
              { value: 'modify', label: 'Modify (120s)' },
              { value: 'disable', label: 'Disable (recommended)' },
            ]}
          />
        </Row>
      </Card>

      <div className="bg-[var(--red-bg)] border border-[var(--red-border)] rounded-[12px] p-[20px] flex gap-[16px] items-start">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[var(--red)] flex items-center justify-center text-white shrink-0">
          <span className="w-[20px] h-[20px]">❤️</span>
        </div>
        <div>
          <div className="text-[14px] font-bold text-[var(--red)] mb-[4px]">Why control Heartbeat?</div>
          <div className="text-[12px] text-[var(--text3)] leading-[1.6]">
            The WordPress Heartbeat API uses admin-ajax.php to communicate with the server. On shared hosting or high-traffic sites, this can lead to high CPU usage and slow down your site or even cause your server to crash. Disabling or modifying it can significantly reduce server load.
          </div>
        </div>
      </div>
    </div>
  );
}
