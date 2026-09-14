'use client';

import { useEffect } from 'react';

type AiMoneyPageViewProps = {
  caseId?: string;
  topic?: string;
  type: 'list' | 'detail';
};

export default function AiMoneyPageView({ caseId, topic, type }: AiMoneyPageViewProps) {
  useEffect(() => {
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (!gtag) return;

    gtag('event', type === 'list' ? 'ai_money_list_view' : 'ai_money_case_view', {
      event_category: 'ai_money',
      case_id: caseId,
      topic,
    });
  }, [caseId, topic, type]);

  return null;
}
