import type { Meta, StoryObj } from '@storybook/react';

import Spinner from '@/components/Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '로딩 상태를 나타내는 스피너 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    color: {
      description: '스피너의 색상을 설정합니다.',
      control: 'select',
      options: ['white', 'gray'],
      table: {
        type: { summary: "'white' | 'gray'" },
        defaultValue: { summary: 'gray' },
      },
    },
    size: {
      description: '스피너의 크기를 설정합니다.',
      control: 'select',
      options: ['small', 'large'],
      table: {
        type: { summary: "'small' | 'large'" },
        defaultValue: { summary: 'small' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  globals: { backgrounds: { value: 'dark' } },
  args: { color: 'gray', size: 'small' },
};
