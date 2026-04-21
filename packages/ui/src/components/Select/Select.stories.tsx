import type { Meta, StoryObj } from '@storybook/react';

import Select from './Select';

const OPTIONS = [
  { label: '옵션 1', value: 'option1' },
  { label: '옵션 2', value: 'option2' },
  { label: '옵션 3', value: 'option3' },
  { label: '옵션 4', value: 'option4' },
  { label: '옵션 5', value: 'option5' },
  { label: '옵션 6', value: 'option6' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '선택 가능한 옵션 목록을 드롭다운으로 표시하는 컴포넌트입니다. `options`로 선택지를 전달할 수 있습니다.',
      },
    },
  },
  argTypes: {
    options: {
      description: '드롭다운에 표시할 옵션 리스트입니다.',
      table: {
        type: { summary: '{ label: string; value: string }[]' },
      },
    },
    placeholder: {
      description: '값이 선택되지 않았을 때 표시되는 안내 텍스트입니다.',
      control: 'text',
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
      description:
        '단독으로 사용할 때 스크린리더에 전달할 레이블입니다. `aria-labelledby`와 동시에 사용할 수 없습니다.',
      control: 'text',
    },
    'aria-labelledby': {
      description:
        '레이블 역할을 하는 요소의 id를 지정합니다. `aria-label`과 동시에 사용할 수 없습니다.',
      control: 'text',
    },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
    contentClassName: { table: { disable: true } },
    optionClassName: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
  },
  args: {
    options: OPTIONS,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '값이 선택된 상태입니다. `defaultValue`로 초기 선택값을 지정할 수 있습니다.',
      },
    },
  },
  args: {
    defaultValue: 'option1',
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

export const DisabledWithValue: Story = {
  parameters: {
    docs: {
      description: {
        story: '값이 선택된 채로 비활성화할 수 있습니다.',
      },
    },
  },
  args: {
    defaultValue: 'option1',
    disabled: true,
  },
};
