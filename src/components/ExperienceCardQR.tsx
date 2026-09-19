import Image from 'next/image';

type ExperienceCardQRProps = {
  className?: string;
  variant?: 'light' | 'dark';
};

export default function ExperienceCardQR({ className = '', variant = 'light' }: ExperienceCardQRProps) {
  const isDark = variant === 'dark';

  return (
    <section
      aria-label="生财有术 3 天体验卡二维码"
      className={`flex w-full max-w-[22rem] items-center gap-4 rounded-2xl border p-4 ${isDark ? 'border-white/20 bg-white/10 text-white' : 'border-[#B7DED6] bg-white/85 text-[#163832]'} ${className}`}
    >
      <div className="shrink-0 overflow-hidden rounded-xl bg-white p-1.5 shadow-sm">
        <Image
          src="/images/shengcai/experience-card-qr-crop.jpg"
          alt="微信扫码领取生财有术 3 天体验卡"
          width={144}
          height={144}
          className="h-28 w-28 rounded-lg sm:h-32 sm:w-32"
        />
      </div>
      <div className="min-w-0">
        <p className={`text-xs font-bold uppercase tracking-[0.14em] ${isDark ? 'text-[#A9DDD1]' : 'text-[#067C6A]'}`}>Shengcai Experience</p>
        <p className="mt-1 text-lg font-black leading-6">微信扫码，免费体验 3 天</p>
        <p className={`mt-2 text-xs leading-5 ${isDark ? 'text-[#D6E9E4]' : 'text-[#59616B]'}`}>电脑端用微信扫码；手机端长按图片保存后，用微信扫一扫。</p>
      </div>
    </section>
  );
}
