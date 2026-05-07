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
    label: 'Feedback / Error',
    rows: [
      {
        token: '.feedback.error.bolder',
        bg: 'bg-semantic-feedback-error-bolder',
        hex: semantic.feedback.error.bolder,
      },
      {
        token: '.feedback.error.bold',
        bg: 'bg-semantic-feedback-error-bold',
        hex: semantic.feedback.error.bold,
      },
      {
        token: '.feedback.error.normal',
        bg: 'bg-semantic-feedback-error-normal',
        hex: semantic.feedback.error.normal,
      },
      {
        token: '.feedback.error.neutral',
        bg: 'bg-semantic-feedback-error-neutral',
        hex: semantic.feedback.error.neutral,
      },
      {
        token: '.feedback.error.alternative',
        bg: 'bg-semantic-feedback-error-alternative',
        hex: semantic.feedback.error.alternative,
      },
      {
        token: '.feedback.error.assistive',
        bg: 'bg-semantic-feedback-error-assistive',
        hex: semantic.feedback.error.assistive,
      },
      {
        token: '.feedback.error.subtle',
        bg: 'bg-semantic-feedback-error-subtle',
        hex: semantic.feedback.error.subtle,
      },
      {
        token: '.feedback.error.subtler',
        bg: 'bg-semantic-feedback-error-subtler',
        hex: semantic.feedback.error.subtler,
      },
    ],
  },
  {
    label: 'Feedback / Warning',
    rows: [
      {
        token: '.feedback.warning.bolder',
        bg: 'bg-semantic-feedback-warning-bolder',
        hex: semantic.feedback.warning.bolder,
      },
      {
        token: '.feedback.warning.bold',
        bg: 'bg-semantic-feedback-warning-bold',
        hex: semantic.feedback.warning.bold,
      },
      {
        token: '.feedback.warning.normal',
        bg: 'bg-semantic-feedback-warning-normal',
        hex: semantic.feedback.warning.normal,
      },
      {
        token: '.feedback.warning.neutral',
        bg: 'bg-semantic-feedback-warning-neutral',
        hex: semantic.feedback.warning.neutral,
      },
      {
        token: '.feedback.warning.alternative',
        bg: 'bg-semantic-feedback-warning-alternative',
        hex: semantic.feedback.warning.alternative,
      },
      {
        token: '.feedback.warning.assistive',
        bg: 'bg-semantic-feedback-warning-assistive',
        hex: semantic.feedback.warning.assistive,
      },
      {
        token: '.feedback.warning.subtle',
        bg: 'bg-semantic-feedback-warning-subtle',
        hex: semantic.feedback.warning.subtle,
      },
      {
        token: '.feedback.warning.subtler',
        bg: 'bg-semantic-feedback-warning-subtler',
        hex: semantic.feedback.warning.subtler,
      },
    ],
  },
  {
    label: 'Feedback / Success',
    rows: [
      {
        token: '.feedback.success.bolder',
        bg: 'bg-semantic-feedback-success-bolder',
        hex: semantic.feedback.success.bolder,
      },
      {
        token: '.feedback.success.bold',
        bg: 'bg-semantic-feedback-success-bold',
        hex: semantic.feedback.success.bold,
      },
      {
        token: '.feedback.success.normal',
        bg: 'bg-semantic-feedback-success-normal',
        hex: semantic.feedback.success.normal,
      },
      {
        token: '.feedback.success.neutral',
        bg: 'bg-semantic-feedback-success-neutral',
        hex: semantic.feedback.success.neutral,
      },
      {
        token: '.feedback.success.alternative',
        bg: 'bg-semantic-feedback-success-alternative',
        hex: semantic.feedback.success.alternative,
      },
      {
        token: '.feedback.success.assistive',
        bg: 'bg-semantic-feedback-success-assistive',
        hex: semantic.feedback.success.assistive,
      },
      {
        token: '.feedback.success.subtle',
        bg: 'bg-semantic-feedback-success-subtle',
        hex: semantic.feedback.success.subtle,
      },
      {
        token: '.feedback.success.subtler',
        bg: 'bg-semantic-feedback-success-subtler',
        hex: semantic.feedback.success.subtler,
      },
    ],
  },
  {
    label: 'Feedback / Information',
    rows: [
      {
        token: '.feedback.info.bolder',
        bg: 'bg-semantic-feedback-info-bolder',
        hex: semantic.feedback.info.bolder,
      },
      {
        token: '.feedback.info.bold',
        bg: 'bg-semantic-feedback-info-bold',
        hex: semantic.feedback.info.bold,
      },
      {
        token: '.feedback.info.normal',
        bg: 'bg-semantic-feedback-info-normal',
        hex: semantic.feedback.info.normal,
      },
      {
        token: '.feedback.info.neutral',
        bg: 'bg-semantic-feedback-info-neutral',
        hex: semantic.feedback.info.neutral,
      },
      {
        token: '.feedback.info.alternative',
        bg: 'bg-semantic-feedback-info-alternative',
        hex: semantic.feedback.info.alternative,
      },
      {
        token: '.feedback.info.assistive',
        bg: 'bg-semantic-feedback-info-assistive',
        hex: semantic.feedback.info.assistive,
      },
      {
        token: '.feedback.info.subtle',
        bg: 'bg-semantic-feedback-info-subtle',
        hex: semantic.feedback.info.subtle,
      },
      {
        token: '.feedback.info.subtler',
        bg: 'bg-semantic-feedback-info-subtler',
        hex: semantic.feedback.info.subtler,
      },
    ],
  },
  {
    label: 'Theme / Orange',
    rows: [
      {
        token: '.theme.orange.bolder',
        bg: 'bg-semantic-theme-orange-bolder',
        hex: semantic.theme.orange.bolder,
      },
      {
        token: '.theme.orange.bold',
        bg: 'bg-semantic-theme-orange-bold',
        hex: semantic.theme.orange.bold,
      },
      {
        token: '.theme.orange.normal',
        bg: 'bg-semantic-theme-orange-normal',
        hex: semantic.theme.orange.normal,
      },
      {
        token: '.theme.orange.neutral',
        bg: 'bg-semantic-theme-orange-neutral',
        hex: semantic.theme.orange.neutral,
      },
      {
        token: '.theme.orange.alternative',
        bg: 'bg-semantic-theme-orange-alternative',
        hex: semantic.theme.orange.alternative,
      },
      {
        token: '.theme.orange.assistive',
        bg: 'bg-semantic-theme-orange-assistive',
        hex: semantic.theme.orange.assistive,
      },
      {
        token: '.theme.orange.subtle',
        bg: 'bg-semantic-theme-orange-subtle',
        hex: semantic.theme.orange.subtle,
      },
      {
        token: '.theme.orange.subtler',
        bg: 'bg-semantic-theme-orange-subtler',
        hex: semantic.theme.orange.subtler,
      },
    ],
  },
  {
    label: 'Theme / Yellow',
    rows: [
      {
        token: '.theme.yellow.bolder',
        bg: 'bg-semantic-theme-yellow-bolder',
        hex: semantic.theme.yellow.bolder,
      },
      {
        token: '.theme.yellow.bold',
        bg: 'bg-semantic-theme-yellow-bold',
        hex: semantic.theme.yellow.bold,
      },
      {
        token: '.theme.yellow.normal',
        bg: 'bg-semantic-theme-yellow-normal',
        hex: semantic.theme.yellow.normal,
      },
      {
        token: '.theme.yellow.neutral',
        bg: 'bg-semantic-theme-yellow-neutral',
        hex: semantic.theme.yellow.neutral,
      },
      {
        token: '.theme.yellow.alternative',
        bg: 'bg-semantic-theme-yellow-alternative',
        hex: semantic.theme.yellow.alternative,
      },
      {
        token: '.theme.yellow.assistive',
        bg: 'bg-semantic-theme-yellow-assistive',
        hex: semantic.theme.yellow.assistive,
      },
      {
        token: '.theme.yellow.subtle',
        bg: 'bg-semantic-theme-yellow-subtle',
        hex: semantic.theme.yellow.subtle,
      },
      {
        token: '.theme.yellow.subtler',
        bg: 'bg-semantic-theme-yellow-subtler',
        hex: semantic.theme.yellow.subtler,
      },
    ],
  },
  {
    label: 'Theme / Sky',
    rows: [
      {
        token: '.theme.sky.bolder',
        bg: 'bg-semantic-theme-sky-bolder',
        hex: semantic.theme.sky.bolder,
      },
      {
        token: '.theme.sky.bold',
        bg: 'bg-semantic-theme-sky-bold',
        hex: semantic.theme.sky.bold,
      },
      {
        token: '.theme.sky.normal',
        bg: 'bg-semantic-theme-sky-normal',
        hex: semantic.theme.sky.normal,
      },
      {
        token: '.theme.sky.neutral',
        bg: 'bg-semantic-theme-sky-neutral',
        hex: semantic.theme.sky.neutral,
      },
      {
        token: '.theme.sky.alternative',
        bg: 'bg-semantic-theme-sky-alternative',
        hex: semantic.theme.sky.alternative,
      },
      {
        token: '.theme.sky.assistive',
        bg: 'bg-semantic-theme-sky-assistive',
        hex: semantic.theme.sky.assistive,
      },
      {
        token: '.theme.sky.subtle',
        bg: 'bg-semantic-theme-sky-subtle',
        hex: semantic.theme.sky.subtle,
      },
      {
        token: '.theme.sky.subtler',
        bg: 'bg-semantic-theme-sky-subtler',
        hex: semantic.theme.sky.subtler,
      },
    ],
  },
  {
    label: 'Theme / Purple',
    rows: [
      {
        token: '.theme.purple.bolder',
        bg: 'bg-semantic-theme-purple-bolder',
        hex: semantic.theme.purple.bolder,
      },
      {
        token: '.theme.purple.bold',
        bg: 'bg-semantic-theme-purple-bold',
        hex: semantic.theme.purple.bold,
      },
      {
        token: '.theme.purple.normal',
        bg: 'bg-semantic-theme-purple-normal',
        hex: semantic.theme.purple.normal,
      },
      {
        token: '.theme.purple.neutral',
        bg: 'bg-semantic-theme-purple-neutral',
        hex: semantic.theme.purple.neutral,
      },
      {
        token: '.theme.purple.alternative',
        bg: 'bg-semantic-theme-purple-alternative',
        hex: semantic.theme.purple.alternative,
      },
      {
        token: '.theme.purple.assistive',
        bg: 'bg-semantic-theme-purple-assistive',
        hex: semantic.theme.purple.assistive,
      },
      {
        token: '.theme.purple.subtle',
        bg: 'bg-semantic-theme-purple-subtle',
        hex: semantic.theme.purple.subtle,
      },
      {
        token: '.theme.purple.subtler',
        bg: 'bg-semantic-theme-purple-subtler',
        hex: semantic.theme.purple.subtler,
      },
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
