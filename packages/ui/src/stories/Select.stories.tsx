import type { Meta, StoryObj } from '@storybook/react';

import Select from '@/components/Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '선택 가능한 옵션 목록을 표시하는 드롭다운 컴포넌트입니다. `options`로 선택지를 전달합니다.',
      },
    },
  },
  argTypes: {
    disabled: {
      description:
        '비활성화 상태입니다. 클릭 이벤트가 차단되며 스타일이 변경됩니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: { table: { disable: true } },
    contentClassName: { table: { disable: true } },
    optionClassName: { table: { disable: true } },
  },
  args: {
    placeholder: '선택하세요',
    options: [
      { label: 'label1', value: 'value1' },
      { label: 'label2', value: 'value2' },
      { label: 'label3', value: 'value3' },
      { label: 'label4', value: 'value4' },
      { label: 'label5', value: 'value5' },
      { label: 'label6', value: 'value6' },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
