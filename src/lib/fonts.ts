import { Noto_Sans_SC } from 'next/font/google';

export const notoSansSC = Noto_Sans_SC({
    subsets: ['latin'],
    weight: ['300', '400', '500', '700'],
    variable: '--font-noto-sans-sc',
    display: 'swap',
});

export const fontClasses = `${notoSansSC.variable} font-sans`;