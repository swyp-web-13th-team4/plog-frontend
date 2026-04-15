import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/internal/preview-api';

import BlankIcon from '@/assets/blank.svg?react';
import TabItem from '@/components/Tab/TabItem';

const meta: Meta<typeof TabItem> = {
  title: 'Components/TabItem',
  component: TabItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '탭 단일 아이템입니다. 선택 상태와 아이콘 노출 여부를 props로 제어할 수 있습니다.',
      },
    },
  },
  argTypes: {
    label: {
      description: '탭에 표시할 텍스트입니다.',
      control: 'text',
    },
    icon: { table: { disable: true } },
    selected: {
      description: '선택 상태입니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showIcon: {
      description: '아이콘 노출 여부입니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    type: { table: { disable: true } },
  },
  args: {
    label: 'Text',
    selected: false,
    showIcon: true,
  },

  render: function Render(args) {
    const [{ selected }, updateArgs] = useArgs();

    return (
      <TabItem
        {...args}
        selected={selected}
        icon={<BlankIcon />}
        onClick={() => updateArgs({ selected: !selected })}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof TabItem>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    showIcon: false,
  },
};
