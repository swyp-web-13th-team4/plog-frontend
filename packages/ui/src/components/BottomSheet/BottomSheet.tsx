import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import { cn } from '@plog/utils';

import CloseIcon from '@/assets/close.svg?react';

import { type BottomSheetSnapPoint } from './BottomSheet.types';

type BottomSheetSubComponentProps = {
  children: ReactNode;
  className?: string;
};

type BottomSheetContentProps = BottomSheetSubComponentProps & {
  initialFocus?: ComponentPropsWithoutRef<
    typeof BaseDrawer.Popup
  >['initialFocus'];
  finalFocus?: ComponentPropsWithoutRef<typeof BaseDrawer.Popup>['finalFocus'];
  backdrop?: boolean;
};

function BottomSheetRoot(
  props: ComponentPropsWithoutRef<typeof BaseDrawer.Root>,
) {
  return <BaseDrawer.Root {...props} />;
}

function Handle() {
  return (
    <div className="h-1.5 w-15 shrink-0 cursor-grab rounded-full bg-semantic-object-subtler first:-mt-2" />
  );
}

const popupBaseStyles =
  'relative flex max-h-[calc(100dvh-2rem)] min-h-0 w-full flex-col items-center gap-3 overflow-visible rounded-t-2xl bg-semantic-system-white px-5 pt-5';

const popupBleedStyles =
  'after:pointer-events-none after:absolute after:inset-x-0 after:top-[calc(100%-1px)] after:h-12 after:bg-semantic-system-white after:content-[""]';

const popupPaddingStyles = cn(
  '[padding-bottom:max(calc(20px+env(safe-area-inset-bottom,0px)),var(--drawer-snap-point-offset,_0px))]',
  'data-[starting-style]:[padding-bottom:0] data-[ending-style]:[padding-bottom:0]',
);

const popupAnimationStyles = cn(
  '[transform:translateY(calc(var(--drawer-snap-point-offset,_0px)+var(--drawer-swipe-movement-y,_0px)))]',
  'transition-transform duration-400 ease-out',
  'data-[starting-style]:[transform:translateY(calc(100dvh+2px))]',
  'data-[ending-style]:[transform:translateY(calc(100dvh+2px))]',
  'data-[ending-style]:!duration-[calc(var(--drawer-swipe-strength,_1)*400ms)]',
  'data-[swiping]:cursor-grabbing data-[swiping]:duration-0 data-[swiping]:select-none',
);

function Content({
  children,
  className,
  initialFocus,
  finalFocus,
  backdrop = true,
}: BottomSheetContentProps) {
  return (
    <BaseDrawer.Portal>
      {backdrop && (
        <BaseDrawer.Backdrop className="fixed inset-0 z-100 bg-semantic-system-black/60 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
      )}
      <BaseDrawer.Viewport className="pointer-events-none fixed inset-0 z-100 flex items-end justify-center">
        <BaseDrawer.Popup
          initialFocus={initialFocus}
          finalFocus={finalFocus}
          className={cn(
            'pointer-events-auto',
            popupBaseStyles,
            popupBleedStyles,
            popupPaddingStyles,
            popupAnimationStyles,
            className,
          )}
        >
          {children}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  );
}

function Header({ children, className }: BottomSheetSubComponentProps) {
  return (
    <div className={cn('flex w-full justify-between', className)}>
      {children}
    </div>
  );
}

function Title({ children, className }: BottomSheetSubComponentProps) {
  return (
    <BaseDrawer.Title
      className={cn('title-sm text-semantic-object-boldest', className)}
    >
      {children}
    </BaseDrawer.Title>
  );
}

function CloseButton() {
  return (
    <BaseDrawer.Close
      render={
        <button type="button" aria-label="닫기" className="cursor-pointer">
          <CloseIcon />
        </button>
      }
    />
  );
}

function Body({ children, className }: BottomSheetSubComponentProps) {
  return <div className={cn('w-full', className)}>{children}</div>;
}

const BottomSheet = Object.assign(BottomSheetRoot, {
  Trigger: BaseDrawer.Trigger,
  Close: BaseDrawer.Close,
  Content,
  Handle,
  Header,
  Title,
  CloseButton,
  Body,
  createHandle: BaseDrawer.createHandle,
});

export default BottomSheet;

export type { BottomSheetSnapPoint };
