import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ShengcaiInviteCard, { contentHasShengcaiInvite } from '../ShengcaiInviteCard';

describe('ShengcaiInviteCard', () => {
  it('reuses the existing trial-card and coupon wording and images', () => {
    render(<ShengcaiInviteCard id="experience-card" />);

    expect(screen.getByRole('region', { name: '生财有术 3 天体验卡' })).toHaveAttribute('id', 'experience-card');
    expect(screen.getByRole('heading', { name: '先免费体验 3 天，再决定要不要加入' })).toBeInTheDocument();
    expect(screen.getByText('如果你还不确定生财的内容适不适合自己，可以先领我的 3 天体验卡。原帖全文和更多实操案例都在生财有术里，扫码即可领取体验卡。')).toBeInTheDocument();
    expect(screen.getByAltText('小亦的生财有术3天体验卡二维码，扫码领取后先阅读精华帖')).toHaveAttribute(
      'src',
      '/images/shengcai/experience-card-qr-square.jpg',
    );
    expect(screen.getByAltText('生财有术双十一400元优惠券二维码，有效期2026年11月1日至11月11日，海报标注前500名加入可用')).toHaveAttribute(
      'src',
      '/images/shengcai/shengcai-double11-400-coupon.jpg',
    );
    expect(screen.getByText(/2026 年 11 月 1 日 00:00 至 11 月 11 日 23:59，前 500 名加入可用/)).toBeInTheDocument();
    expect(screen.getByText(/不能参加航海，也不包含航海报名名额/)).toBeInTheDocument();
  });

  it('detects posts that already embed the invite images', () => {
    expect(contentHasShengcaiInvite('<img src="/images/shengcai/experience-card-qr-square.jpg" alt="" />')).toBe(true);
    expect(contentHasShengcaiInvite('![coupon](/images/shengcai/shengcai-double11-400-coupon.jpg)')).toBe(true);
    expect(contentHasShengcaiInvite('<p>这篇没有邀请二维码。</p>')).toBe(false);
  });
});
