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
          'Button 기반의 Chip 컴포넌트입니다. 기본 상태는 `enabled`, `hover`는 CSS로 처리하고 `selected`는 prop으로 제어합니다.',
      },
    },
  },
  argTypes: {
    selected: {
      description: '선택 상태입니다. `true`면 selected 스타일이 적용됩니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    children: {
      description: 'Chip 라벨입니다.',
      control: 'text',
    },
    iconLeft: { table: { disable: true } },
    iconRight: { table: { disable: true } },
    type: { table: { disable: true } },
  },
  args: {
    children: 'Chip',
    selected: false,
    disabled: false,
    iconLeft: <BlankIcon />,
    iconRight: <BlankIcon />,
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Chip {...args}>enabled</Chip>
      <Chip {...args} className="bg-semantic-object-subtle">
        hover
      </Chip>
      <Chip {...args} selected>
        selected
      </Chip>
      <Chip {...args} disabled>
        disabled
      </Chip>
    </div>
  ),
};

export const SingleSideIcons: Story = {
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
