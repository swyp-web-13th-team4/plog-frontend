import type { Meta, StoryObj } from '@storybook/react';

import Badge from './Badge';

const COLORS = ['gray', 'skyblue', 'green', 'yellow', 'orange'] as const;

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '상태나 카테고리를 나타내는 배지 컴포넌트입니다. `variant`와 `color`의 조합으로 스타일을 결정합니다.\n\n배지는 항상 의미 있는 텍스트를 포함해야 하며, 알림 카운트나 처리 상태처럼 동적으로 변하는 경우에는 `role="status"`를 사용하는 것이 좋습니다.',
      },
    },
  },
  argTypes: {
    variant: {
      description: '배지의 스타일 형태를 설정합니다.',
      control: 'select',
      options: ['solid', 'soft', 'outline'],
      table: {
        type: { summary: "'solid' | 'soft' | 'outline'" },
      },
    },
    color: {
      description: '배지의 색상을 설정합니다.',
      control: 'select',
      options: COLORS,
      table: {
        type: { summary: "'gray' | 'skyblue' | 'green' | 'yellow' | 'orange'" },
      },
    },
    children: {
      description: '배지에 표시될 텍스트입니다.',
      control: 'text',
    },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    variant: 'solid',
    color: 'gray',
    children: '배지',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Solid: Story = {
  parameters: {
    docs: {
      description: {
        story: '색상별 solid 스타일입니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2">
      {COLORS.map((color) => (
        <Badge key={color} {...args} variant="solid" color={color}>
          {color}
        </Badge>
      ))}
    </div>
  ),
};

export const Soft: Story = {
  parameters: {
    docs: {
      description: {
        story: '색상별 soft 스타일입니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2">
      {COLORS.map((color) => (
        <Badge key={color} {...args} variant="soft" color={color}>
          {color}
        </Badge>
      ))}
    </div>
  ),
};

export const Outline: Story = {
  parameters: {
    docs: {
      description: {
        story: '색상별 outline 스타일입니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2">
      {COLORS.map((color) => (
        <Badge key={color} {...args} variant="outline" color={color}>
          {color}
        </Badge>
      ))}
    </div>
  ),
};
