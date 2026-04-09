import type { Meta, StoryObj } from '@storybook/react';

import {
  CodeBadge,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from './TokenTable';

const meta: Meta = { title: 'Tokens/Typography' };
export default meta;
type Story = StoryObj;

const weightLabel: Record<number, string> = {
  700: 'Bold',
  600: 'SemiBold',
  500: 'Medium',
  400: 'Regular',
};

const SAMPLE = '가나다라마바사 AaBbCcDd 123';
const COLS = '4fr 1fr 1fr 1fr 1fr';
const HEADERS = ['Sample', 'Token', 'Size', 'Weight', 'Line Height'];

const tokens = [
  { name: 'hero-lg', size: 40, weight: 700, lineHeight: 52 },
  { name: 'hero-md', size: 36, weight: 700, lineHeight: 48 },
  { name: 'hero-sm', size: 32, weight: 700, lineHeight: 44 },
  { name: 'title-xl', size: 28, weight: 700, lineHeight: 38 },
  { name: 'title-lg', size: 24, weight: 700, lineHeight: 32 },
  { name: 'title-md', size: 22, weight: 700, lineHeight: 30 },
  { name: 'title-sm', size: 20, weight: 600, lineHeight: 28 },
  { name: 'title-xs', size: 18, weight: 600, lineHeight: 26 },
  { name: 'body-xl', size: 18, weight: 500, lineHeight: 26 },
  { name: 'body-lg', size: 16, weight: 500, lineHeight: 24 },
  { name: 'body-md', size: 15, weight: 400, lineHeight: 22 },
  { name: 'body-sm', size: 14, weight: 400, lineHeight: 22 },
  { name: 'label-xl', size: 18, weight: 600, lineHeight: 24 },
  { name: 'label-lg', size: 16, weight: 600, lineHeight: 22 },
  { name: 'label-md', size: 14, weight: 500, lineHeight: 20 },
  { name: 'label-sm', size: 13, weight: 500, lineHeight: 18 },
  { name: 'caption-md', size: 12, weight: 400, lineHeight: 16 },
] as const;

export const Scale: Story = {
  render: () => (
    <div className="p-8">
      <TableContainer>
        <TableHeader columns={HEADERS} gridCols={COLS} />
        {tokens.map(({ name, size, weight, lineHeight }, i) => (
          <TableRow key={name} index={i} gridCols={COLS}>
            <TableCell>
              <span className={`${name} truncate text-semantic-object-boldest`}>
                {SAMPLE}
              </span>
            </TableCell>
            <TableCell>
              <CodeBadge>.{name}</CodeBadge>
            </TableCell>
            <TableCell>
              <span className="text-semantic-object-normal">{size}px</span>
            </TableCell>
            <TableCell>
              <span className="text-semantic-object-normal">
                {weightLabel[weight]}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-semantic-object-normal">
                {lineHeight}px
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableContainer>
    </div>
  ),
};
