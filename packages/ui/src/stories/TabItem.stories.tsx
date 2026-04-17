import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

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
          '`TabItem`은 `TabGroup` 내부에서 `BaseTabs.Tab`의 `render`를 통해 사용되는 시각 표현 컴포넌트입니다. 단독으로 사용할 경우 `role="tab"`, `aria-selected`, `aria-controls` 같은 ARIA 속성을 직접 관리해야 합니다.',
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
      description: '선택 상태에 따른 시각 표현입니다.',
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
  render: (args) => <TabItem {...args} icon={<BlankIcon />} />,
};
