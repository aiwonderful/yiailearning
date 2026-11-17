import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ShengcaiInviteCard, { contentHasShengcaiInvite } from '../ShengcaiInviteCard';

describe('ShengcaiInviteCard', () => {
  it('keeps the trial card and does not promote the expired coupon', () => {
    render(<ShengcaiInviteCard id="experience-card" />);

    expect(screen.getByRole('region', { name: '生财有术 3 天体验卡' })).toHaveAttribute('id', 'experience-card');
    expect(screen.getByRole('heading', { name: '先免费体验 3 天，再决定要不要加入' })).toBeInTheDocument();
    expect(screen.getByText('如果你还不确定生财的内容适不适合自己，可以先领我的 3 天体验卡。原帖全文和更多实操案例都在生财有术里，扫码即可领取体验卡。')).toBeInTheDocument();
    expect(screen.getByAltText('小亦的生财有术3天体验卡二维码，扫码领取后先阅读精华帖')).toHaveAttribute(
      'src',
      '/images/shengcai/experience-card-qr-square.jpg',
    );
    expect(screen.queryByText(/400 元/)).not.toBeInTheDocument();
    expect(screen.queryByText(/11 月 11 日/)).not.toBeInTheDocument();
    expect(screen.getByText(/不能参加航海，也不包含航海报名名额/)).toBeInTheDocument();
  });

  it('detects posts that already embed the invite images', () => {
    expect(contentHasShengcaiInvite('<img src="/images/shengcai/experience-card-qr-square.jpg" alt="" />')).toBe(true);
    expect(contentHasShengcaiInvite('![coupon](/images/shengcai/shengcai-double11-400-coupon.jpg)')).toBe(true);
    expect(contentHasShengcaiInvite('<p>这篇没有邀请二维码。</p>')).toBe(false);
  });
});
