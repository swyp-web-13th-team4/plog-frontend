import { type DialogOptions, useDialogStore } from './use-dialog-store';

type AlertInput = string | Omit<DialogOptions, 'type' | 'cancelLabel'>;
type ConfirmInput = string | Omit<DialogOptions, 'type'>;

const normalize = (
  input: AlertInput | ConfirmInput,
): Omit<DialogOptions, 'type'> =>
  typeof input === 'string' ? { message: input } : input;

export const dialog = {
  alert: (input: AlertInput) =>
    useDialogStore.getState().show({ type: 'alert', ...normalize(input) }),

  confirm: (input: ConfirmInput) =>
    useDialogStore.getState().show({ type: 'confirm', ...normalize(input) }),
};

export { useDialogStore };
