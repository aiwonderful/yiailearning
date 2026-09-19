'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type ExperienceCardCTAProps = {
  className?: string;
  label?: string;
  placement: 'hero' | 'list' | 'detail' | 'footer';
};

function trackExperienceEvent(eventName: string, placement: string) {
  if (typeof window === 'undefined' || !(window as Window & { gtag?: (...args: unknown[]) => void }).gtag) return;
  (window as Window & { gtag: (...args: unknown[]) => void }).gtag('event', eventName, {
    event_category: 'ai_money',
    placement,
  });
}

export default function ExperienceCardCTA({
  className = '',
  label = '免费领 3 天体验卡',
  placement,
}: ExperienceCardCTAProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    trackExperienceEvent('experience_qr_modal_view', placement);
    if (window.matchMedia('(max-width: 767px)').matches) {
      trackExperienceEvent('experience_qr_save_hint_view', placement);
    }
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, placement]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          trackExperienceEvent('experience_cta_click', placement);
          setIsOpen(true);
        }}
        data-experience-card-placement={placement}
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#067C6A] px-5 py-3 font-bold text-white shadow-lg shadow-[#067C6A]/20 transition hover:-translate-y-0.5 hover:bg-[#056B5C] focus:outline-none focus:ring-2 focus:ring-[#067C6A] focus:ring-offset-2 ${className}`}
      >
        {label}
        <span aria-hidden="true">→</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end bg-[#20242A]/60 p-4 backdrop-blur-sm sm:items-center sm:justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="experience-card-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div className="relative w-full max-w-sm rounded-[1.75rem] bg-[#FFFDF8] p-6 shadow-2xl sm:p-8">
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="关闭体验卡二维码"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-xl text-[#59616B] transition hover:bg-[#EAF2EF] hover:text-[#20242A] focus:outline-none focus:ring-2 focus:ring-[#067C6A]"
            >
              ×
            </button>
            <div className="pr-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#067C6A]">Shengcai Experience</p>
              <h2 id="experience-card-title" className="mt-2 font-serif text-2xl font-black text-[#20242A]">
                扫码免费领 3 天体验卡
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#59616B]">领取后可在生财有术查看原帖全文、完整复盘和更多实操案例。</p>
            </div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-[#B7DED6] bg-white p-2">
              <Image
                src="/images/shengcai/experience-card-poster.jpg"
                alt="生财有术 3 天体验卡完整海报，含领取二维码"
                width={1163}
                height={1985}
                className="h-auto w-full rounded-xl"
              />
            </div>
            <div className="mt-5 space-y-2 text-sm leading-6 text-[#59616B]">
              <p><span className="font-bold text-[#20242A]">电脑端：</span>打开微信扫码领取。</p>
              <p><span className="font-bold text-[#20242A]">手机端：</span>长按保存上方图片，再打开微信扫一扫，从相册选择图片。</p>
              <p className="pt-1 text-xs text-[#7B858F]">体验卡权益以生财有术实际页面为准。</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
