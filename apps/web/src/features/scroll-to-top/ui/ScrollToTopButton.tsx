import UpArrowIcon from '@/shared/assets/icons/up-arrow.svg';

type ScrollToTopButtonProps = {
  visible: boolean;
};

export default function ScrollToTopButton({ visible }: ScrollToTopButtonProps) {
  return (
    <div className="pointer-events-none fixed bottom-[calc(var(--spacing-bottom-tab)+36px)] left-1/2 z-20 w-full max-w-layout -translate-x-1/2 px-9">
      <div className="flex justify-end">
        <button
          type="button"
          aria-label="최상단으로 이동"
          aria-hidden={!visible}
          tabIndex={visible ? 0 : -1}
          className={`pointer-events-auto flex size-15 cursor-pointer items-center justify-center rounded-full bg-semantic-object-inverse shadow-[0px_2px_12px_0px_rgba(0,0,0,0.25)] transition-all duration-200 ${
            visible
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-2 opacity-0'
          }`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <UpArrowIcon />
        </button>
      </div>
    </div>
  );
}
