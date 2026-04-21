import { Toast } from '@base-ui/react/toast';

import { type ToastData, type ToastOptions } from './Toast.types';

export const useToast = () => {
  const toastManager = Toast.useToastManager<ToastData>();

  const toast = (options: ToastOptions) => {
    const { id, type, description } = options;
    const icon =
      options.type === 'default' || options.type == null
        ? options.icon
        : undefined;
    toastManager.add({ id, type, description, data: { icon } });
  };

  return { toast };
};
