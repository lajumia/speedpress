import React from 'react';
import { Icons } from './Icons';
import { Card, Badge, Btn } from './Primitives';

export function RightSidebar({ open, onClose }: { open: boolean; onClose?: () => void }) {
  const BLOG_POSTS = [
    { title: 'How to optimize LCP in 2024', date: 'Mar 12, 2024', category: 'Performance' },
    { title: 'New features in SpeedPress v2.0', date: 'Mar 10, 2024', category: 'Updates' },
    { title: 'Understanding INP (Interaction to Next Paint)', date: 'Mar 05, 2024', category: 'Core Web Vitals' },
  ];

  const SYSTEM_STATUS = [
    { label: 'Cache Engine', status: 'Healthy', color: 'var(--green)' },
    { label: 'Database Index', status: 'Optimized', color: 'var(--green)' },
    { label: 'CDN Connection', status: 'Connected', color: 'var(--green)' },
    { label: 'License Check', status: 'Verified', color: 'var(--blue)' },
  ];

  return (
    <div className={`shrink-0 bg-[var(--sidebar-bg)] border-l border-[var(--sidebar-border)] flex flex-col transition-all duration-300 ease-in-out z-[200] 
      fixed right-0 h-screen xl:sticky top-0 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]
      ${open ? 'w-[300px] translate-x-0 opacity-100' : 'w-0 translate-x-full xl:translate-x-0 opacity-0 overflow-hidden border-none'}`}
      style={{ maxWidth: 'calc(100vw - 40px)' }}
    >
      <div className="p-[16px_20px] border-b border-[var(--border)] flex items-center justify-between h-[60px] shrink-0">
        <span className="text-[14px] font-bold text-[var(--text)]">Plugin Resources</span>
        {onClose && (
          <button onClick={onClose} className="xl:hidden p-[4px] text-[var(--text4)] hover:text-[var(--text2)]">
            <span className="w-[18px] h-[18px]">{Icons.x}</span>
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-[20px] flex flex-col gap-[24px]">
        {/* System Status Section */}
        <div className="flex flex-col gap-[12px]">
          <span className="text-[11px] font-bold text-[var(--text4)] uppercase tracking-wider">System Status</span>
          <div className="grid grid-cols-1 gap-[8px]">
            {SYSTEM_STATUS.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-[10px_12px] rounded-[10px] bg-[var(--surface2)] border border-[var(--border)]">
                <span className="text-[12px] text-[var(--text2)] font-medium">{s.label}</span>
                <div className="flex items-center gap-[6px]">
                  <span className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-[11px] font-bold" style={{ color: s.color }}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optimization Tips */}
        <div className="flex flex-col gap-[12px]">
          <span className="text-[11px] font-bold text-[var(--text4)] uppercase tracking-wider">Optimization Tips</span>
          <div className="p-[14px] rounded-[14px] bg-[var(--bg2)] border border-dashed border-[var(--border2)]">
            <div className="flex items-start gap-[10px]">
              <span className="w-[16px] h-[16px] text-[var(--accent)] shrink-0 mt-[2px]">{Icons.zap}</span>
              <div className="text-[12px] leading-relaxed text-[var(--text3)]">
                <strong className="text-[var(--text2)] block mb-[4px]">Did you know?</strong>
                Enabling "Delay JS" can improve your mobile PageSpeed score by up to 30 points by prioritizing visual content.
              </div>
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[var(--text4)] uppercase tracking-wider">Latest from Blog</span>
            <span className="text-[10px] text-[var(--accent)] font-bold cursor-pointer hover:underline">View All</span>
          </div>
          <div className="flex flex-col gap-[10px]">
            {BLOG_POSTS.map((post, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="text-[13px] font-bold text-[var(--text2)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                  {post.title}
                </div>
                <div className="flex items-center gap-[8px] mt-[4px]">
                  <span className="text-[10px] text-[var(--text4)]">{post.date}</span>
                  <span className="w-[3px] h-[3px] rounded-full bg-[var(--border2)]" />
                  <span className="text-[10px] text-[var(--accent)] font-medium">{post.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Card */}
        <div className="p-[16px] rounded-[16px] bg-[var(--accent-bg)] border border-[var(--accent-border)] flex flex-col gap-[12px]">
          <div className="w-[32px] h-[32px] rounded-[10px] bg-[var(--accent)] flex items-center justify-center text-white">
            <span className="w-[18px] h-[18px]">{Icons.help}</span>
          </div>
          <div>
            <div className="text-[14px] font-bold text-[var(--text)]">Need Help?</div>
            <div className="text-[12px] text-[var(--text3)] mt-[2px]">Our support team is available 24/7 to help you with any issues.</div>
          </div>
          <Btn variant="primary" size="sm" full>Contact Support</Btn>
        </div>

        {/* Community Section */}
        <div className="flex flex-col gap-[12px]">
          <span className="text-[11px] font-bold text-[var(--text4)] uppercase tracking-wider">Community</span>
          <div className="grid grid-cols-2 gap-[8px]">
            <div className="p-[12px] rounded-[12px] bg-[var(--surface2)] border border-[var(--border)] flex flex-col items-center gap-[6px] cursor-pointer hover:border-[var(--accent)] transition-all">
              <span className="w-[20px] h-[20px] text-[var(--text3)]">{Icons.globe}</span>
              <span className="text-[11px] font-bold text-[var(--text2)]">Forum</span>
            </div>
            <div className="p-[12px] rounded-[12px] bg-[var(--surface2)] border border-[var(--border)] flex flex-col items-center gap-[6px] cursor-pointer hover:border-[var(--accent)] transition-all">
              <span className="w-[20px] h-[20px] text-[var(--text3)]">{Icons.star}</span>
              <span className="text-[11px] font-bold text-[var(--text2)]">Reviews</span>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-[10px]">
          <div className="text-[13px] font-bold text-[var(--text)]">Join Newsletter</div>
          <div className="text-[11px] text-[var(--text4)]">Get performance tips and plugin updates directly in your inbox.</div>
          <div className="flex gap-[6px] mt-[4px]">
            <input 
              type="text" 
              placeholder="Email address" 
              className="flex-1 bg-[var(--surface2)] border border-[var(--border)] rounded-[8px] p-[8px_12px] text-[12px] outline-none focus:border-[var(--accent)] transition-all"
            />
            <button className="bg-[var(--accent)] text-white border-none rounded-[8px] p-[0_12px] cursor-pointer hover:opacity-90 transition-all">
              <span className="w-[14px] h-[14px]">{Icons.check}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-[16px_20px] border-t border-[var(--border)] flex items-center justify-between">
        <span className="text-[10px] text-[var(--text4)] font-medium">© 2024 SpeedPress</span>
        <div className="flex gap-[12px]">
          <span className="w-[14px] h-[14px] text-[var(--text4)] cursor-pointer hover:text-[var(--text2)]">{Icons.globe}</span>
          <span className="w-[14px] h-[14px] text-[var(--text4)] cursor-pointer hover:text-[var(--text2)]">{Icons.heart}</span>
        </div>
      </div>
    </div>
  );
}
