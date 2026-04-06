import React, { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { Card, CardHead, Btn, Input, Select, Badge, Toggle, Row, TagInput, SearchableSelect } from '../components/Primitives';
import { Icons } from '../components/Icons';
import type { SpeedPressOptions, AssetRule } from '../types';

export function PageAssetMgr({
  opts,
  set,
  toast,
}: {
  opts: SpeedPressOptions;
  set: (k: keyof SpeedPressOptions, v: any) => void;
  toast: (title: string, msg: string, type?: any) => void;
}) {
  const [selectedPage, setSelectedPage] = useState('/');
  const [filter, setFilter] = useState<'all' | 'js' | 'css'>('all');
  const [search, setSearch] = useState('');

  const PAGES = [
    { id: 'home', label: 'Home Page', url: '/' },
    { id: 'shop', label: 'Shop', url: '/shop' },
    { id: 'checkout', label: 'Checkout', url: '/checkout' },
    { id: 'blog', label: 'Blog', url: '/blog' },
    { id: 'contact', label: 'Contact Us', url: '/contact' },
    { id: 'about', label: 'About Us', url: '/about' },
    { id: 'services', label: 'Our Services', url: '/services' },
    { id: 'portfolio', label: 'Portfolio', url: '/portfolio' },
    { id: 'faq', label: 'FAQ', url: '/faq' },
    { id: 'privacy', label: 'Privacy Policy', url: '/privacy-policy' },
    { id: 'terms', label: 'Terms of Service', url: '/terms' },
    { id: 'search', label: 'Search Results', url: '/search' },
    { id: 'account', label: 'My Account', url: '/my-account' },
    { id: 'cart', label: 'Shopping Cart', url: '/cart' },
  ];

  const rules = opts.asset_rules || [];
  const setRules = (v: AssetRule[]) => set('asset_rules', v);

  const updateRule = (id: number, key: keyof AssetRule, val: any) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, [key]: val } : r)));
  };

  const filtered = rules.filter((r) => {
    if (filter !== 'all' && r.type !== filter) return false;
    if (search && !r.handle.toLowerCase().includes(search.toLowerCase()) && !r.src.toLowerCase().includes(search.toLowerCase())) return false;
    // Mock logic: assets are loaded on all pages unless excluded
    if (r.excludePages?.includes(selectedPage)) return false;
    return true;
  });

  const JS_LOAD_OPTS = [
    { value: 'normal', label: 'Normal' },
    { value: 'defer', label: 'Defer' },
    { value: 'async', label: 'Async' },
    { value: 'delay', label: 'Delay' },
    { value: 'disable', label: 'Disable' },
  ];

  const CSS_LOAD_OPTS = [
    { value: 'normal', label: 'Normal' },
    { value: 'async', label: 'Async' },
    { value: 'disable', label: 'Disable' },
  ];

  const LOC_OPTS = [
    { value: 'head', label: '<head>' },
    { value: 'footer', label: 'Footer' },
  ];

  return (
    <div className="flex flex-col gap-[16px] animate-[fadeUp_0.3s_ease]">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[12px]">
        <StatCard label="Detected Assets" value={filtered.length} color="var(--accent)" icon="list" />
        <StatCard label="JS Files" value={filtered.filter((r) => r.type === 'js').length} color="var(--cyan)" icon="code" />
        <StatCard label="CSS Files" value={filtered.filter((r) => r.type === 'css').length} color="var(--purple)" icon="code" />
        <StatCard label="Optimized" value={filtered.filter((r) => r.load !== 'normal').length} color="var(--green)" icon="zap" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        <Card>
          <CardHead title="Global vs Local Rules" icon="globe" color="var(--blue)" desc="Define how rules are applied across your site" />
          <div className="p-[20px] flex flex-col gap-[16px]">
            <Row label="Enable Global Rules" hint="Apply asset optimizations across all pages by default">
              <Toggle checked={opts.asset_global_rules} onChange={(v) => set('asset_global_rules', v)} />
            </Row>
            <Row label="Regex Support" hint="Use regular expressions for advanced page matching" last>
              <Toggle checked={opts.asset_regex_support} onChange={(v) => set('asset_regex_support', v)} />
            </Row>
          </div>
        </Card>

        <Card>
          <CardHead title="Script Dependencies" icon="list" color="var(--orange)" desc="Visualize and manage script load order" />
          <div className="p-[20px] flex flex-col gap-[12px]">
            <div className="p-[12px] bg-[var(--surface2)] rounded-[8px] border border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <Badge color="cyan">JS</Badge>
                <div className="text-[13px] font-bold">jquery.min.js</div>
              </div>
              <div className="text-[11px] text-[var(--text4)]">Required by 12 scripts</div>
            </div>
            <div className="p-[12px] bg-[var(--surface2)] rounded-[8px] border border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <Badge color="cyan">JS</Badge>
                <div className="text-[13px] font-bold">wp-embed.min.js</div>
              </div>
              <div className="text-[11px] text-[var(--text4)]">No dependencies</div>
            </div>
            <Btn variant="secondary" size="sm" full>View Dependency Map</Btn>
          </div>
        </Card>
      </div>

      <Card>
        <CardHead 
          title="Page Asset Management" 
          icon="settings" 
          color="var(--accent)" 
          desc="Manage assets for specific pages of your website"
          action={
            <Btn variant="secondary" size="sm" icon="refresh" onClick={() => toast('Scanning...', 'Refreshing assets for this page.', 'info')}>
              Refresh Scan
            </Btn>
          }
        />
        
        {/* Page Selection Section */}
        <div className="p-[20px] bg-[var(--surface2)]/50 border-b border-[var(--border)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px]">
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold text-[var(--text4)] uppercase tracking-wider mb-[8px] flex items-center gap-[8px]">
                <span className="w-[14px] h-[14px]">{Icons.globe}</span>
                Select Page to Manage
              </div>
              <div className="max-w-[400px]">
                <SearchableSelect 
                  value={selectedPage} 
                  onChange={setSelectedPage} 
                  options={PAGES.map(p => ({ value: p.url, label: p.label }))}
                  placeholder="Search pages..."
                />
              </div>
            </div>
            <Btn variant="secondary" size="sm" icon="plus">Add Custom Page</Btn>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-[14px_20px] flex items-center gap-[10px] flex-wrap border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="flex bg-[var(--surface2)] rounded-[8px] p-[3px] gap-[2px]">
            {['all', 'js', 'css'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`p-[5px_14px] rounded-[6px] border-none cursor-pointer font-inherit text-[12px] font-semibold transition-all duration-150 ${
                  filter === f ? 'bg-[var(--surface)] text-[var(--text)] shadow-[var(--shadow)]' : 'bg-transparent text-[var(--text4)]'
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex-1 min-w-[160px] max-w-[280px]">
            <Input value={search} onChange={setSearch} placeholder="Search assets on this page…" small />
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[60px_160px_1fr_130px_100px] gap-[12px] p-[12px_20px] bg-[var(--surface2)] border-b border-[var(--border)]">
              {['Type', 'Handle', 'Source Path', 'Load Method', 'Location'].map((h, i) => (
                <div
                  key={i}
                  className="text-[10px] font-bold text-[var(--text4)] uppercase tracking-[0.07em]"
                >
                  {h}
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="p-[48px_20px] text-center">
                <div className="w-[48px] h-[48px] rounded-full bg-[var(--bg2)] flex items-center justify-center mx-auto mb-[12px] text-[var(--text4)]">
                  <span className="w-[24px] h-[24px]">{Icons.list}</span>
                </div>
                <div className="text-[var(--text3)] text-[14px] font-medium">No assets detected on this page.</div>
              </div>
            )}

            {filtered.map((r, i) => (
              <div
                key={r.id}
                className={`grid grid-cols-[60px_160px_1fr_130px_100px] gap-[12px] p-[12px_20px] items-center transition-all duration-200 hover:bg-[var(--surface2)] ${
                  i < filtered.length - 1 ? 'border-b border-[var(--border)]' : ''
                }`}
                style={{
                  background: r.load === 'disable' ? 'var(--red-bg)' : 'transparent',
                }}
              >
                <Badge color={r.type === 'js' ? 'cyan' : 'purple'}>{r.type.toUpperCase()}</Badge>
                <div className="overflow-hidden">
                  <div className="text-[13px] font-bold text-[var(--text)] truncate" title={r.handle}>{r.handle}</div>
                </div>
                <div className="text-[11px] text-[var(--text4)] truncate font-mono" title={r.src}>{r.src}</div>
                <Select
                  value={r.load}
                  onChange={(v) => updateRule(r.id, 'load', v as any)}
                  small
                  options={(r.type === 'js' ? JS_LOAD_OPTS : CSS_LOAD_OPTS).map((o) => ({ value: o.value, label: o.label }))}
                />
                <Select value={r.location} onChange={(v) => updateRule(r.id, 'location', v as any)} small options={LOC_OPTS} />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
