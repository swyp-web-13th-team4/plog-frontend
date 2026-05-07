'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export function useScrollToTop() {
  const [isScrollable, setIsScrollable] = useState(false);
  const { ref: topRef, inView: isTopVisible } = useInView({ threshold: 0 });

  useEffect(() => {
    const update = () => {
      setIsScrollable(
        document.documentElement.scrollHeight > window.innerHeight,
      );
    };

    update();
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  return { topRef, visible: isScrollable && !isTopVisible };
}
