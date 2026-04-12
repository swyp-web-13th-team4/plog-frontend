import type { Meta, StoryObj } from '@storybook/react';

import Textarea from '@/components/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '멀티라인 텍스트 입력 컴포넌트입니다. `maxLength`를 설정하면 우측 하단에 글자 수 카운터가 표시됩니다. `Field`로 감싸면 레이블과 에러 및 설명 메시지를 추가할 수 있습니다.',
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
    maxLength: {
      description:
        '최대 입력 가능 글자 수입니다. 설정 시 글자 수 카운터가 표시됩니다.',
      control: 'number',
    },
    disabled: {
      description: '비활성화 상태입니다. 클릭 및 입력이 차단됩니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    placeholder: '내용을 입력하세요',
    maxLength: 300,
    disabled: false,
    invalid: false,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Invalid: Story = {
  parameters: {
    docs: {
      description: { story: '에러 상태에서는 테두리 색상이 변경됩니다.' },
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
