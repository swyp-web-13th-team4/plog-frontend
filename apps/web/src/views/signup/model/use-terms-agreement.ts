import { useEffect, useState } from 'react';

import { type TermId, type TermsAgreements } from '@/entities/user';

export type TermItem = {
  id: TermId;
  label: string;
  required: boolean;
  link?: string;
};

export const TERM_LIST: TermItem[] = [
  { id: 'isOver14', label: '[필수] 만 14세 이상입니다.', required: true },
  {
    id: 'service',
    label: '[필수] 서비스 이용약관 동의',
    required: true,
    link: '/terms/service',
  },
  {
    id: 'privacy',
    label: '[필수] 개인정보 수집 및 이용 동의',
    required: true,
    link: '/terms/privacy',
  },
  {
    id: 'geolocation',
    label: '[필수] 위치 기반 서비스 이용약관 동의',
    required: true,
    link: '/terms/geolocation',
  },
];

const STORAGE_KEY = 'signup:terms-agreed';
const NAV_FLAG_KEY = 'signup:terms-nav';

export function useTermsAgreement() {
  const [agreed, setAgreed] = useState<Set<TermId>>(() => {
    if (typeof window === 'undefined') return new Set();
    const isReturningFromTerms = sessionStorage.getItem(NAV_FLAG_KEY) === '1';
    sessionStorage.removeItem(NAV_FLAG_KEY);
    if (!isReturningFromTerms) {
      sessionStorage.removeItem(STORAGE_KEY);
      return new Set();
    }
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved) as TermId[]) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...agreed]));
  }, [agreed]);

  const allAgreed = TERM_LIST.every((t) => agreed.has(t.id));
  const someAgreed = agreed.size > 0 && !allAgreed;
  const requiredAgreed = TERM_LIST.filter((t) => t.required).every((t) =>
    agreed.has(t.id),
  );

  const toggleAll = () => {
    setAgreed(allAgreed ? new Set() : new Set(TERM_LIST.map((t) => t.id)));
  };

  const toggle = (id: TermId) => {
    setAgreed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const markNavigation = () => sessionStorage.setItem(NAV_FLAG_KEY, '1');

  const getAgreements = (): TermsAgreements => {
    sessionStorage.removeItem(STORAGE_KEY);
    return Object.fromEntries(
      TERM_LIST.map((t) => [t.id, agreed.has(t.id)]),
    ) as TermsAgreements;
  };

  return {
    agreed,
    allAgreed,
    someAgreed,
    requiredAgreed,
    toggleAll,
    toggle,
    markNavigation,
    getAgreements,
  };
}
