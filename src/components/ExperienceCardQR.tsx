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
      className={`mx-auto flex w-full max-w-[22rem] flex-col rounded-2xl border p-4 ${isDark ? 'border-white/20 bg-white/10 text-white' : 'border-[#B7DED6] bg-white/85 text-[#163832]'} ${className}`}
    >
      <div className="mx-auto w-full max-w-[15rem] overflow-hidden rounded-xl bg-white shadow-sm">
        <Image
          src="/images/shengcai/experience-card-poster.jpg"
          alt="生财有术 3 天体验卡完整海报，含领取二维码"
          width={1163}
          height={1985}
          className="h-auto w-full rounded-xl"
        />
      </div>
      <div className="mt-4 min-w-0">
        <p className={`text-xs font-bold uppercase tracking-[0.14em] ${isDark ? 'text-[#A9DDD1]' : 'text-[#067C6A]'}`}>Shengcai Experience</p>
        <p className="mt-1 text-lg font-black leading-6">微信扫码，免费体验 3 天</p>
        <p className={`mt-2 text-xs leading-5 ${isDark ? 'text-[#D6E9E4]' : 'text-[#59616B]'}`}>电脑端用微信扫码；手机端长按图片保存后，用微信扫一扫。</p>
      </div>
    </section>
  );
}
