import React from 'react';
import { Card, CardHead, Row, Toggle, Badge, Input, TagInput } from '../components/Primitives';
import type { SpeedPressOptions } from '../types';

export function PageMedia({
  opts,
  set,
}: {
  opts: SpeedPressOptions;
  set: (k: keyof SpeedPressOptions, v: any) => void;
}) {
  return (
    <div className="flex flex-col gap-[16px] animate-[fadeUp_0.3s_ease]">
      <Card>
        <CardHead title="Image Optimization" desc="Optimize how images are served to your visitors" icon="image" color="var(--green)" />
        <Row label="WebP Conversion" hint="Auto-convert JPEG/PNG to WebP (requires server support)">
          <div className="flex items-center gap-[6px]">
            <Badge color="green">~30% smaller</Badge>
            <Toggle checked={opts.webp} onChange={(v) => set('webp', v)} />
          </div>
        </Row>
        <Row label="AVIF Support" hint="Next-gen format, even smaller than WebP">
          <div className="flex items-center gap-[6px]">
            <Badge color="blue">~50% smaller</Badge>
            <Toggle checked={opts.avif} onChange={(v) => set('avif', v)} />
          </div>
        </Row>
        <Row label="Compress Images" hint="Losslessly compress uploaded images">
          <Toggle checked={opts.img_compress} onChange={(v) => set('img_compress', v)} />
        </Row>
        <Row label="Auto-Resize Images" hint="Resize oversized images on upload">
          <Toggle checked={opts.img_resize} onChange={(v) => set('img_resize', v)} />
        </Row>
        <Row label="Async Image Decoding" hint="Add decoding='async' to all non-critical images">
          <Toggle checked={opts.img_decoding_async} onChange={(v) => set('img_decoding_async', v)} />
        </Row>
        <Row label="Image Placeholders (LQIP)" hint="Generate low-quality blurred placeholders for lazy-loaded images">
          <Toggle checked={opts.img_lqip} onChange={(v) => set('img_lqip', v)} />
        </Row>
        <Row label="Strip EXIF Metadata" hint="Remove GPS, camera info from images">
          <Toggle checked={opts.strip_meta} onChange={(v) => set('strip_meta', v)} />
        </Row>
        <Row label="Adaptive Images" hint="Serve different image sizes based on visitor resolution">
          <Toggle checked={opts.adaptive_images} onChange={(v) => set('adaptive_images', v)} />
        </Row>
        <Row label="SVG Sanitization" hint="Clean SVG files of malicious code and minify XML" last>
          <Toggle checked={opts.svg_sanitization} onChange={(v) => set('svg_sanitization', v)} />
        </Row>
      </Card>

      <Card>
        <CardHead title="Lazy Loading" desc="Delay loading of non-critical media elements" icon="mouse" color="var(--amber)" />
        <Row label="Lazy Load Images" hint="Delay loading images until they enter the viewport">
          <Toggle checked={opts.lazy_images} onChange={(v) => set('lazy_images', v)} />
        </Row>
        {opts.lazy_images && (
          <Row label="Exclude Images" hint="CSS classes or filenames to exclude from lazy loading (one per line)" indent>
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
        <Row label="Lazy Load CSS Backgrounds" hint="Delay loading background images defined in CSS">
          <Toggle checked={opts.lazy_load_css_bg} onChange={(v) => set('lazy_load_css_bg', v)} />
        </Row>
        {opts.lazy_load_css_bg && (
          <>
            <Row label="Advanced Detection" hint="Use a script to detect background images in complex CSS" indent>
              <Toggle checked={opts.lazy_load_css_bg_advanced} onChange={(v) => set('lazy_load_css_bg_advanced', v)} />
            </Row>
            <Row label="Exclude Backgrounds" hint="CSS selectors to exclude from background lazy loading" indent>
              <div className="w-full sm:w-[400px]">
                <TagInput values={opts.lazy_load_css_bg_exclude} onChange={(v) => set('lazy_load_css_bg_exclude', v)} placeholder="e.g. .hero-bg, #header" />
              </div>
            </Row>
          </>
        )}
        <Row label="Video Facades" hint="Load a static preview image instead of heavy video players" last>
          <div className="flex flex-col gap-[8px] w-full max-w-[400px]">
            <div className="flex items-center justify-between p-[8px] bg-[var(--surface2)] rounded-[6px]">
              <div className="text-[12px] font-medium">YouTube</div>
              <Toggle checked={opts.yt_preview} onChange={(v) => set('yt_preview', v)} />
            </div>
            <div className="flex items-center justify-between p-[8px] bg-[var(--surface2)] rounded-[6px]">
              <div className="text-[12px] font-medium">Wistia</div>
              <Toggle checked={opts.video_facades_wistia} onChange={(v) => set('video_facades_wistia', v)} />
            </div>
            <div className="flex items-center justify-between p-[8px] bg-[var(--surface2)] rounded-[6px]">
              <div className="text-[12px] font-medium">DailyMotion</div>
              <Toggle checked={opts.video_facades_dailymotion} onChange={(v) => set('video_facades_dailymotion', v)} />
            </div>
          </div>
        </Row>
      </Card>

      <Card>
        <CardHead title="Hero Image Preload" desc="Preload your LCP image for faster above-the-fold rendering" icon="zap" color="var(--accent)" />
        <Row label="Preload Hero Image" hint='Adds <link rel="preload"> for your main hero image'>
          <Toggle checked={opts.preload_hero} onChange={(v) => set('preload_hero', v)} />
        </Row>
        <Row label="Hero Image URL" hint="Leave blank to auto-detect from the page" last>
          <div className="w-full sm:w-[300px]">
            <Input value={opts.preload_hero_img} onChange={(v) => set('preload_hero_img', v)} placeholder="https://example.com/hero.jpg" mono />
          </div>
        </Row>
      </Card>
    </div>
  );
}
