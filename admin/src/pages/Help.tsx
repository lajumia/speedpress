import React from 'react';
import { Card, CardHead, Row, Btn, Badge, Input } from '../components/Primitives';
import { Icons } from '../components/Icons';

export function PageHelp() {
  const videos = [
    { id: '1', title: 'Getting Started with SpeedPress', duration: '5:20', thumbnail: 'https://picsum.photos/seed/speed1/320/180' },
    { id: '2', title: 'Optimizing Core Web Vitals', duration: '8:45', thumbnail: 'https://picsum.photos/seed/speed2/320/180' },
    { id: '3', title: 'Advanced Asset Management', duration: '12:10', thumbnail: 'https://picsum.photos/seed/speed3/320/180' },
  ];

  const articles = [
    { title: 'How to fix LCP issues', category: 'Performance', date: 'Mar 10, 2026' },
    { title: 'Understanding Cache Preloading', category: 'Caching', date: 'Mar 08, 2026' },
    { title: 'Best practices for JS Delay', category: 'Optimization', date: 'Mar 05, 2026' },
    { title: 'Configuring CDN for Global Speed', category: 'CDN', date: 'Mar 01, 2026' },
  ];

  return (
    <div className="flex flex-col gap-[16px] animate-[fadeUp_0.3s_ease]">
      <div className="bg-[var(--accent)] rounded-[16px] p-[32px] text-white overflow-hidden relative shadow-[0_20px_40px_var(--accent-glow)]">
        <div className="relative z-10">
          <h1 className="text-[28px] font-extrabold mb-[8px] tracking-tight">How can we help you?</h1>
          <p className="text-[15px] opacity-90 mb-[24px] max-w-[500px]">
            Search our documentation, watch tutorials, or contact our support team for expert assistance.
          </p>
          <div className="relative max-w-[500px]">
            <div className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-white/60">
              {Icons.chart}
            </div>
            <input 
              type="text" 
              placeholder="Search documentation..." 
              className="w-full bg-white/10 border border-white/20 rounded-[12px] p-[14px_16px_14px_48px] text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all"
            />
          </div>
        </div>
        <div className="absolute right-[-40px] bottom-[-40px] w-[240px] h-[240px] bg-white/10 rounded-full blur-[60px]" />
        <div className="absolute right-[40px] top-[-20px] w-[120px] h-[120px] bg-white/10 rounded-full blur-[40px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[16px]">
        <div className="lg:col-span-2 flex flex-col gap-[16px]">
          <Card>
            <CardHead title="Video Tutorials" icon="media" color="var(--accent)" />
            <div className="p-[20px] grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              {videos.map(v => (
                <div key={v.id} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-[12px] overflow-hidden mb-[10px] bg-[var(--bg2)]">
                    <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <div className="w-[48px] h-[48px] rounded-full bg-white/90 text-[var(--accent)] flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                        <span className="w-[20px] h-[20px] ml-[2px]">{Icons.zap}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-[8px] right-[8px] bg-black/70 text-white text-[10px] font-bold p-[2px_6px] rounded-[4px]">
                      {v.duration}
                    </div>
                  </div>
                  <h3 className="text-[14px] font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">{v.title}</h3>
                </div>
              ))}
            </div>
            <div className="p-[0_20px_20px]">
              <Btn variant="secondary" full icon="media">View YouTube Channel</Btn>
            </div>
          </Card>

          <Card>
            <CardHead title="Knowledge Base" icon="book" color="var(--blue)" />
            <div className="divide-y divide-[var(--border)]">
              {articles.map(a => (
                <div key={a.title} className="p-[16px_20px] flex items-center justify-between hover:bg-[var(--surface2)] transition-colors cursor-pointer group">
                  <div>
                    <div className="flex items-center gap-[8px] mb-[4px]">
                      <Badge color="blue">{a.category}</Badge>
                      <span className="text-[11px] text-[var(--text4)]">{a.date}</span>
                    </div>
                    <h3 className="text-[14px] font-semibold text-[var(--text2)] group-hover:text-[var(--blue)] transition-colors">{a.title}</h3>
                  </div>
                  <div className="w-[20px] h-[20px] text-[var(--text4)] group-hover:text-[var(--blue)] transform group-hover:translate-x-2 transition-all">
                    {Icons.expand}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-[16px_20px] border-t border-[var(--border)]">
              <Btn variant="ghost" full>Read More Articles</Btn>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-[16px]">
          <Card>
            <CardHead title="Direct Support" icon="help" color="var(--green)" />
            <div className="p-[20px] flex flex-col gap-[16px]">
              <div className="p-[16px] rounded-[12px] bg-[var(--green-bg)] border border-[var(--green-border)]">
                <div className="flex items-center gap-[10px] mb-[8px]">
                  <div className="w-[32px] h-[32px] rounded-full bg-[var(--green)] text-white flex items-center justify-center">
                    <span className="w-[16px] h-[16px]">{Icons.check}</span>
                  </div>
                  <div className="text-[14px] font-bold text-[var(--green)]">Priority Support</div>
                </div>
                <p className="text-[12px] text-[var(--text3)] leading-[1.6]">
                  As a Pro user, you have access to 24/7 priority ticket support. Average response time is under 2 hours.
                </p>
              </div>
              <Btn full icon="script">Open Support Ticket</Btn>
              <Btn full variant="secondary" icon="globe">Live Chat</Btn>
            </div>
          </Card>

          <Card>
            <CardHead title="System Status" icon="activity" color="var(--purple)" />
            <div className="p-[20px]">
              <div className="flex items-center justify-between mb-[16px]">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[10px] h-[10px] rounded-full bg-[var(--green)] animate-pulse" />
                  <span className="text-[13px] font-bold text-[var(--text2)]">All Systems Operational</span>
                </div>
                <span className="text-[11px] text-[var(--text4)]">99.9% Uptime</span>
              </div>
              <div className="space-y-[12px]">
                {[
                  { label: 'Cloud API', status: 'Operational' },
                  { label: 'CDN Network', status: 'Operational' },
                  { label: 'License Server', status: 'Operational' },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between text-[12px]">
                    <span className="text-[var(--text3)]">{s.label}</span>
                    <span className="font-bold text-[var(--green)]">{s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-[20px] text-center">
              <div className="w-[48px] h-[48px] rounded-full bg-[var(--bg2)] flex items-center justify-center mx-auto mb-[12px] text-[var(--text3)]">
                <span className="w-[24px] h-[24px]">{Icons.star}</span>
              </div>
              <h3 className="text-[15px] font-bold text-[var(--text)] mb-[4px]">Join the Community</h3>
              <p className="text-[12px] text-[var(--text4)] mb-[16px]">Connect with 50,000+ other SpeedPress users.</p>
              <div className="flex gap-[8px] justify-center">
                <div className="w-[36px] h-[36px] rounded-[10px] bg-[var(--surface2)] flex items-center justify-center text-[var(--text3)] cursor-pointer hover:bg-[var(--accent-bg)] hover:text-[var(--accent)] transition-all">
                  <span className="w-[18px] h-[18px]">{Icons.chart}</span>
                </div>
                <div className="w-[36px] h-[36px] rounded-[10px] bg-[var(--surface2)] flex items-center justify-center text-[var(--text3)] cursor-pointer hover:bg-[var(--blue-bg)] hover:text-[var(--blue)] transition-all">
                  <span className="w-[18px] h-[18px]">{Icons.globe}</span>
                </div>
                <div className="w-[36px] h-[36px] rounded-[10px] bg-[var(--surface2)] flex items-center justify-center text-[var(--text3)] cursor-pointer hover:bg-[var(--purple-bg)] hover:text-[var(--purple)] transition-all">
                  <span className="w-[18px] h-[18px]">{Icons.zap}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
