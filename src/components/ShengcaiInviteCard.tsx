import Image from 'next/image';

type ShengcaiInviteCardProps = {
  id?: string;
  className?: string;
};

const trialQr = {
  src: '/images/shengcai/experience-card-qr-square.jpg',
  alt: '小亦的生财有术3天体验卡二维码，扫码领取后先阅读精华帖',
  width: 720,
  height: 720,
};

const coupon = {
  src: '/images/shengcai/shengcai-double11-400-coupon.jpg',
  alt: '生财有术双十一400元优惠券二维码，有效期2026年11月1日至11月11日，海报标注前500名加入可用',
  width: 580,
  height: 873,
};

const inlineInviteMarkers = [
  '/images/shengcai/experience-card-qr-square.jpg',
  '/images/shengcai/experience-card-qr.jpg',
  '/images/shengcai/experience-card-qr-crop.jpg',
  '/images/shengcai/experience-card-poster.jpg',
  '/images/shengcai/shengcai-double11-400-coupon.jpg',
];

export function contentHasShengcaiInvite(content: string) {
  return inlineInviteMarkers.some((marker) => content.includes(marker));
}

export default function ShengcaiInviteCard({ id = 'shengcai-invite', className = '' }: ShengcaiInviteCardProps) {
  return (
    <section
      id={id}
      aria-label="生财有术 3 天体验卡"
      className={`scroll-mt-28 rounded-[1.75rem] border border-[#B7DED6] bg-[#F8FCFA] p-5 text-[#163832] shadow-soft dark:border-white/10 dark:bg-[#122E29] dark:text-[#F8FCFA] sm:p-7 ${className}`}
    >
      <p className="text-sm font-bold text-[#067C6A] dark:text-[#A9DDD1]">生财有术 · 3 天体验卡</p>
      <h2 className="mt-2 max-w-2xl font-serif text-2xl font-black leading-tight md:text-3xl">
        先免费体验 3 天，再决定要不要加入
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-[#356158] dark:text-[#D6E9E4]">
        如果你还不确定生财的内容适不适合自己，可以先领我的 3 天体验卡。原帖全文和更多实操案例都在生财有术里，扫码即可领取体验卡。
      </p>

      <div className="mt-6 grid items-start gap-4 md:grid-cols-2">
        <figure className="flex h-full flex-col rounded-2xl border border-[#B7DED6] bg-white p-4 text-[#163832] dark:border-white/15">
          <figcaption className="text-sm font-bold text-[#067C6A]">微信扫码，免费体验 3 天</figcaption>
          <div className="mx-auto mt-3 w-full max-w-[16rem] overflow-hidden rounded-xl bg-[#F4FBF8]">
            <Image
              src={trialQr.src}
              alt={trialQr.alt}
              width={trialQr.width}
              height={trialQr.height}
              sizes="256px"
              className="h-auto w-full"
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-[#356158]">扫码领取 3 天体验卡，先看看你感兴趣的项目复盘。</p>
          <p className="mt-2 text-sm leading-6 text-[#59616B]">电脑端用微信扫码；手机端长按图片保存后，用微信扫一扫。</p>
          <p className="mt-2 text-xs leading-5 text-[#59616B]">
            体验卡用于先看精华帖，不能参加航海，也不包含航海报名名额。体验卡权益以生财有术实际页面为准。
          </p>
        </figure>

        <figure className="flex h-full flex-col rounded-2xl border border-[#B7DED6] bg-white p-4 text-[#163832] dark:border-white/15">
          <figcaption className="text-sm font-bold text-[#067C6A]">觉得适合，再看看这张 400 元优惠券</figcaption>
          <p className="mt-2 text-sm leading-6 text-[#356158]">
            准备加入的朋友，可以先把下面这张券保存好，体验结束后更容易找到。
          </p>
          <div className="mx-auto mt-3 w-full max-w-[16rem] overflow-hidden rounded-xl">
            <Image
              src={coupon.src}
              alt={coupon.alt}
              width={coupon.width}
              height={coupon.height}
              sizes="256px"
              className="h-auto w-full"
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-[#59616B]">
            海报标注：<strong className="font-bold text-[#163832]">生财有术 400 元优惠券，可用时间为 2026 年 11 月 1 日 00:00 至 11 月 11 日 23:59，前 500 名加入可用。</strong>剩余名额及能否使用，以扫码后的领取和支付页面为准。
          </p>
          <p className="mt-2 text-xs leading-5 text-[#59616B]">
            先保存优惠券图片，确定加入时扫码查看并领取优惠。这张券 11 月 11 日 23:59 到期。
          </p>
        </figure>
      </div>
    </section>
  );
}
