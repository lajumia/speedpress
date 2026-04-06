import React from 'react';
import { Card, CardHead, Row, Toggle, Badge, Input, Btn } from '../components/Primitives';
import type { SpeedPressOptions } from '../types';

export function PageAnalytics({
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
          title="Local Analytics Hosting" 
          desc="Host Google Analytics and GTM scripts locally to reduce DNS lookups and improve privacy"
          icon="analytics" 
          color="var(--purple)" 
        />
        <Row label="Host Analytics Locally" hint="Download gtag.js or analytics.js to your server and serve it locally">
          <div className="flex items-center gap-[8px]">
            <Badge color="purple">Privacy</Badge>
            <Toggle checked={opts.analytics_local} onChange={(v) => set('analytics_local', v)} />
          </div>
        </Row>
        <Row label="Delay Analytics Execution" hint="Delay loading analytics until user interaction to improve initial load time">
          <Toggle checked={opts.analytics_delay} onChange={(v) => set('analytics_delay', v)} />
        </Row>
        <Row label="Anonymize IP" hint="Anonymize the last octet of the IP address for GDPR compliance" last>
          <Toggle checked={opts.analytics_anonymize} onChange={(v) => set('analytics_anonymize', v)} />
        </Row>
      </Card>

      <Card>
        <CardHead title="Analytics Configuration" icon="settings" color="var(--text3)" />
        <Row label="Google Analytics ID" hint="UA-XXXXX-Y or G-XXXXXXXXXX">
          <Input 
            value={opts.analytics_ga_id} 
            onChange={(v) => set('analytics_ga_id', v)} 
            placeholder="G-XXXXXXXXXX"
          />
        </Row>
        <Row label="Google Tag Manager ID" hint="GTM-XXXXXXX">
          <Input 
            value={opts.analytics_gtm_id} 
            onChange={(v) => set('analytics_gtm_id', v)} 
            placeholder="GTM-XXXXXXX"
          />
        </Row>
        <Row label="Facebook Pixel ID" hint="XXXXXXXXXXXXXXX" last>
          <Input 
            value={opts.analytics_fb_id} 
            onChange={(v) => set('analytics_fb_id', v)} 
            placeholder="XXXXXXXXXXXXXXX"
          />
        </Row>
        <div className="p-[16px_20px] bg-[var(--bg2)] border-t border-[var(--border)] flex items-center justify-between">
          <div className="text-[11px] text-[var(--text3)]">
            Scripts are updated every <strong className="text-[var(--text2)]">24 hours</strong> automatically.
          </div>
          <Btn size="sm" variant="secondary" icon="refresh" onClick={() => toast('Analytics scripts updated', 'Local copies have been refreshed.', 'success')}>
            Update Scripts Now
          </Btn>
        </div>
      </Card>

      <div className="bg-[var(--blue-bg)] border border-[var(--blue-border)] rounded-[12px] p-[20px] flex gap-[16px] items-start">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[var(--blue)] flex items-center justify-center text-white shrink-0">
          <span className="w-[20px] h-[20px]">📊</span>
        </div>
        <div>
          <div className="text-[14px] font-bold text-[var(--blue)] mb-[4px]">Why host locally?</div>
          <div className="text-[12px] text-[var(--text3)] leading-[1.6]">
            Hosting analytics scripts locally eliminates an external DNS lookup and allows you to leverage your own server's HTTP/2 or HTTP/3 connection, reducing the Time to First Byte (TTFB) and improving overall performance scores.
          </div>
        </div>
      </div>
    </div>
  );
}
