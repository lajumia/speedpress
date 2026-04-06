import React, { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { Card, CardHead, Row, Toggle, Input, Select, Badge, Btn } from '../components/Primitives';
import type { SpeedPressOptions, DbLogItem } from '../types';

export function PageDatabase({
  opts,
  set,
  toast,
  dbLog,
  setDbLog,
}: {
  opts: SpeedPressOptions;
  set: (k: keyof SpeedPressOptions, v: any) => void;
  toast: (title: string, msg: string, type?: any) => void;
  dbLog: DbLogItem[];
  setDbLog: React.Dispatch<React.SetStateAction<DbLogItem[]>>;
}) {
  const [cleaning, setCleaning] = useState(false);

  const run = async () => {
    setCleaning(true);
    await new Promise((r) => setTimeout(r, 1400));
    const res = { revisions: 187, drafts: 3, trash: 9, spam: 31, transients: 104, orphanMeta: 56 };
    const total = Object.values(res).reduce((a, b) => a + b, 0);
    setDbLog((l) => [{ date: new Date().toLocaleString(), items: res, total }, ...l].slice(0, 10));
    toast('Database cleaned', `${total} items removed successfully.`, 'success');
    setCleaning(false);
  };

  const dbinfo = [
    { label: 'Total Size', value: '51.4 MB', color: 'var(--cyan)' },
    { label: 'Overhead', value: '4.2 MB', color: 'var(--amber)' },
    { label: 'Tables', value: '27', color: 'var(--blue)' },
    { label: 'Cleanable Items', value: '390', color: 'var(--red)' },
  ];

  return (
    <div className="flex flex-col gap-[16px] animate-[fadeUp_0.3s_ease]">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[12px]">
        {dbinfo.map((d) => (
          <StatCard key={d.label} label={d.label} value={d.value} color={d.color} icon="db" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px]">
        <Card>
          <CardHead title="Autoload Analysis" icon="activity" color="var(--blue)" desc="Identify plugins bloating wp_options" />
          <div className="p-[20px] flex flex-col gap-[12px]">
            <Row label="Analyze Autoloaded Data" hint="Scan for large options that load on every page">
              <Toggle checked={opts.db_autoload_analysis} onChange={(v) => set('db_autoload_analysis', v)} />
            </Row>
            {opts.db_autoload_analysis && (
              <div className="flex flex-col gap-[8px] mt-[8px]">
                <div className="p-[10px] bg-[var(--surface2)] rounded-[8px] border border-[var(--border)] flex items-center justify-between">
                  <div className="text-[12px] font-medium">Elementor Data</div>
                  <Badge color="red">1.2 MB</Badge>
                </div>
                <div className="p-[10px] bg-[var(--surface2)] rounded-[8px] border border-[var(--border)] flex items-center justify-between">
                  <div className="text-[12px] font-medium">WooCommerce Settings</div>
                  <Badge color="amber">450 KB</Badge>
                </div>
                <div className="p-[10px] bg-[var(--surface2)] rounded-[8px] border border-[var(--border)] flex items-center justify-between">
                  <div className="text-[12px] font-medium">Jetpack Options</div>
                  <Badge color="green">120 KB</Badge>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <CardHead title="Table Size Map" icon="chart" color="var(--purple)" desc="Visual breakdown of database storage" />
          <div className="p-[20px] flex flex-col gap-[12px]">
            <Row label="Enable Table Mapping" hint="Generate a visual chart of your database tables">
              <Toggle checked={opts.db_table_map} onChange={(v) => set('db_table_map', v)} />
            </Row>
            {opts.db_table_map && (
              <div className="flex flex-col gap-[12px] mt-[8px]">
                <div className="flex flex-col gap-[4px]">
                  <div className="flex justify-between text-[11px] font-bold uppercase text-[var(--text4)]">
                    <span>wp_posts</span>
                    <span>24.5 MB</span>
                  </div>
                  <div className="h-[6px] bg-[var(--surface2)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--purple)] w-[48%]" />
                  </div>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="flex justify-between text-[11px] font-bold uppercase text-[var(--text4)]">
                    <span>wp_postmeta</span>
                    <span>18.2 MB</span>
                  </div>
                  <div className="h-[6px] bg-[var(--surface2)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--blue)] w-[35%]" />
                  </div>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="flex justify-between text-[11px] font-bold uppercase text-[var(--text4)]">
                    <span>wp_options</span>
                    <span>5.1 MB</span>
                  </div>
                  <div className="h-[6px] bg-[var(--surface2)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--cyan)] w-[10%]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card>
        <CardHead title="Cleanup Options" icon="trash" color="var(--red)" />
        <Row label="Post Revisions" hint="Delete saved revision history for posts and pages">
          <div className="flex items-center gap-[10px]">
            <div className="flex items-center gap-[6px]">
              <span className="text-[11px] text-[var(--text4)]">Keep</span>
              <div className="w-[60px]">
                <Input value={opts.db_revisions_max} onChange={(v) => set('db_revisions_max', parseInt(v) || 3)} type="number" small />
              </div>
            </div>
            <Badge color="red">187 found</Badge>
            <Toggle checked={opts.db_revisions} onChange={(v) => set('db_revisions', v)} />
          </div>
        </Row>
        <Row label="Auto-Draft Posts" hint="Remove posts saved as auto-drafts">
          <div className="flex items-center gap-[8px]">
            <Badge color="amber">3 found</Badge>
            <Toggle checked={opts.db_autodrafts} onChange={(v) => set('db_autodrafts', v)} />
          </div>
        </Row>
        <Row label="Trashed Posts" hint="Permanently delete posts in the trash">
          <div className="flex items-center gap-[8px]">
            <Badge color="amber">9 found</Badge>
            <Toggle checked={opts.db_trash} onChange={(v) => set('db_trash', v)} />
          </div>
        </Row>
        <Row label="Spam Comments" hint="Permanently remove spam comments">
          <div className="flex items-center gap-[8px]">
            <Badge color="red">31 found</Badge>
            <Toggle checked={opts.db_spam} onChange={(v) => set('db_spam', v)} />
          </div>
        </Row>
        <Row label="Expired Transients" hint="Delete expired WordPress transient cache entries">
          <div className="flex items-center gap-[8px]">
            <Badge color="red">104 found</Badge>
            <Toggle checked={opts.db_transients} onChange={(v) => set('db_transients', v)} />
          </div>
        </Row>
        <Row label="Orphaned Post Meta" hint="Remove meta rows with no matching post">
          <div className="flex items-center gap-[8px]">
            <Badge color="amber">56 found</Badge>
            <Toggle checked={!!opts.db_orphaned_meta} onChange={(v) => set('db_orphaned_meta', v)} />
          </div>
        </Row>
        <Row label="Optimize Tables" hint="Run MySQL OPTIMIZE TABLE to recover fragmented space">
          <Toggle checked={opts.db_opt_tables} onChange={(v) => set('db_opt_tables', v)} />
        </Row>
        <Row label="Database Indexing" hint="Add missing indexes to slow WordPress queries (improves search & admin speed)" last>
          <div className="flex items-center gap-[6px]">
            <Badge color="blue">Pro</Badge>
            <Toggle checked={opts.db_indexing} onChange={(v) => set('db_indexing', v)} />
          </div>
        </Row>
      </Card>
      <Card>
        <CardHead
          title="Scheduled Cleanup"
          icon="clock"
          color="var(--cyan)"
          action={<Toggle checked={opts.db_schedule} onChange={(v) => set('db_schedule', v)} />}
        />
        <Row label="Cleanup Frequency" last>
          <Select
            value={opts.db_schedule_freq}
            onChange={(v) => set('db_schedule_freq', v)}
            options={[
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
            ]}
          />
        </Row>
      </Card>
      <Card>
        <CardHead
          title="Run Cleanup Now"
          icon="rocket"
          color="var(--red)"
          action={
            <Btn variant="danger" icon="trash" loading={cleaning} onClick={run}>
              {cleaning ? 'Cleaning…' : 'Run Cleanup'}
            </Btn>
          }
        />
        {dbLog.length > 0 && (
          <div>
            {dbLog.map((l, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-[11px_20px] ${i < dbLog.length - 1 ? 'border-b border-[var(--border)]' : ''}`}
              >
                <div>
                  <div className="text-[12px] font-semibold text-[var(--text2)] font-mono">{l.date}</div>
                  <div className="text-[11px] text-[var(--text4)] mt-[2px]">
                    {Object.entries(l.items)
                      .map(([k, v]) => `${v} ${k}`)
                      .join(' · ')}
                  </div>
                </div>
                <Badge color="green">{l.total} removed</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
