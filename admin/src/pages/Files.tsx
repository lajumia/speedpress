import React from 'react';
import { Card, CardHead, Row, Toggle, Badge, Textarea, TagInput, Input } from '../components/Primitives';
import type { SpeedPressOptions } from '../types';

export function PageFiles({
  opts,
  set,
}: {
  opts: SpeedPressOptions;
  set: (k: keyof SpeedPressOptions, v: any) => void;
}) {
  return (
    <div className="flex flex-col gap-[16px] animate-[fadeUp_0.3s_ease]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px]">
        <Card>
          <CardHead title="CSS Optimization" icon="code" color="var(--purple)" badge={{ label: 'Styles', color: 'purple' }} />
          <Row label="Minify CSS" hint="Remove whitespace, comments and unnecessary characters">
            <Toggle checked={opts.min_css} onChange={(v) => set('min_css', v)} />
          </Row>
          {opts.min_css && (
            <Row label="Minify Exclusions" hint="Exclude specific CSS files from minification (handles or URLs)" indent>
              <div className="w-full sm:w-[240px]">
                <TagInput values={opts.min_css_exclude} onChange={(v) => set('min_css_exclude', v)} placeholder="style-handle" />
              </div>
            </Row>
          )}
          <Row label="Combine CSS Files" hint="Merge multiple CSS files into one to reduce HTTP requests">
            <Toggle checked={opts.combine_css} onChange={(v) => set('combine_css', v)} />
          </Row>
          {opts.combine_css && (
            <Row label="Combine Exclusions" hint="Exclude specific CSS files from being merged" indent>
              <div className="w-full sm:w-[240px]">
                <TagInput values={opts.combine_css_exclude} onChange={(v) => set('combine_css_exclude', v)} placeholder="style-handle" />
              </div>
            </Row>
          )}
          <Row label="Async CSS Loading" hint="Load non-critical CSS asynchronously to unblock rendering">
            <Toggle checked={opts.async_css} onChange={(v) => set('async_css', v)} />
          </Row>
          {opts.async_css && (
            <Row label="Async Exclusions" hint="Exclude specific CSS files from being loaded asynchronously" indent>
              <div className="w-full sm:w-[240px]">
                <TagInput values={opts.async_css_exclude} onChange={(v) => set('async_css_exclude', v)} placeholder="style-handle" />
              </div>
            </Row>
          )}
          <Row label="Remove Unused CSS" hint="Strip CSS rules not used on the current page">
            <div className="flex items-center gap-[6px]">
              <Badge color="amber">Beta</Badge>
              <Toggle checked={opts.remove_unused_css} onChange={(v) => set('remove_unused_css', v)} />
            </div>
          </Row>
          {opts.remove_unused_css && (
            <>
              <Row label="Automatic CSS Extraction" hint="Automatically identify and extract used CSS for each page" indent>
                <Toggle checked={opts.rucss_automatic} onChange={(v) => set('rucss_automatic', v)} />
              </Row>
              <Row label="Per Page Type CSS" hint="Generate separate used CSS for Posts, Pages, and Archives" indent>
                <Toggle checked={opts.rucss_per_page_type} onChange={(v) => set('rucss_per_page_type', v)} />
              </Row>
              <Row label="Unused CSS Exclusions" hint="Keep these CSS selectors even if they appear unused" indent last={!opts.preload_css?.length}>
                <div className="w-full sm:w-[240px]">
                  <TagInput values={opts.css_exclude_handles || []} onChange={(v) => set('css_exclude_handles', v)} placeholder=".my-class" />
                </div>
              </Row>
            </>
          )}
          <Row label="Preload CSS" hint="Add <link rel='preload'> for these stylesheets" last>
            <div className="w-full sm:w-[240px]">
              <TagInput values={opts.preload_css} onChange={(v) => set('preload_css', v)} placeholder="/style.css" />
            </div>
          </Row>
        </Card>
        <Card>
          <CardHead title="JavaScript Optimization" icon="code" color="var(--cyan)" badge={{ label: 'Scripts', color: 'cyan' }} />
          <Row label="Minify JS" hint="Remove whitespace and shorten variable names">
            <Toggle checked={opts.min_js} onChange={(v) => set('min_js', v)} />
          </Row>
          {opts.min_js && (
            <Row label="Minify Exclusions" hint="Exclude specific JS files from minification" indent>
              <div className="w-full sm:w-[240px]">
                <TagInput values={opts.min_js_exclude} onChange={(v) => set('min_js_exclude', v)} placeholder="script-handle" />
              </div>
            </Row>
          )}
          <Row label="Combine JS Files" hint="Merge multiple JS files into one">
            <Toggle checked={opts.combine_js} onChange={(v) => set('combine_js', v)} />
          </Row>
          {opts.combine_js && (
            <Row label="Combine Exclusions" hint="Exclude specific JS files from being merged" indent>
              <div className="w-full sm:w-[240px]">
                <TagInput values={opts.combine_js_exclude} onChange={(v) => set('combine_js_exclude', v)} placeholder="script-handle" />
              </div>
            </Row>
          )}
          <Row label="Defer JavaScript" hint="Load JS after page is fully parsed">
            <Toggle checked={opts.defer_js} onChange={(v) => set('defer_js', v)} />
          </Row>
          {opts.defer_js && (
            <Row label="Defer Exclusions" hint="Exclude specific JS files from being deferred" indent>
              <div className="w-full sm:w-[240px]">
                <TagInput values={opts.defer_js_exclude} onChange={(v) => set('defer_js_exclude', v)} placeholder="script-handle" />
              </div>
            </Row>
          )}
          <Row label="Delay JS Execution" hint="Execute JS only after first user interaction (boosts LCP)">
            <div className="flex items-center gap-[6px]">
              <Badge color="blue">New</Badge>
              <Toggle checked={opts.delay_js} onChange={(v) => set('delay_js', v)} />
            </div>
          </Row>
          {opts.delay_js && (
            <>
              <Row label="Delay until Interaction" hint="Wait for scroll, click or mouse move before loading scripts" indent>
                <Toggle checked={opts.delay_js_on_interaction} onChange={(v) => set('delay_js_on_interaction', v)} />
              </Row>
              <Row label="Delay Timeout" hint="Automatically execute delayed scripts after X seconds" indent>
                <div className="w-full sm:w-[120px]">
                  <Input 
                    type="number" 
                    value={opts.delay_js_timeout} 
                    onChange={(v) => set('delay_js_timeout', parseInt(v) || 0)} 
                    suffix="s" 
                    small 
                  />
                </div>
              </Row>
              <Row label="Delay Exclusions" hint="Exclude specific JS files from being delayed" indent last={!opts.preload_js?.length}>
                <div className="w-full sm:w-[240px]">
                  <TagInput values={opts.delay_js_exclude} onChange={(v) => set('delay_js_exclude', v)} placeholder="script-handle" />
                </div>
              </Row>
            </>
          )}
          <Row label="Script Manager UI" hint="Enable a visual interface to manage scripts per page" last={!opts.preload_js?.length}>
            <Toggle checked={opts.script_manager_ui} onChange={(v) => set('script_manager_ui', v)} />
          </Row>
          <Row label="Preload JS" hint="Add <link rel='preload'> for these scripts" last>
            <div className="w-full sm:w-[240px]">
              <TagInput values={opts.preload_js} onChange={(v) => set('preload_js', v)} placeholder="/script.js" />
            </div>
          </Row>
        </Card>
      </div>

      <Card>
        <CardHead 
          title="Advanced Optimizations" 
          desc="Experimental and structure-level performance enhancements" 
          icon="zap" 
          color="var(--cyan)" 
          badge={{ label: 'Advanced', color: 'blue' }}
        />
        <Row label="PartyTown Integration" hint="Run third-party scripts in a web worker to offload the main thread">
          <Toggle checked={opts.partytown} onChange={(v) => set('partytown', v)} />
        </Row>
        {opts.partytown && (
          <Row label="Scripts to Offload" hint="Enter handles or script URLs to run via PartyTown" indent>
            <div className="w-full max-w-[360px]">
              <TagInput values={opts.partytown_scripts} onChange={(v) => set('partytown_scripts', v)} placeholder="google-analytics" />
            </div>
          </Row>
        )}
        <Row label="Minify HTML Output" hint="Remove whitespace, comments and newlines from HTML" last>
          <Toggle checked={opts.min_html} onChange={(v) => set('min_html', v)} />
        </Row>
      </Card>
      <Card>
        <CardHead
          title="Critical CSS"
          desc="Inline above-the-fold styles to eliminate render-blocking"
          icon="zap"
          color="var(--amber)"
          badge={{ label: 'Core Web Vitals', color: 'amber' }}
          action={<Toggle checked={opts.critical_css} onChange={(v) => set('critical_css', v)} />}
        />
        <Row label="Inline Critical CSS" hint="Inject critical styles directly into <head> for instant first paint">
          <Toggle checked={opts.inline_critical} onChange={(v) => set('inline_critical', v)} />
        </Row>
        <Row label="Remove Render-Blocking Resources" hint="Automatically detect and defer render-blocking CSS/JS" last>
          <div className="flex items-center gap-[6px]">
            <Badge color="orange">Advanced</Badge>
            <Toggle checked={opts.remove_render_blocking} onChange={(v) => set('remove_render_blocking', v)} />
          </div>
        </Row>
        <div className="p-[0_20px_16px]">
          <div className="text-[12px] text-[var(--text3)] mb-[8px]">
            Custom Critical CSS <span className="text-[var(--text4)]">(injected before all stylesheets)</span>
          </div>
          <Textarea
            value={opts.critical_css_custom}
            onChange={(v) => set('critical_css_custom', v)}
            placeholder={'/* Paste your above-the-fold CSS here */\nbody { margin: 0; }\nh1 { font-size: 2rem; }'}
            rows={5}
            mono
          />
        </div>
      </Card>
    </div>
  );
}
