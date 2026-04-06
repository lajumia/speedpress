import React, { useState } from 'react';
import { Card, CardHead, Badge, Input, Btn, Row, Toggle } from '../components/Primitives';
import { Icons } from '../components/Icons';
import type { SpeedPressOptions } from '../types';

export function PageLicense({
  opts,
  set,
  toast,
}: {
  opts: SpeedPressOptions;
  set: (k: keyof SpeedPressOptions, v: any) => void;
  toast: (title: string, msg: string, type?: any) => void;
}) {
  const [key, setKey] = useState(opts.license_key);
  const [activating, setActivating] = useState(false);
  const [autoRenew, setAutoRenew] = useState(true);

  const activate = async () => {
    if (!key.trim()) {
      toast('No license key', 'Please enter your license key.', 'error');
      return;
    }
    setActivating(true);
    await new Promise((r) => setTimeout(r, 1400));
    set('license_key', key);
    set('license_status', 'active');
    set('license_plan', 'Professional');
    toast('License activated!', 'SpeedPress Pro is now active.', 'success');
    setActivating(false);
  };

  const plans = [
    { name: 'Starter', price: '$49', sites: 1, features: ['All core features', '1 year updates', 'Email support'], color: 'var(--blue)' },
    { name: 'Professional', price: '$99', sites: 3, features: ['All core features', 'Priority support', 'Advanced caching', 'Developer tools'], color: 'var(--accent)', popular: true },
    { name: 'Agency', price: '$199', sites: 'Unlimited', features: ['Everything in Pro', 'White-label', 'CLI access', 'API access', 'Dedicated support'], color: 'var(--purple)' },
  ];

  const activeSites = [
    { domain: 'yourdomain.com', status: 'Active', added: '2024-12-15' },
    { domain: 'staging.yourdomain.com', status: 'Active', added: '2025-01-20' },
    { domain: 'dev.local', status: 'Active', added: '2025-02-10' },
  ];

  const billingHistory = [
    { id: '#INV-9821', date: '2024-12-31', amount: '$99.00', status: 'Paid' },
    { id: '#INV-4512', date: '2023-12-31', amount: '$99.00', status: 'Paid' },
  ];

  return (
    <div className="animate-[fadeUp_0.3s_ease] flex flex-col gap-[16px]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[16px]">
        <div className="lg:col-span-2 flex flex-col gap-[16px]">
          <Card>
            <CardHead
              title="License Activation"
              desc="Enter your license key to unlock all features"
              icon="key"
              color="var(--amber)"
              action={
                opts.license_status === 'active' ? (
                  <Badge color="green" dot="pulse">
                    Active · {opts.license_plan}
                  </Badge>
                ) : (
                  <Badge color="red">Inactive</Badge>
                )
              }
            />
            <div className="p-[20px]">
              {opts.license_status === 'active' ? (
                <div className="bg-[var(--green-bg)] border border-[var(--green-border)] rounded-[9px] p-[16px_20px] flex items-center gap-[12px]">
                  <span className="w-[32px] h-[32px] bg-[var(--green)] rounded-[8px] flex items-center justify-center text-white shrink-0">
                    <span className="w-[16px] h-[16px]">{Icons.check}</span>
                  </span>
                  <div>
                    <div className="text-[14px] font-bold text-[var(--green)]">License Active — {opts.license_plan}</div>
                    <div className="text-[12px] text-[var(--text3)] mt-[2px]">
                      Key: {opts.license_key.substring(0, 8)}••••••••••••••••• · Expires: Dec 31, 2025
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Btn
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        set('license_status', 'inactive');
                        set('license_key', '');
                        setKey('');
                        toast('License deactivated', 'Your license has been removed.', 'warn');
                      }}
                    >
                      Deactivate
                    </Btn>
                  </div>
                </div>
              ) : (
                <div className="flex gap-[10px]">
                  <div className="flex-1">
                    <Input value={key} onChange={setKey} placeholder="XXXX-XXXX-XXXX-XXXX-XXXX" mono />
                  </div>
                  <Btn icon="key" loading={activating} onClick={activate}>
                    Activate License
                  </Btn>
                  <Btn variant="secondary" icon="globe" onClick={() => toast('Opening…', 'Redirecting to SpeedPress.io', 'info')}>
                    Buy License
                  </Btn>
                </div>
              )}
            </div>
            {opts.license_status === 'active' && (
              <div className="border-t border-[var(--border)]">
                <Row label="Auto-Renewal" hint="Automatically renew your subscription for uninterrupted service">
                  <Toggle checked={autoRenew} onChange={setAutoRenew} />
                </Row>
                <Row label="Email Notifications" hint="Receive alerts about license expiration and updates" last>
                  <Toggle checked={true} onChange={() => {}} />
                </Row>
              </div>
            )}
          </Card>

          {opts.license_status === 'active' && (
            <Card>
              <CardHead title="Active Sites" desc="Manage domains where this license is currently active" icon="globe" color="var(--blue)" />
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[var(--surface2)] border-b border-[var(--border)]">
                      <th className="p-[12px_20px] text-[11px] font-extrabold text-[var(--text4)] uppercase tracking-wider">Domain</th>
                      <th className="p-[12px_20px] text-[11px] font-extrabold text-[var(--text4)] uppercase tracking-wider">Status</th>
                      <th className="p-[12px_20px] text-[11px] font-extrabold text-[var(--text4)] uppercase tracking-wider">Added On</th>
                      <th className="p-[12px_20px] text-[11px] font-extrabold text-[var(--text4)] uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {activeSites.map((site) => (
                      <tr key={site.domain} className="hover:bg-[var(--surface2)] transition-colors">
                        <td className="p-[12px_20px] text-[13px] font-medium text-[var(--text2)]">{site.domain}</td>
                        <td className="p-[12px_20px]">
                          <Badge color="green">{site.status}</Badge>
                        </td>
                        <td className="p-[12px_20px] text-[12px] text-[var(--text3)] font-mono">{site.added}</td>
                        <td className="p-[12px_20px] text-right">
                          <button className="text-[var(--text4)] hover:text-[var(--red)] transition-colors">
                            <span className="w-[16px] h-[16px] inline-block">{Icons.trash}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-[16px_20px] border-t border-[var(--border)] flex justify-between items-center">
                <div className="text-[12px] text-[var(--text4)]">
                  Using <span className="font-bold text-[var(--text2)]">3</span> of <span className="font-bold text-[var(--text2)]">3</span> available site slots.
                </div>
                <Btn variant="secondary" size="sm" icon="plus">Add New Domain</Btn>
              </div>
            </Card>
          )}

          {opts.license_status === 'active' && (
            <Card>
              <CardHead title="Billing History" desc="View and download your recent invoices" icon="script" color="var(--purple)" />
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[var(--surface2)] border-b border-[var(--border)]">
                      <th className="p-[12px_20px] text-[11px] font-extrabold text-[var(--text4)] uppercase tracking-wider">Invoice ID</th>
                      <th className="p-[12px_20px] text-[11px] font-extrabold text-[var(--text4)] uppercase tracking-wider">Date</th>
                      <th className="p-[12px_20px] text-[11px] font-extrabold text-[var(--text4)] uppercase tracking-wider">Amount</th>
                      <th className="p-[12px_20px] text-[11px] font-extrabold text-[var(--text4)] uppercase tracking-wider text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {billingHistory.map((bill) => (
                      <tr key={bill.id} className="hover:bg-[var(--surface2)] transition-colors">
                        <td className="p-[12px_20px] text-[13px] font-bold text-[var(--blue)] cursor-pointer hover:underline">{bill.id}</td>
                        <td className="p-[12px_20px] text-[12px] text-[var(--text3)] font-mono">{bill.date}</td>
                        <td className="p-[12px_20px] text-[13px] font-semibold text-[var(--text2)]">{bill.amount}</td>
                        <td className="p-[12px_20px] text-right">
                          <Badge color="green">{bill.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-[16px_20px] border-t border-[var(--border)]">
                <Btn variant="ghost" size="sm" full>View All Billing History</Btn>
              </div>
            </Card>
          )}

          <Card>
            <CardHead title="Account Details" icon="chart" color="var(--cyan)" />
            <div className="p-[20px] flex flex-col gap-[16px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[48px] h-[48px] rounded-full bg-[var(--bg2)] flex items-center justify-center text-[var(--text3)]">
                  <span className="w-[24px] h-[24px]">{Icons.bolt}</span>
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[var(--text)]">developerlaju@gmail.com</div>
                  <div className="text-[11px] text-[var(--text4)]">Member since Dec 2023</div>
                </div>
              </div>
              <div className="space-y-[12px] pt-[12px] border-t border-[var(--border)]">
                <div className="flex justify-between text-[12px]">
                  <span className="text-[var(--text3)]">Current Plan</span>
                  <span className="font-bold text-[var(--accent)]">{opts.license_plan || 'None'}</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-[var(--text3)]">Payment Method</span>
                  <span className="font-bold text-[var(--text2)]">Visa •••• 4242</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-[var(--text3)]">Next Billing</span>
                  <span className="font-bold text-[var(--text2)]">Dec 31, 2025</span>
                </div>
              </div>
              <Btn full variant="secondary" size="sm" icon="settings">Manage Account</Btn>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-[16px]">
          <Card>
            <CardHead title="Support Access" icon="help" color="var(--green)" />
            <div className="p-[20px]">
              <div className="text-[12px] text-[var(--text3)] leading-[1.6] mb-[16px]">
                {opts.license_status === 'active' 
                  ? "You have access to Priority Support. Our team typically responds within 2 hours."
                  : "Upgrade to a Pro plan to unlock priority email and chat support."}
              </div>
              <Btn full icon="script" disabled={opts.license_status !== 'active'}>Open Support Ticket</Btn>
              <div className="mt-[8px]">
                <Btn full variant="secondary" icon="globe">Documentation</Btn>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-[20px] text-center">
              <div className="text-[13px] font-bold text-[var(--text2)] mb-[8px]">Need more sites?</div>
              <p className="text-[11px] text-[var(--text4)] mb-[16px]">Upgrade to the Agency plan and get unlimited site activations.</p>
              <Btn full variant="primary" style={{ background: 'var(--purple)', boxShadow: '0 4px 14px 0 rgba(124, 58, 237, 0.2)' }}>Upgrade to Agency</Btn>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-[16px]">
        <div className="text-[18px] font-extrabold text-[var(--text)] mb-[16px] tracking-tight">Available Plans</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
          {plans.map((p) => (
            <div
              key={p.name}
              className="bg-[var(--surface)] border-[1.5px] rounded-[12px] overflow-hidden shadow-[var(--shadow)] relative transition-all duration-300 hover:scale-[1.02]"
              style={{ borderColor: p.popular ? 'var(--accent)' : 'var(--border)', boxShadow: p.popular ? 'var(--shadow2)' : 'var(--shadow)' }}
            >
              {p.popular && (
                <div className="bg-[var(--accent)] text-white text-[10px] font-bold text-center p-[4px_0] tracking-[0.08em]">
                  MOST POPULAR
                </div>
              )}
              <div className="p-[20px]">
                <div className="text-[15px] font-extrabold text-[var(--text)]">{p.name}</div>
                <div className="text-[28px] font-extrabold mt-[8px] mb-[4px] tracking-[-0.02em]" style={{ color: p.color }}>
                  {p.price}
                  <span className="text-[13px] font-medium text-[var(--text3)]">/year</span>
                </div>
                <div className="text-[12px] text-[var(--text3)] mb-[14px]">
                  {typeof p.sites === 'number' ? `${p.sites} website${p.sites > 1 ? 's' : ''}` : 'Unlimited websites'}
                </div>
                <div className="flex flex-col gap-[7px] mb-[16px]">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-[7px]">
                      <span className="w-[14px] h-[14px] shrink-0" style={{ color: p.color }}>
                        {Icons.check}
                      </span>
                      <span className="text-[12px] text-[var(--text2)]">{f}</span>
                    </div>
                  ))}
                </div>
                <Btn full variant={p.popular ? 'primary' : 'secondary'} onClick={() => toast('Redirecting…', 'Opening checkout page.', 'info')}>
                  {opts.license_plan === p.name ? 'Current Plan' : `Get ${p.name}`}
                </Btn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
