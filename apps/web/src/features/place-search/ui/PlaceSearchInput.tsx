'use client';

import { type ChangeEvent } from 'react';

import { Icon, Input } from '@plog/ui';
import { cn } from '@plog/utils';

type PlaceSearchInputProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

export default function PlaceSearchInput({
  value,
  onChange,
  onClear,
}: PlaceSearchInputProps) {
  return (
    <Input
      value={value}
      onChange={onChange}
      onClear={onClear}
      placeholder="장소를 입력해 주세요."
      autoFocus
      trailing={<Icon name="search" className="text-semantic-object-subtle" />}
      className={cn(value.length > 0 && 'border-semantic-accent-normal')}
    />
  );
}
