import type { Meta, StoryObj } from '@storybook/react';

import { colors } from '../tokens';
import {
  CodeBadge,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from './TokenTable';

const meta: Meta = { title: 'Tokens/Color' };
export default meta;
type Story = StoryObj;

const COLS = '6rem 1fr 1fr';
const HEADERS = ['Swatch', 'Token', 'Hex'];

type Row = { token: string; bg: string; hex: string };
type Group = { label: string; rows: Row[] };

const { semantic } = colors;

const groups: Group[] = [
  {
    label: 'Accent',
    rows: [
      {
        token: '.accent.bolder',
        bg: 'bg-semantic-accent-bolder',
        hex: semantic.accent.bolder,
      },
      {
        token: '.accent.bold',
        bg: 'bg-semantic-accent-bold',
        hex: semantic.accent.bold,
      },
      {
        token: '.accent.normal',
        bg: 'bg-semantic-accent-normal',
        hex: semantic.accent.normal,
      },
      {
        token: '.accent.neutral',
        bg: 'bg-semantic-accent-neutral',
        hex: semantic.accent.neutral,
      },
      {
        token: '.accent.alternative',
        bg: 'bg-semantic-accent-alternative',
        hex: semantic.accent.alternative,
      },
      {
        token: '.accent.subtle',
        bg: 'bg-semantic-accent-subtle',
        hex: semantic.accent.subtle,
      },
      {
        token: '.accent.subtler',
        bg: 'bg-semantic-accent-subtler',
        hex: semantic.accent.subtler,
      },
      {
        token: '.accent.subtlest',
        bg: 'bg-semantic-accent-subtlest',
        hex: semantic.accent.subtlest,
      },
    ],
  },
  {
    label: 'Stroke',
    rows: [
      {
        token: '.stroke.bold',
        bg: 'bg-semantic-stroke-bold',
        hex: semantic.stroke.bold,
      },
      {
        token: '.stroke.normal',
        bg: 'bg-semantic-stroke-normal',
        hex: semantic.stroke.normal,
      },
      {
        token: '.stroke.neutral',
        bg: 'bg-semantic-stroke-neutral',
        hex: semantic.stroke.neutral,
      },
      {
        token: '.stroke.alternative',
        bg: 'bg-semantic-stroke-alternative',
        hex: semantic.stroke.alternative,
      },
      {
        token: '.stroke.assistive',
        bg: 'bg-semantic-stroke-assistive',
        hex: semantic.stroke.assistive,
      },
      {
        token: '.stroke.subtle',
        bg: 'bg-semantic-stroke-subtle',
        hex: semantic.stroke.subtle,
      },
      {
        token: '.stroke.subtler',
        bg: 'bg-semantic-stroke-subtler',
        hex: semantic.stroke.subtler,
      },
    ],
  },
  {
    label: 'Background',
    rows: [
      {
        token: '.bg.standard',
        bg: 'bg-semantic-bg-standard',
        hex: semantic.bg.standard,
      },
      { token: '.bg.deep', bg: 'bg-semantic-bg-deep', hex: semantic.bg.deep },
      {
        token: '.bg.deeper',
        bg: 'bg-semantic-bg-deeper',
        hex: semantic.bg.deeper,
      },
    ],
  },
  {
    label: 'Object',
    rows: [
      {
        token: '.object.boldest',
        bg: 'bg-semantic-object-boldest',
        hex: semantic.object.boldest,
      },
      {
        token: '.object.bold',
        bg: 'bg-semantic-object-bold',
        hex: semantic.object.bold,
      },
      {
        token: '.object.normal',
        bg: 'bg-semantic-object-normal',
        hex: semantic.object.normal,
      },
      {
        token: '.object.subtle',
        bg: 'bg-semantic-object-subtle',
        hex: semantic.object.subtle,
      },
      {
        token: '.object.subtler',
        bg: 'bg-semantic-object-subtler',
        hex: semantic.object.subtler,
      },
      {
        token: '.object.inverse',
        bg: 'bg-semantic-object-inverse',
        hex: semantic.object.inverse,
      },
    ],
  },
  {
    label: 'Theme / Red',
    rows: [
      { token: '.theme.red.bolder', bg: 'bg-semantic-theme-red-bolder', hex: semantic.theme.red.bolder },
      { token: '.theme.red.bold', bg: 'bg-semantic-theme-red-bold', hex: semantic.theme.red.bold },
      { token: '.theme.red.normal', bg: 'bg-semantic-theme-red-normal', hex: semantic.theme.red.normal },
      { token: '.theme.red.neutral', bg: 'bg-semantic-theme-red-neutral', hex: semantic.theme.red.neutral },
      { token: '.theme.red.alternative', bg: 'bg-semantic-theme-red-alternative', hex: semantic.theme.red.alternative },
      { token: '.theme.red.assistive', bg: 'bg-semantic-theme-red-assistive', hex: semantic.theme.red.assistive },
      { token: '.theme.red.subtle', bg: 'bg-semantic-theme-red-subtle', hex: semantic.theme.red.subtle },
      { token: '.theme.red.subtler', bg: 'bg-semantic-theme-red-subtler', hex: semantic.theme.red.subtler },
    ],
  },
  {
    label: 'Theme / Orange',
    rows: [
      { token: '.theme.orange.bolder', bg: 'bg-semantic-theme-orange-bolder', hex: semantic.theme.orange.bolder },
      { token: '.theme.orange.bold', bg: 'bg-semantic-theme-orange-bold', hex: semantic.theme.orange.bold },
      { token: '.theme.orange.normal', bg: 'bg-semantic-theme-orange-normal', hex: semantic.theme.orange.normal },
      { token: '.theme.orange.neutral', bg: 'bg-semantic-theme-orange-neutral', hex: semantic.theme.orange.neutral },
      { token: '.theme.orange.alternative', bg: 'bg-semantic-theme-orange-alternative', hex: semantic.theme.orange.alternative },
      { token: '.theme.orange.assistive', bg: 'bg-semantic-theme-orange-assistive', hex: semantic.theme.orange.assistive },
      { token: '.theme.orange.subtle', bg: 'bg-semantic-theme-orange-subtle', hex: semantic.theme.orange.subtle },
      { token: '.theme.orange.subtler', bg: 'bg-semantic-theme-orange-subtler', hex: semantic.theme.orange.subtler },
    ],
  },
  {
    label: 'Theme / Amber',
    rows: [
      { token: '.theme.amber.bolder', bg: 'bg-semantic-theme-amber-bolder', hex: semantic.theme.amber.bolder },
      { token: '.theme.amber.bold', bg: 'bg-semantic-theme-amber-bold', hex: semantic.theme.amber.bold },
      { token: '.theme.amber.normal', bg: 'bg-semantic-theme-amber-normal', hex: semantic.theme.amber.normal },
      { token: '.theme.amber.neutral', bg: 'bg-semantic-theme-amber-neutral', hex: semantic.theme.amber.neutral },
      { token: '.theme.amber.alternative', bg: 'bg-semantic-theme-amber-alternative', hex: semantic.theme.amber.alternative },
      { token: '.theme.amber.assistive', bg: 'bg-semantic-theme-amber-assistive', hex: semantic.theme.amber.assistive },
      { token: '.theme.amber.subtle', bg: 'bg-semantic-theme-amber-subtle', hex: semantic.theme.amber.subtle },
      { token: '.theme.amber.subtler', bg: 'bg-semantic-theme-amber-subtler', hex: semantic.theme.amber.subtler },
    ],
  },
  {
    label: 'Theme / Yellow',
    rows: [
      { token: '.theme.yellow.bolder', bg: 'bg-semantic-theme-yellow-bolder', hex: semantic.theme.yellow.bolder },
      { token: '.theme.yellow.bold', bg: 'bg-semantic-theme-yellow-bold', hex: semantic.theme.yellow.bold },
      { token: '.theme.yellow.normal', bg: 'bg-semantic-theme-yellow-normal', hex: semantic.theme.yellow.normal },
      { token: '.theme.yellow.neutral', bg: 'bg-semantic-theme-yellow-neutral', hex: semantic.theme.yellow.neutral },
      { token: '.theme.yellow.alternative', bg: 'bg-semantic-theme-yellow-alternative', hex: semantic.theme.yellow.alternative },
      { token: '.theme.yellow.assistive', bg: 'bg-semantic-theme-yellow-assistive', hex: semantic.theme.yellow.assistive },
      { token: '.theme.yellow.subtle', bg: 'bg-semantic-theme-yellow-subtle', hex: semantic.theme.yellow.subtle },
      { token: '.theme.yellow.subtler', bg: 'bg-semantic-theme-yellow-subtler', hex: semantic.theme.yellow.subtler },
    ],
  },
  {
    label: 'Theme / Green',
    rows: [
      { token: '.theme.green.bolder', bg: 'bg-semantic-theme-green-bolder', hex: semantic.theme.green.bolder },
      { token: '.theme.green.bold', bg: 'bg-semantic-theme-green-bold', hex: semantic.theme.green.bold },
      { token: '.theme.green.normal', bg: 'bg-semantic-theme-green-normal', hex: semantic.theme.green.normal },
      { token: '.theme.green.neutral', bg: 'bg-semantic-theme-green-neutral', hex: semantic.theme.green.neutral },
      { token: '.theme.green.alternative', bg: 'bg-semantic-theme-green-alternative', hex: semantic.theme.green.alternative },
      { token: '.theme.green.assistive', bg: 'bg-semantic-theme-green-assistive', hex: semantic.theme.green.assistive },
      { token: '.theme.green.subtle', bg: 'bg-semantic-theme-green-subtle', hex: semantic.theme.green.subtle },
      { token: '.theme.green.subtler', bg: 'bg-semantic-theme-green-subtler', hex: semantic.theme.green.subtler },
    ],
  },
  {
    label: 'Theme / Sky',
    rows: [
      { token: '.theme.sky.bolder', bg: 'bg-semantic-theme-sky-bolder', hex: semantic.theme.sky.bolder },
      { token: '.theme.sky.bold', bg: 'bg-semantic-theme-sky-bold', hex: semantic.theme.sky.bold },
      { token: '.theme.sky.normal', bg: 'bg-semantic-theme-sky-normal', hex: semantic.theme.sky.normal },
      { token: '.theme.sky.neutral', bg: 'bg-semantic-theme-sky-neutral', hex: semantic.theme.sky.neutral },
      { token: '.theme.sky.alternative', bg: 'bg-semantic-theme-sky-alternative', hex: semantic.theme.sky.alternative },
      { token: '.theme.sky.assistive', bg: 'bg-semantic-theme-sky-assistive', hex: semantic.theme.sky.assistive },
      { token: '.theme.sky.subtle', bg: 'bg-semantic-theme-sky-subtle', hex: semantic.theme.sky.subtle },
      { token: '.theme.sky.subtler', bg: 'bg-semantic-theme-sky-subtler', hex: semantic.theme.sky.subtler },
    ],
  },
  {
    label: 'Theme / Blue',
    rows: [
      { token: '.theme.blue.bolder', bg: 'bg-semantic-theme-blue-bolder', hex: semantic.theme.blue.bolder },
      { token: '.theme.blue.bold', bg: 'bg-semantic-theme-blue-bold', hex: semantic.theme.blue.bold },
      { token: '.theme.blue.normal', bg: 'bg-semantic-theme-blue-normal', hex: semantic.theme.blue.normal },
      { token: '.theme.blue.neutral', bg: 'bg-semantic-theme-blue-neutral', hex: semantic.theme.blue.neutral },
      { token: '.theme.blue.alternative', bg: 'bg-semantic-theme-blue-alternative', hex: semantic.theme.blue.alternative },
      { token: '.theme.blue.assistive', bg: 'bg-semantic-theme-blue-assistive', hex: semantic.theme.blue.assistive },
      { token: '.theme.blue.subtle', bg: 'bg-semantic-theme-blue-subtle', hex: semantic.theme.blue.subtle },
      { token: '.theme.blue.subtler', bg: 'bg-semantic-theme-blue-subtler', hex: semantic.theme.blue.subtler },
    ],
  },
  {
    label: 'Theme / Purple',
    rows: [
      { token: '.theme.purple.bolder', bg: 'bg-semantic-theme-purple-bolder', hex: semantic.theme.purple.bolder },
      { token: '.theme.purple.bold', bg: 'bg-semantic-theme-purple-bold', hex: semantic.theme.purple.bold },
      { token: '.theme.purple.normal', bg: 'bg-semantic-theme-purple-normal', hex: semantic.theme.purple.normal },
      { token: '.theme.purple.neutral', bg: 'bg-semantic-theme-purple-neutral', hex: semantic.theme.purple.neutral },
      { token: '.theme.purple.alternative', bg: 'bg-semantic-theme-purple-alternative', hex: semantic.theme.purple.alternative },
      { token: '.theme.purple.assistive', bg: 'bg-semantic-theme-purple-assistive', hex: semantic.theme.purple.assistive },
      { token: '.theme.purple.subtle', bg: 'bg-semantic-theme-purple-subtle', hex: semantic.theme.purple.subtle },
      { token: '.theme.purple.subtler', bg: 'bg-semantic-theme-purple-subtler', hex: semantic.theme.purple.subtler },
    ],
  },
  {
    label: 'System',
    rows: [
      {
        token: '.system.white',
        bg: 'bg-semantic-system-white',
        hex: semantic.system.white,
      },
      {
        token: '.system.black',
        bg: 'bg-semantic-system-black',
        hex: semantic.system.black,
      },
    ],
  },
];

export const Semantic: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      {groups.map(({ label, rows }) => (
        <section key={label}>
          <p className="title-xs mb-4 border-l-3 border-l-semantic-accent-alternative pl-3 text-semantic-object-boldest">
            {label}
          </p>
          <TableContainer>
            <TableHeader columns={HEADERS} gridCols={COLS} />
            {rows.map(({ token, bg, hex }, i) => (
              <TableRow key={token} index={i} gridCols={COLS}>
                <TableCell noPadding>
                  <div className={`min-h-14 w-full ${bg}`} />
                </TableCell>
                <TableCell>
                  <CodeBadge>{token}</CodeBadge>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-semantic-object-normal uppercase">
                    {hex}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableContainer>
        </section>
      ))}
    </div>
  ),
};
