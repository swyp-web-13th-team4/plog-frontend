import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import BlankIcon from '@/assets/blank.svg?react';
import Input from '@/components/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '텍스트 입력 컴포넌트입니다. `Field`로 감싸면 에러 및 설명 메시지를 추가할 수 있습니다.',
      },
    },
  },
  argTypes: {
    placeholder: {
      description: '값이 없을 때 표시되는 안내 텍스트입니다.',
      control: 'text',
    },
    invalid: {
      description:
        '에러 상태입니다. `Field` 내부에서는 context로 자동 주입됩니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: '비활성화 상태입니다. 클릭 및 입력이 차단됩니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    trailing: {
      description:
        '우측 슬롯에 표시할 ReactNode입니다. 값이 입력되면 자동으로 초기화 버튼으로 전환됩니다.',
      table: { disable: true },
    },
    onClear: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    placeholder: '내용을 입력하세요',
    disabled: false,
    invalid: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Invalid: Story = {
  parameters: {
    docs: {
      description: {
        story: '에러 상태에서는 테두리와 초기화 버튼 색상이 변경됩니다.',
      },
    },
  },
  args: { invalid: true },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: { story: '비활성화 상태에서는 입력과 클릭이 차단됩니다.' },
    },
  },
  args: { disabled: true },
};

function WithTrailingStory(args: React.ComponentProps<typeof Input>) {
  const [value, setValue] = useState('');
  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
      trailing={
        <button type="button" className="block cursor-pointer">
          <BlankIcon />
        </button>
      }
    />
  );
}

export const WithTrailing: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`trailing`에 ReactNode를 전달합니다. 값을 입력하면 `trailing`이 초기화 버튼으로 전환됩니다.',
      },
      source: {
        code: `<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onClear={() => setValue('')}
  placeholder="내용을 입력하세요"
  trailing={
    <button type="button" className="block cursor-pointer">
      <BlankIcon />
    </button>
  }
/>`,
      },
    },
  },
  render: (args) => <WithTrailingStory {...args} />,
};
