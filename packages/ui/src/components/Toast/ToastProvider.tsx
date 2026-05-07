import { type ReactNode } from 'react';

import { Toast as BaseToast } from '@base-ui/react/toast';
import { cn } from '@plog/utils';
import { cva } from 'class-variance-authority';

import ErrorIcon from '@/assets/toast-error.svg?react';
import SuccessIcon from '@/assets/toast-success.svg?react';

import { type ToastData, type ToastType } from './Toast.types';

const toastVariants = cva(
  'flex w-[90vw] max-w-[432px] min-h-14 items-center gap-2 rounded-xl border bg-semantic-system-white p-3 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]',
  {
    variants: {
      type: {
        default:
          'border-semantic-stroke-assistive text-semantic-object-bold [&_span]:bg-semantic-object-subtler',
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
              'transition-[opacity,translate,transform] duration-200 ease-out',
              'data-[starting-style]:translate-y-2 data-[starting-style]:opacity-0',
              'data-[ending-style]:opacity-0',
              'data-[swiping]:duration-0 data-[swiping]:select-none',
              'data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x,0px)+150%))]',
              'data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y,0px)+150%))]',
              'data-[limited]:hidden',
            )}
          >
            {icon && (
              <span
                className="rounded-lg p-1.5 [&_svg]:size-4"
                aria-hidden="true"
              >
                {icon}
              </span>
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
        <BaseToast.Viewport className="fixed bottom-23 left-1/2 z-300 flex -translate-x-1/2 flex-col gap-2">
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

export default ToastProvider;
