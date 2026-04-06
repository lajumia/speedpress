import React from 'react';
import { Card, CardHead, Row, Toggle, Badge, Input, Btn } from '../components/Primitives';
import type { SpeedPressOptions } from '../types';

export function PageFonts({
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
          title="Google Fonts Optimization" 
          desc="Optimize how Google Fonts are loaded on your site"
          icon="font" 
          color="var(--blue)" 
        />
        <Row label="Host Google Fonts Locally" hint="Download Google Fonts to your server to reduce DNS lookups and improve GDPR compliance">
          <div className="flex items-center gap-[8px]">
            <Badge color="blue">GDPR</Badge>
            <Toggle checked={opts.fonts_local} onChange={(v) => set('fonts_local', v)} />
          </div>
        </Row>
        <Row label="Remove Google Fonts" hint="Completely prevent Google Fonts from loading (useful if using local fonts manually)">
          <Toggle checked={opts.fonts_remove_google} onChange={(v) => set('fonts_remove_google', v)} />
        </Row>
        <Row label="Font-Display: Swap" hint="Add font-display: swap to all font declarations to prevent invisible text during load">
          <Toggle checked={opts.fonts_display_swap} onChange={(v) => set('fonts_display_swap', v)} />
        </Row>
        <Row label="Preload Local Fonts" hint="Automatically preload fonts hosted on your server">
          <Toggle checked={opts.fonts_preload_local} onChange={(v) => set('fonts_preload_local', v)} />
        </Row>
        <Row label="Localize Gravatars" hint="Cache Gravatar images locally to avoid DNS lookups to secure.gravatar.com" last>
          <div className="flex items-center gap-[8px]">
            <Badge color="green">New</Badge>
            <Toggle checked={opts.fonts_localize_gravatars} onChange={(v) => set('fonts_localize_gravatars', v)} />
          </div>
        </Row>
      </Card>

      <Card>
        <CardHead title="Local Font Settings" icon="settings" color="var(--text3)" />
        <Row label="Storage Path" hint="Where downloaded fonts will be stored on your server">
          <Input 
            value={opts.fonts_local_path} 
            onChange={(v) => set('fonts_local_path', v)} 
            placeholder="/wp-content/uploads/speedpress-fonts/"
          />
        </Row>
        <div className="p-[16px_20px] bg-[var(--bg2)] border-t border-[var(--border)] flex items-center justify-between">
          <div className="text-[11px] text-[var(--text3)]">
            Currently hosting <strong className="text-[var(--text2)]">4 fonts</strong> (Inter, Roboto, Open Sans, Montserrat)
          </div>
          <Btn size="sm" variant="secondary" icon="refresh" onClick={() => toast('Fonts refreshed', 'All local font files have been updated.', 'success')}>
            Refresh Local Fonts
          </Btn>
        </div>
      </Card>

      <div className="bg-[var(--accent-bg)] border border-[var(--accent-border)] rounded-[12px] p-[20px] flex gap-[16px] items-start">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[var(--accent)] flex items-center justify-center text-white shrink-0">
          <span className="w-[20px] h-[20px]">💡</span>
        </div>
        <div>
          <div className="text-[14px] font-bold text-[var(--accent)] mb-[4px]">Pro Tip: Variable Fonts</div>
          <div className="text-[12px] text-[var(--text3)] leading-[1.6]">
            Using variable fonts can reduce the number of font files loaded from 5-10 down to just 1 or 2, significantly improving your LCP and reducing layout shifts.
          </div>
        </div>
      </div>
    </div>
  );
}
