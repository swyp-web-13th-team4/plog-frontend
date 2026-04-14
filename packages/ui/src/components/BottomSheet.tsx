import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import { cn } from '@plog/utils';

import CloseIcon from '@/assets/close.svg?react';
import { BottomSheetContext } from '@/contexts/BottomSheetContext';
import { useBottomSheetContext } from '@/hooks/useBottomSheetContext';

type BottomSheetProps = ComponentPropsWithoutRef<typeof BaseDrawer.Root> & {
  withHandle?: boolean;
};

type BottomSheetSubComponentProps = {
  children: ReactNode;
  className?: string;
};

type BottomSheetContentProps = BottomSheetSubComponentProps & {
  initialFocus?: ComponentPropsWithoutRef<
    typeof BaseDrawer.Popup
  >['initialFocus'];
  finalFocus?: ComponentPropsWithoutRef<typeof BaseDrawer.Popup>['finalFocus'];
};

function BottomSheetRoot({ withHandle = true, ...props }: BottomSheetProps) {
  return (
    <BottomSheetContext value={{ withHandle }}>
      <BaseDrawer.Root
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        swipeDirection={withHandle ? 'down' : (null as any)}
        {...props}
      />
    </BottomSheetContext>
  );
}

function Content({
  children,
  className,
  initialFocus,
  finalFocus,
}: BottomSheetContentProps) {
  const { withHandle } = useBottomSheetContext();
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop className="fixed inset-0 bg-semantic-system-black/60 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
      <BaseDrawer.Viewport className="fixed inset-0 flex items-end justify-center">
        <BaseDrawer.Popup
          initialFocus={initialFocus}
          finalFocus={finalFocus}
          className={cn(
            '-mb-[48px] flex max-h-[calc(80dvh+48px)] w-full flex-col items-center rounded-t-2xl bg-semantic-system-white px-5 pt-5 pb-[calc(20px+env(safe-area-inset-bottom,0px)+48px)]',
            withHandle && 'cursor-grab',
            '[transform:translateY(var(--drawer-swipe-movement-y,_0px))] transition-transform duration-300 ease-out data-[ending-style]:[transform:translateY(calc(100%-48px+2px))] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength,_1)*200ms)] data-[starting-style]:[transform:translateY(calc(100%-48px+2px))]',
            withHandle &&
              'data-[swiping]:cursor-grabbing data-[swiping]:duration-0 data-[swiping]:select-none',
            className,
          )}
        >
          {withHandle && (
            <div className="mb-3 h-1.5 w-15 rounded-full bg-semantic-object-subtler" />
          )}
          <BaseDrawer.Content className="flex w-full cursor-default flex-col gap-3">
            {children}
          </BaseDrawer.Content>
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
        <button type="button" className="cursor-pointer">
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
  Header,
  Title,
  CloseButton,
  Body,
  createHandle: BaseDrawer.createHandle,
});

export default BottomSheet;
