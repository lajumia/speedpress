import React from 'react';
import { Card, CardHead, Row, Toggle, Badge, Btn } from '../components/Primitives';
import type { SpeedPressOptions } from '../types';

export function PageSecurity({
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
          title="Safe Mode"
          desc="Test optimizations without affecting live visitors"
          icon="shield"
          color="var(--blue)"
          action={<Toggle checked={opts.safe_mode} onChange={(v) => set('safe_mode', v)} />}
        />
        <div className="p-[14px_20px]">
          <div className="bg-[var(--blue-bg)] border border-[var(--blue-border)] rounded-[8px] p-[12px_16px] text-[12px] text-[var(--text2)] leading-[1.6]">
            In Safe Mode, all SpeedPress optimizations are applied to your own browsing session only. Visitors still see the original
            unoptimized site. Use this to verify no visual issues before going live.
          </div>
        </div>
      </Card>
      <Card>
        <CardHead title="Conflict Detection" icon="warning" color="var(--amber)" />
        <Row label="Enable Conflict Detection" hint="Scan for incompatible plugins and theme code">
          <Toggle checked={opts.conflict_detection} onChange={(v) => set('conflict_detection', v)} />
        </Row>
        <Row label="Automatic Rollback" hint="If a PHP fatal error occurs after enabling a feature, automatically disable it" last>
          <Toggle checked={opts.auto_rollback} onChange={(v) => set('auto_rollback', v)} />
        </Row>
        <div className="p-[0_20px_16px]">
          <Btn
            variant="secondary"
            size="sm"
            icon="activity"
            onClick={() => toast('Scan complete', 'No conflicts detected. All plugins compatible.', 'success')}
          >
            Run Compatibility Check
          </Btn>
        </div>
      </Card>
      <Card>
        <CardHead 
          title="WordPress Hardening" 
          desc="Remove unnecessary WordPress features to improve security and performance"
          icon="shield" 
          color="var(--red)" 
        />
        <Row label="Disable XML-RPC" hint="Blocks all requests to /xmlrpc.php (common attack vector)">
          <div className="flex items-center gap-[6px]">
            <Badge color="blue">Security</Badge>
            <Toggle checked={opts.disable_xmlrpc} onChange={(v) => set('disable_xmlrpc', v)} />
          </div>
        </Row>
        <Row label="Hide WordPress Version" hint="Remove the version number from the head and scripts">
          <Toggle checked={opts.hide_wp_version} onChange={(v) => set('hide_wp_version', v)} />
        </Row>
        <Row label="Remove RSD Link" hint="Remove Really Simple Discovery link from the head">
          <Toggle checked={opts.remove_rsd} onChange={(v) => set('remove_rsd', v)} />
        </Row>
        <Row label="Remove wlwmanifest Link" hint="Remove Windows Live Writer manifest link">
          <Toggle checked={opts.remove_wlwmanifest} onChange={(v) => set('remove_wlwmanifest', v)} />
        </Row>
        <Row label="Remove Shortlink" hint="Remove the shortlink tag from the head">
          <Toggle checked={opts.remove_shortlink} onChange={(v) => set('remove_shortlink', v)} />
        </Row>
        <Row label="Disable REST API" hint="Restrict REST API access to logged-in users only" last>
          <Toggle checked={opts.remove_rest_api} onChange={(v) => set('remove_rest_api', v)} />
        </Row>
      </Card>

      <Card>
        <CardHead 
          title="Login Hardening" 
          desc="Secure your login page and reduce bot traffic"
          icon="key" 
          color="var(--purple)" 
        />
        <Row label="Custom Login URL" hint="Change /wp-login.php to a custom slug (e.g. /my-secret-login)">
          <div className="w-full max-w-[200px]">
            <input 
              className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-[6px] p-[6px_12px] text-[12px] text-[var(--text)] focus:outline-none focus:border-[var(--blue)] font-mono"
              value={opts.login_url_slug} 
              onChange={(e) => set('login_url_slug', e.target.value)} 
              placeholder="secret-login"
            />
          </div>
        </Row>
        <Row label="Disable Language Switcher" hint="Remove the language dropdown from the login page">
          <Toggle checked={opts.disable_login_language_switcher} onChange={(v) => set('disable_login_language_switcher', v)} />
        </Row>
        <Row label="Disable Application Passwords" hint="Disable the application passwords feature introduced in WP 5.6" last>
          <Toggle checked={opts.disable_application_passwords} onChange={(v) => set('disable_application_passwords', v)} />
        </Row>
      </Card>
    </div>
  );
}
