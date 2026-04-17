import { type ChangeEvent, type FocusEvent, useState } from 'react';

import { useFieldContext } from '@/hooks/useFieldContext';

type UseTextInputOptions<T extends HTMLInputElement | HTMLTextAreaElement> = {
  value?: string;
  defaultValue?: string;
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange?: (e: ChangeEvent<T>) => void;
  onFocus?: (e: FocusEvent<T>) => void;
  onBlur?: (e: FocusEvent<T>) => void;
};

export const useTextInput = <T extends HTMLInputElement | HTMLTextAreaElement>({
  value,
  defaultValue,
  invalid: invalidProp,
  disabled,
  required,
  onChange,
  onFocus,
  onBlur,
}: UseTextInputOptions<T>) => {
  const {
    invalid: ctxInvalid,
    disabled: ctxDisabled,
    required: ctxRequired,
  } = useFieldContext();

  const invalid = invalidProp ?? ctxInvalid;
  const effectiveDisabled = disabled ?? ctxDisabled;
  const effectiveRequired = required ?? ctxRequired;

  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [isFocused, setIsFocused] = useState(false);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: ChangeEvent<T>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleFocus = (e: FocusEvent<T>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<T>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const reset = () => {
    if (!isControlled) setInternalValue('');
  };

  return {
    invalid,
    effectiveDisabled,
    effectiveRequired,
    currentValue,
    isFocused,
    handleChange,
    handleFocus,
    handleBlur,
    reset,
  };
};
