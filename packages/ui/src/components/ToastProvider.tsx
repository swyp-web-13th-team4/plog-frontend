import { type ReactNode } from 'react';

import { Toast as BaseToast } from '@base-ui/react/toast';
import { cn } from '@plog/utils';
import { cva } from 'class-variance-authority';

import ErrorIcon from '@/assets/toast-error.svg?react';
import SuccessIcon from '@/assets/toast-success.svg?react';
import { type ToastData, type ToastType } from '@/types/Toast.type';

const toastVariants = cva(
  'flex w-[90dvw] min-h-14 items-center gap-2 rounded-xl border bg-semantic-system-white p-3 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]',
  {
    variants: {
      type: {
        default:
          'border-semantic-stroke-assistive text-object-bold [&_span]:bg-semantic-object-subtler',
        success:
          'border-semantic-feedback-success-assistive text-semantic-feedback-success-bold [&_span]:bg-semantic-feedback-success-subtle',
        error:
          'border-semantic-feedback-error-assistive text-semantic-feedback-error-normal [&_span]:bg-semantic-feedback-error-subtle',
      },
    },
    defaultVariants: {
      type: 'default',
    },
  },
);

type ToastProviderProps = {
  children: ReactNode;
  timeout?: number;
  limit?: number;
};

function ToastList() {
  const { toasts } = BaseToast.useToastManager<ToastData>();

  const resolveIcon = (
    type: ToastType | undefined,
    customIcon: ReactNode,
  ): ReactNode => {
    if (type === 'success') return <SuccessIcon />;
    if (type === 'error') return <ErrorIcon />;
    return customIcon;
  };

  return (
    <>
      {toasts.map((toast) => {
        const icon = resolveIcon(toast.type as ToastType, toast.data?.icon);
        return (
          <BaseToast.Root
            key={toast.id}
            toast={toast}
            style={
              (toast.updateKey ?? 0) > 0
                ? {
                    animationName:
                      (toast.updateKey ?? 0) % 2 === 0
                        ? 'toast-pulse-a'
                        : 'toast-pulse-b',
                    animationDuration: '300ms',
                  }
                : undefined
            }
            className={cn(
              toastVariants({ type: toast.type as ToastType }),
              'transition-[opacity,translate] duration-200 ease-out',
              'data-[starting-style]:translate-y-2 data-[starting-style]:opacity-0',
              'data-[ending-style]:translate-y-2 data-[ending-style]:opacity-0',
              'data-[swiping]:[translate:var(--toast-swipe-movement-x,0px)_var(--toast-swipe-movement-y,0px)] data-[swiping]:duration-0 data-[swiping]:select-none',
              'data-[swipe-direction=right]:translate-x-[150%] data-[swipe-direction=right]:opacity-0',
              'data-[swipe-direction=down]:translate-y-[150%] data-[swipe-direction=down]:opacity-0',
            )}
          >
            {icon && (
              <span className="rounded-lg p-[6px] [&_svg]:size-4">{icon}</span>
            )}
            <BaseToast.Description className="label-md flex-1" />
          </BaseToast.Root>
        );
      })}
    </>
  );
}

function ToastProvider({
  children,
  timeout = 3000,
  limit = 3,
}: ToastProviderProps) {
  return (
    <BaseToast.Provider timeout={timeout} limit={limit}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2">
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

export default ToastProvider;
