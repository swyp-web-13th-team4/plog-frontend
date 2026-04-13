import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { Dialog as BaseDialog } from '@base-ui/react';
import { cn } from '@plog/utils';

type DialogProps = ComponentPropsWithoutRef<typeof BaseDialog.Root>;

type DialogSubComponentProps = {
  children: ReactNode;
  className?: string;
};

type DialogContentProps = DialogSubComponentProps & {
  initialFocus?: ComponentPropsWithoutRef<
    typeof BaseDialog.Popup
  >['initialFocus'];
  finalFocus?: ComponentPropsWithoutRef<typeof BaseDialog.Popup>['finalFocus'];
};

type DialogActionsProps = DialogSubComponentProps & {
  layout?: 'horizontal' | 'vertical';
};

function DialogRoot(props: DialogProps) {
  return <BaseDialog.Root {...props} />;
}

function Content({
  children,
  className,
  initialFocus,
  finalFocus,
}: DialogContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 bg-semantic-system-black/60 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
      <BaseDialog.Popup
        initialFocus={initialFocus}
        finalFocus={finalFocus}
        className={cn(
          'fixed top-1/2 left-1/2 flex w-[calc(100%-40px)] max-w-90 translate-y-0 [transform:translate(-50%,-50%)] flex-col items-center gap-5 rounded-2xl bg-semantic-system-white p-6 text-center',
          'transition-[opacity,translate] duration-200 ease-out data-[ending-style]:translate-y-3 data-[ending-style]:opacity-0 data-[starting-style]:translate-y-3 data-[starting-style]:opacity-0',
          className,
        )}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

function Header({ children, className }: DialogSubComponentProps) {
  return (
    <div className={cn('flex w-full flex-col items-center', className)}>
      {children}
    </div>
  );
}

function Graphic({ children, className }: DialogSubComponentProps) {
  return (
    <div
      data-slot="graphic"
      className={cn('flex items-center justify-center', className)}
    >
      {children}
    </div>
  );
}

function Title({ children, className }: DialogSubComponentProps) {
  return (
    <BaseDialog.Title
      data-slot="title"
      className={cn(
        'title-xs text-semantic-object-boldest [[data-slot=graphic]_+_&]:mt-3',
        className,
      )}
    >
      {children}
    </BaseDialog.Title>
  );
}

function Description({ children, className }: DialogSubComponentProps) {
  return (
    <BaseDialog.Description
      className={cn(
        'body-sm text-left text-semantic-object-normal [[data-slot=title]_+_&]:mt-1',
        className,
      )}
    >
      {children}
    </BaseDialog.Description>
  );
}

function Body({ children, className }: DialogSubComponentProps) {
  return <div className={cn('w-full', className)}>{children}</div>;
}

function Actions({
  layout = 'horizontal',
  children,
  className,
}: DialogActionsProps) {
  return (
    <div
      className={cn(
        'flex w-full gap-3',
        layout === 'vertical' ? 'flex-col' : 'flex-row',
        className,
      )}
    >
      {children}
    </div>
  );
}

const Dialog = Object.assign(DialogRoot, {
  Trigger: BaseDialog.Trigger,
  Content,
  Header,
  Graphic,
  Title,
  Description,
  Body,
  Actions,
  Close: BaseDialog.Close,
  createHandle: BaseDialog.createHandle,
});

export default Dialog;
