import React from 'react';
import { Card, CardHead, Btn, Row, Badge } from '../components/Primitives';
import type { SpeedPressOptions } from '../types';
import { DEFAULT_OPTIONS } from '../constants';

export function PageTools({
  opts,
  setOpts,
  toast,
}: {
  opts: SpeedPressOptions;
  setOpts: React.Dispatch<React.SetStateAction<SpeedPressOptions>>;
  toast: (title: string, msg: string, type?: any) => void;
}) {
  const exportData = () => {
    const b = new Blob([JSON.stringify(opts, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = 'speedpress-settings.json';
    a.click();
    toast('Exported', 'speedpress-settings.json saved.', 'success');
  };

  return (
    <div className="flex flex-col gap-[16px] animate-[fadeUp_0.3s_ease]">
      <div className="grid grid-cols-2 gap-[16px]">
        <Card>
          <CardHead title="Export Settings" icon="download" color="var(--blue)" />
          <div className="p-[16px_20px]">
            <p className="text-[13px] text-[var(--text3)] mb-[14px] leading-[1.6]">
              Download all SpeedPress configuration as a JSON file for backup or site migration.
            </p>
            <Btn variant="secondary" icon="download" onClick={exportData}>
              Download settings.json
            </Btn>
          </div>
        </Card>
        <Card>
          <CardHead title="Import Settings" icon="upload" color="var(--green)" />
          <div className="p-[16px_20px]">
            <p className="text-[13px] text-[var(--text3)] mb-[14px] leading-[1.6]">
              Restore settings from a previously exported SpeedPress configuration file.
            </p>
            <label className="cursor-pointer">
              <Btn variant="secondary" icon="upload" onClick={() => {}}>
                Choose JSON File
              </Btn>
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const r = new FileReader();
                  r.onload = (ev) => {
                    try {
                      const d = JSON.parse(ev.target?.result as string);
                      setOpts((o) => ({ ...o, ...d }));
                      toast('Imported', 'Settings restored.', 'success');
                    } catch {
                      toast('Error', 'Invalid JSON.', 'error');
                    }
                  };
                  r.readAsText(f);
                }}
              />
            </label>
          </div>
        </Card>
      </div>
      <Card>
        <CardHead title="Server Optimization" icon="server" color="var(--orange)" desc="Advanced server-level performance tweaks" />
        <Row label="Nginx Config Generator" hint="Generate optimized configuration snippets for your Nginx server">
          <Btn variant="secondary" size="sm" icon="code" onClick={() => toast('Config Generated', 'Nginx configuration snippet is ready.', 'success')}>
            Generate Snippet
          </Btn>
        </Row>
        <Row label="Varnish/Nginx FastCGI Purge" hint="Automatically purge server-level caches when WordPress cache is cleared" last>
          <div className="flex items-center gap-[10px]">
            <Badge color="blue">Pro</Badge>
            <Btn variant="secondary" size="sm" icon="refresh" onClick={() => toast('Cache Purged', 'Server-level cache cleared successfully.', 'success')}>
              Purge Now
            </Btn>
          </div>
        </Row>
      </Card>
      <Card>
        <CardHead title="System Information" icon="info" color="var(--text3)" />
        <div>
          {[
            ['SpeedPress Version', '2.0.0'],
            ['WordPress Version', '6.5.3'],
            ['PHP Version', '8.2.12'],
            ['MySQL Version', '8.0.34'],
            ['Server', 'Nginx 1.24'],
            ['Memory Limit', '512M'],
            ['Max Execution Time', '60s'],
            ['WP_DEBUG', 'Disabled'],
            ['WP_CACHE', 'Enabled ✓'],
            ['Object Cache', 'Redis Active'],
            ['Cache Driver', 'File + Redis'],
            ['Active Theme', 'Astra 4.6'],
          ].map(([k, v], i, a) => (
            <div
              key={k}
              className={`flex justify-between p-[10px_20px] ${i < a.length - 1 ? 'border-b border-[var(--border)]' : ''}`}
              style={{ background: i % 2 ? 'var(--surface2)' : 'transparent' }}
            >
              <span className="text-[12px] text-[var(--text3)]">{k}</span>
              <code className="text-[12px] font-mono text-[var(--text)] font-medium">{v}</code>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <CardHead title="Rollback System" icon="history" color="var(--blue)" desc="Restore your site to a previous state if something breaks" />
        <div className="p-[20px] flex flex-col gap-[12px]">
          <div className="p-[12px] bg-[var(--surface2)] rounded-[8px] border border-[var(--border)] flex items-center justify-between">
            <div>
              <div className="text-[13px] font-bold">Snapshot: Pre-RUCSS Activation</div>
              <div className="text-[11px] text-[var(--text4)]">Created Mar 30, 2026 at 14:22</div>
            </div>
            <Btn variant="secondary" size="sm">Restore</Btn>
          </div>
          <div className="p-[12px] bg-[var(--surface2)] rounded-[8px] border border-[var(--border)] flex items-center justify-between opacity-60">
            <div>
              <div className="text-[13px] font-bold">Snapshot: Initial Setup</div>
              <div className="text-[11px] text-[var(--text4)]">Created Mar 28, 2026 at 09:15</div>
            </div>
            <Btn variant="secondary" size="sm">Restore</Btn>
          </div>
          <Btn variant="primary" size="sm" icon="plus" full>Create New Snapshot</Btn>
        </div>
      </Card>
      <Card style={{ border: '1px solid var(--red-border)' }}>
        <CardHead title="Danger Zone" icon="warning" color="var(--red)" />
        <div className="p-[14px_20px] flex justify-between items-center border-b border-[var(--border)]">
          <div>
            <div className="text-[13px] font-semibold text-[var(--text2)]">Reset All Settings</div>
            <div className="text-[11px] text-[var(--text4)]">Restore SpeedPress to factory defaults. Cannot be undone.</div>
          </div>
          <Btn
            variant="danger"
            icon="trash"
            onClick={() => {
              setOpts(DEFAULT_OPTIONS);
              toast('Reset', 'All settings restored to defaults.', 'warn');
            }}
          >
            Reset Defaults
          </Btn>
        </div>
        <div className="p-[14px_20px] flex justify-between items-center">
          <div>
            <div className="text-[13px] font-semibold text-[var(--text2)]">Deactivate & Clean Up</div>
            <div className="text-[11px] text-[var(--text4)]">Remove all SpeedPress data, cache files and database entries.</div>
          </div>
          <Btn variant="danger" icon="trash" onClick={() => toast('Deactivating…', 'Removing all SpeedPress data.', 'warn')}>
            Deactivate Plugin
          </Btn>
        </div>
      </Card>
    </div>
  );
}
