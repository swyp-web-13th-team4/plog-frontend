import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

import BlankIcon from '@/assets/blank.svg?react';
import TabItem from '@/components/Tab/TabItem';

const meta: Meta<typeof TabItem> = {
  title: 'Components/TabItem',
  component: TabItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '탭 항목 컴포넌트입니다. `TabGroup` 내부에서 사용되며, 단독으로 사용할 경우 `role="tab"`, `aria-selected`, `aria-controls` 같은 ARIA 속성을 직접 관리해야 합니다.',
      },
    },
  },
  argTypes: {
    label: {
      description: '탭에 표시되는 레이블입니다.',
      control: 'text',
    },
    selected: {
      description: '탭의 선택 여부를 나타냅니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description:
        '비활성화 상태입니다. 클릭 이벤트가 차단되며 스타일이 변경됩니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    ref: { table: { disable: true } },
    icon: { table: { disable: true } },
    type: { table: { disable: true } },
  },
  args: {
    label: 'Text',
    selected: false,
    disabled: false,
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
  parameters: {
    docs: {
      description: {
        story: '선택 상태에서는 accent 색상의 구분선과 텍스트가 적용됩니다.',
      },
    },
  },
  args: {
    selected: true,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '비활성화 상태에서는 클릭 이벤트가 차단됩니다.',
      },
    },
  },
  args: {
    disabled: true,
  },
};

export const WithoutIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: '아이콘 없이 라벨만 표시합니다.',
      },
    },
  },
  render: (args) => <TabItem {...args} />,
};
