import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';

import Field from './Field';

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '레이블, 입력 컨트롤, 에러 및 설명 메시지를 묶는 래퍼 컴포넌트입니다. `Input`, `Textarea` 외에도 어떤 폼 컨트롤이든 `children`으로 받을 수 있습니다.',
      },
    },
  },
  argTypes: {
    label: {
      description: '입력 필드 위에 표시되는 레이블입니다.',
      control: 'text',
    },
    required: {
      description:
        '필수 항목 여부입니다. 레이블 옆에 표시되며 하위 컨트롤에 자동 전파됩니다.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    error: {
      description: '에러 메시지입니다. 값이 있으면 에러 스타일이 적용됩니다.',
      control: 'text',
    },
    description: {
      description: '하단에 표시되는 보조 설명입니다. 에러가 있으면 대체됩니다.',
      control: 'text',
    },
    disabled: {
      description: '비활성화 여부입니다. 하위 컨트롤에 자동 전파됩니다.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    label: '레이블',
    required: true,
    disabled: false,
    description: '자유롭게 입력해 주세요.',
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const WithInput: Story = {
  parameters: {
    docs: {
      description: { story: '`Input`과 함께 사용하는 예제입니다.' },
    },
  },
  render: (args) => (
    <Field {...args}>
      <Input placeholder="내용을 입력하세요" />
    </Field>
  ),
};

export const WithTextarea: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`Textarea`와 함께 사용하는 예제입니다. 글자 수 카운터는 `Field` 하단에서 표시됩니다.',
      },
    },
  },
  render: (args) => (
    <Field {...args}>
      <Textarea placeholder="내용을 입력하세요" maxLength={300} />
    </Field>
  ),
};

function WithErrorStory(args: React.ComponentProps<typeof Field>) {
  const [value, setValue] = useState('잘못된 입력');
  return (
    <Field {...args} error="사용할 수 없습니다.">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    </Field>
  );
}

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`error`를 `Field`에 전달합니다. context를 통해 하위 컨트롤의 스타일이 자동으로 변경됩니다.',
      },
      source: {
        code: `<Field label="레이블" error="사용할 수 없습니다.">
  <Input
    value={value}
    onChange={(e) => setValue(e.target.value)}
    onClear={() => setValue('')}
  />
</Field>`,
      },
    },
  },
  render: (args) => <WithErrorStory {...args} />,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`disabled`를 `Field`에 전달하면 context를 통해 하위 컨트롤에 자동으로 적용됩니다.',
      },
    },
  },
  render: (args) => (
    <Field {...args} disabled>
      <Input placeholder="내용을 입력하세요" />
    </Field>
  ),
};
