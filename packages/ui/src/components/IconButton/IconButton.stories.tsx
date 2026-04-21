import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import BlankIcon from '@/assets/blank.svg?react';

import IconButton from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '아이콘을 포함하는 버튼 컴포넌트입니다. `variant`로 시각적 스타일을, `size`로 크기를 조절합니다.\n\n아이콘만 표시되므로 사용 시 `aria-label`로 버튼의 목적을 설명해야 합니다. 연결된 요소(예: 팝오버, 필터 등)의 열림 상태를 나타낼 때는 `aria-expanded`와 `aria-controls`(제어 대상 요소의 ID)를 함께 사용합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      description: '버튼의 시각적 스타일입니다.',
      control: 'select',
      options: ['outline', 'ghost'],
      table: {
        type: { summary: "'outline' | 'ghost'" },
        defaultValue: { summary: 'outline' },
      },
    },
    size: {
      description: '버튼 크기를 설정합니다. 아이콘 크기도 함께 조정됩니다.',
      control: 'select',
      options: ['large', 'small'],
      table: {
        type: { summary: "'large' | 'small'" },
        defaultValue: { summary: 'large' },
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
    'aria-label': {
      description: '버튼의 목적을 설명하는 텍스트입니다.',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-labelledby': {
      description:
        '버튼을 설명하는 외부 요소의 ID입니다. `aria-label` 대신 사용할 수 있습니다.',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-expanded': {
      description:
        '연결된 요소의 열림 상태입니다. `true`일 때 accent 색상으로 강조됩니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    ref: { table: { disable: true } },
    icon: { table: { disable: true } },
    className: { table: { disable: true } },
    type: { table: { disable: true } },
  },
  args: {
    variant: 'outline',
    size: 'large',
    disabled: false,
    'aria-label': '아이콘 버튼',
  },
  render: (args) => <IconButton {...args} icon={<BlankIcon />} />,
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

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

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`outline`은 배경과 테두리가 있고, `ghost`는 배경 없이 아이콘만 표시됩니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <IconButton {...args} variant="outline" icon={<BlankIcon />} />
      <IconButton {...args} variant="ghost" icon={<BlankIcon />} />
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: '크기에 따라 버튼과 아이콘 크기가 함께 변경됩니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <IconButton {...args} size="large" icon={<BlankIcon />} />
      <IconButton {...args} size="small" icon={<BlankIcon />} />
    </div>
  ),
};

export const Expanded: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`aria-expanded`로 연결된 요소의 열림 상태를 나타낼 수 있습니다. `aria-controls`에 제어 대상 요소의 ID를 지정하면 스크린리더가 버튼과 연결된 요소를 인식할 수 있습니다.',
      },
      source: {
        code: `const [expanded, setExpanded] = useState(false);

<IconButton
  icon={<Icon />}
  aria-label="메뉴 열기"
  aria-expanded={expanded}
  aria-controls="menu-id"
  onClick={() => setExpanded((prev) => !prev)}
/>`,
      },
    },
  },
  render: function Render(args) {
    const [expanded, setExpanded] = useState(false);

    return (
      <IconButton
        {...args}
        icon={<BlankIcon />}
        aria-expanded={expanded}
        onClick={() => setExpanded((prev) => !prev)}
      />
    );
  },
};
