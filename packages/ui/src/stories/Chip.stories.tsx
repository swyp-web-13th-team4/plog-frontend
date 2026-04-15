import type { Meta, StoryObj } from '@storybook/react';

import BlankIcon from '@/assets/blank.svg?react';
import Chip from '@/components/Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Toggle 기반의 Chip 컴포넌트입니다. `pressed`, `defaultPressed`, `onPressedChange`를 그대로 사용할 수 있어 선택 상태를 내장 방식으로 관리합니다.',
      },
    },
  },
  argTypes: {
    pressed: {
      description: '선택된 상태를 제어하는 controlled prop입니다.',
      control: 'boolean',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultPressed: {
      description: '초기 선택 상태를 설정하는 uncontrolled prop입니다.',
      control: 'boolean',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      description: 'Chip 크기입니다.',
      control: 'select',
      options: ['sm', 'lg'],
      table: {
        type: { summary: "'sm' | 'lg'" },
        defaultValue: { summary: 'sm' },
      },
    },
    children: {
      description: 'Chip 라벨입니다.',
      control: 'text',
    },
    className: { table: { disable: true } },
    onPressedChange: { table: { disable: true } },
    value: { table: { disable: true } },
    iconLeft: { table: { disable: true } },
    iconRight: { table: { disable: true } },
    type: { table: { disable: true } },
  },
  args: {
    children: 'Chip',
    size: 'sm',
    disabled: false,
    iconLeft: <BlankIcon />,
    iconRight: <BlankIcon />,
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Chip {...args} size="sm">
        small
      </Chip>
      <Chip {...args} size="lg">
        large
      </Chip>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Chip {...args}>enabled</Chip>
      <Chip {...args} className="bg-semantic-object-subtle">
        hover
      </Chip>
      <Chip {...args} pressed>
        pressed
      </Chip>
      <Chip {...args} disabled>
        disabled
      </Chip>
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Chip {...args} iconRight={undefined}>
        left
      </Chip>
      <Chip {...args} iconLeft={undefined}>
        right
      </Chip>
      <Chip {...args}>between</Chip>
    </div>
  ),
};
