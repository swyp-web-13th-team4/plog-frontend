import type { Meta, StoryObj } from '@storybook/react';

import Divider from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '콘텐츠 영역을 구분하는 구분선 컴포넌트입니다.\n\n`role="separator"`가 기본 적용되어 스크린리더가 구분선을 인식합니다. 순수 장식 목적으로 사용하는 경우 `aria-hidden="true"`를 명시하는 것이 좋습니다.',
      },
    },
  },
  argTypes: {
    thickness: {
      description: '구분선의 두께를 설정합니다.',
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: {
        type: { summary: "'small' | 'medium' | 'large'" },
        defaultValue: { summary: 'small' },
      },
    },
    orientation: {
      description: '구분선의 방향을 설정합니다.',
      control: 'select',
      options: ['horizontal', 'vertical'],
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
      },
    },
    className: { table: { disable: true } },
  },
  args: {
    thickness: 'small',
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  decorators: [
    (Story, { args }) => (
      <div
        className={
          args.orientation === 'vertical' ? 'flex h-32 items-center' : 'w-64'
        }
      >
        <Story />
      </div>
    ),
  ],
};

export const Thickness: Story = {
  parameters: {
    docs: {
      description: {
        story: '두께에 따라 세 가지 스타일을 제공합니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex w-64 flex-col gap-4">
      <Divider {...args} thickness="small" />
      <Divider {...args} thickness="medium" />
      <Divider {...args} thickness="large" />
    </div>
  ),
};

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: '세로 방향의 구분선입니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex h-32 items-center gap-4">
      <span>left</span>
      <Divider {...args} orientation="vertical" />
      <span>right</span>
    </div>
  ),
};
