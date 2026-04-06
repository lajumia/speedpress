import React from 'react';
import { Card, CardHead, Row, Toggle, Badge, Select, Input, TagInput } from '../components/Primitives';
import type { SpeedPressOptions } from '../types';

export function PageLazyLoad({
  opts,
  set,
}: {
  opts: SpeedPressOptions;
  set: (k: keyof SpeedPressOptions, v: any) => void;
}) {
  return (
    <div className="flex flex-col gap-[16px] animate-[fadeUp_0.3s_ease]">
      <Card>
        <CardHead 
          title="Lazy Loading Settings" 
          desc="Delay loading of non-critical elements until they are needed"
          icon="mouse" 
          color="var(--amber)" 
        />
        <Row label="Lazy Load Images" hint="Delay loading images until they enter the viewport">
          <div className="flex items-center gap-[8px]">
            <Badge color="amber">Recommended</Badge>
            <Toggle checked={opts.lazy_images} onChange={(v) => set('lazy_images', v)} />
          </div>
        </Row>
        {opts.lazy_images && (
          <Row label="Exclude Images" hint="CSS classes or filenames to exclude from lazy loading" indent>
            <div className="w-full sm:w-[400px]">
              <TagInput values={opts.lazy_images_exclude} onChange={(v) => set('lazy_images_exclude', v)} placeholder="e.g. .no-lazy, logo.png" />
            </div>
          </Row>
        )}
        <Row label="Lazy Load Iframes" hint="Delay loading iframes (like maps, embeds)">
          <Toggle checked={opts.lazy_iframes} onChange={(v) => set('lazy_iframes', v)} />
        </Row>
        {opts.lazy_iframes && (
          <Row label="Exclude Iframes" hint="CSS classes or source URLs to exclude from lazy loading" indent>
            <div className="w-full sm:w-[400px]">
              <TagInput values={opts.lazy_iframes_exclude} onChange={(v) => set('lazy_iframes_exclude', v)} placeholder="e.g. .essential-iframe, chat-widget" />
            </div>
          </Row>
        )}
        <Row label="Lazy Load Videos" hint="Delay loading video elements">
          <Toggle checked={opts.lazy_videos} onChange={(v) => set('lazy_videos', v)} />
        </Row>
        <Row label="Lazy Load CSS Backgrounds" hint="Delay loading background images defined in CSS">
          <Toggle checked={opts.lazy_load_css_bg} onChange={(v) => set('lazy_load_css_bg', v)} />
        </Row>
        {opts.lazy_load_css_bg && (
          <Row label="Exclude Backgrounds" hint="CSS selectors to exclude from background lazy loading" indent last>
            <div className="w-full sm:w-[400px]">
              <TagInput values={opts.lazy_load_css_bg_exclude} onChange={(v) => set('lazy_load_css_bg_exclude', v)} placeholder="e.g. .hero-bg, #header" />
            </div>
          </Row>
        )}
      </Card>

      <Card>
        <CardHead title="Advanced Lazy Loading" icon="settings" color="var(--text3)" />
        <Row label="Native Lazy Loading" hint="Use browser's native loading='lazy' attribute when possible">
          <Toggle checked={opts.lazy_load_native} onChange={(v) => set('lazy_load_native', v)} />
        </Row>
        <Row label="Viewport Threshold" hint="How many pixels before the element enters the viewport to start loading">
          <div className="flex items-center gap-[8px]">
            <Input 
              type="number"
              value={opts.lazy_load_threshold} 
              onChange={(v) => set('lazy_load_threshold', parseInt(v))} 
              placeholder="300"
            />
            <span className="text-[11px] text-[var(--text4)]">px</span>
          </div>
        </Row>
        <Row label="YouTube Preview Images" hint="Replace YouTube iframes with a static preview image until clicked">
          <Toggle checked={opts.lazy_load_youtube} onChange={(v) => set('lazy_load_youtube', v)} />
        </Row>
        <Row label="Vimeo Preview Images" hint="Replace Vimeo iframes with a static preview image until clicked">
          <Toggle checked={opts.lazy_load_vimeo} onChange={(v) => set('lazy_load_vimeo', v)} />
        </Row>
        <Row label="Google Maps Facade" hint="Replace Google Maps with a static image until clicked" last>
          <Toggle checked={opts.lazy_load_gmaps} onChange={(v) => set('lazy_load_gmaps', v)} />
        </Row>
      </Card>

      <div className="bg-[var(--amber-bg)] border border-[var(--amber-border)] rounded-[12px] p-[20px] flex gap-[16px] items-start">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[var(--amber)] flex items-center justify-center text-white shrink-0">
          <span className="w-[20px] h-[20px]">🖼️</span>
        </div>
        <div>
          <div className="text-[14px] font-bold text-[var(--amber)] mb-[4px]">Performance Tip: Above the Fold</div>
          <div className="text-[12px] text-[var(--text3)] leading-[1.6]">
            Never lazy load images that are visible "above the fold" (the initial view when a page loads). Doing so will negatively impact your Largest Contentful Paint (LCP) score. Use the <strong className="text-[var(--text2)]">Preload Hero Images</strong> setting in Core Web Vitals instead.
          </div>
        </div>
      </div>
    </div>
  );
}
