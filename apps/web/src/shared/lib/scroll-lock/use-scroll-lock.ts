import { useEffect } from 'react';

function lockBodyScroll() {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';
}

function unlockBodyScroll() {
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  document.body.style.touchAction = '';
}

export function useScrollLock() {
  useEffect(() => {
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, []);
}
