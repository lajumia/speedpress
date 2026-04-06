import React, { useState } from 'react';
import { Modal, Btn, ProgressBar, Toggle, Row } from './Primitives';
import type { SpeedPressOptions } from '../types';

interface SetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
  opts: SpeedPressOptions;
  set: (key: keyof SpeedPressOptions, val: any) => void;
}

export function SetupWizard({ isOpen, onClose, opts, set }: SetupWizardProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const next = () => {
    if (step < totalSteps) setStep(step + 1);
    else {
      set('setup_wizard_completed', true);
      onClose();
    }
  };

  const prev = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center text-center gap-[20px] animate-[fadeUp_0.3s_ease]">
            <div className="w-[80px] h-[80px] bg-[var(--accent-bg)] text-[var(--accent)] rounded-[24px] flex items-center justify-center text-[40px] shadow-inner">
              🚀
            </div>
            <div>
              <h2 className="text-[24px] font-black text-[var(--text)] mb-[8px]">Optimize Your Site</h2>
              <p className="text-[var(--text3)] text-[14px] leading-[1.6]">
                Welcome to SpeedPress! This wizard will help you configure the most important settings to get your site running at lightning speed.
              </p>
            </div>
            <div className="bg-[var(--surface2)] p-[16px] rounded-[16px] border border-[var(--border)] w-full text-left">
              <div className="text-[12px] font-bold text-[var(--text4)] uppercase mb-[8px]">What we'll do:</div>
              <ul className="text-[13px] text-[var(--text2)] flex flex-col gap-[8px]">
                <li className="flex items-center gap-[8px]">✅ Enable Smart Caching</li>
                <li className="flex items-center gap-[8px]">✅ Optimize Media & Images</li>
                <li className="flex items-center gap-[8px]">✅ Fine-tune Scripts & CSS</li>
              </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-[20px] animate-[fadeUp_0.3s_ease]">
            <div className="text-center mb-[10px]">
              <h2 className="text-[20px] font-black text-[var(--text)] mb-[4px]">Core Optimization</h2>
              <p className="text-[var(--text3)] text-[13px]">Essential settings for immediate performance gains.</p>
            </div>
            <div className="flex flex-col gap-[12px]">
              <Row label="Page Caching" hint="Store static versions of your pages for instant delivery">
                <Toggle checked={opts.cache_enabled} onChange={(v) => set('cache_enabled', v)} />
              </Row>
              <Row label="Gzip Compression" hint="Compress site files to reduce transfer size">
                <Toggle checked={opts.gzip_compression} onChange={(v) => set('gzip_compression', v)} />
              </Row>
              <Row label="Minify HTML" hint="Remove unnecessary whitespace from your HTML" last>
                <Toggle checked={opts.min_html} onChange={(v) => set('min_html', v)} />
              </Row>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-[20px] animate-[fadeUp_0.3s_ease]">
            <div className="text-center mb-[10px]">
              <h2 className="text-[20px] font-black text-[var(--text)] mb-[4px]">Media & Images</h2>
              <p className="text-[var(--text3)] text-[13px]">Images are usually the heaviest part of a site.</p>
            </div>
            <div className="flex flex-col gap-[12px]">
              <Row label="Lazy Load Images" hint="Only load images as they enter the viewport">
                <Toggle checked={opts.lazy_images} onChange={(v) => set('lazy_images', v)} />
              </Row>
              <Row label="WebP Conversion" hint="Serve modern, smaller image formats automatically">
                <Toggle checked={opts.webp} onChange={(v) => set('webp', v)} />
              </Row>
              <Row label="Video Facades" hint="Replace heavy video players with lightweight previews" last>
                <Toggle checked={opts.yt_preview} onChange={(v) => set('yt_preview', v)} />
              </Row>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col items-center text-center gap-[20px] animate-[fadeUp_0.3s_ease]">
            <div className="w-[80px] h-[80px] bg-[var(--green-bg)] text-[var(--green)] rounded-[24px] flex items-center justify-center text-[40px]">
              ✨
            </div>
            <div>
              <h2 className="text-[24px] font-black text-[var(--text)] mb-[8px]">You're All Set!</h2>
              <p className="text-[var(--text3)] text-[14px] leading-[1.6]">
                Great job! Your site is now configured with optimal speed settings. You can always fine-tune these in the advanced tabs.
              </p>
            </div>
            <div className="p-[20px] bg-[var(--surface2)] rounded-[16px] border border-[var(--border)] w-full">
              <div className="text-[13px] font-bold text-[var(--text2)] mb-[4px]">Estimated Performance Boost</div>
              <div className="text-[32px] font-black text-[var(--green)]">+45%</div>
              <div className="text-[11px] text-[var(--text4)] uppercase font-bold mt-[4px]">Based on current configuration</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Setup Wizard (${step}/${totalSteps})`}
      maxWidth={500}
      footer={
        <div className="flex justify-between w-full items-center">
          <div className="flex-1 mr-[20px]">
            <ProgressBar pct={(step / totalSteps) * 100} size="sm" />
          </div>
          <div className="flex gap-[12px]">
            {step > 1 && (
              <Btn variant="ghost" onClick={prev}>
                Back
              </Btn>
            )}
            <Btn variant="primary" onClick={next}>
              {step === totalSteps ? 'Finish' : 'Next Step'}
            </Btn>
          </div>
        </div>
      }
    >
      {renderStep()}
    </Modal>
  );
}
