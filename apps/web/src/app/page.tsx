'use client';
import { Checkbox } from '@plog/ui';

export default function Home() {
  return (
    <>
      <Checkbox checked disabled />
      <Checkbox indeterminate />
      <Checkbox />
    </>
  );
}
