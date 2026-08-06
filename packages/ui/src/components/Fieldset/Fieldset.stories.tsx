import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from '@/components/Chip';

import Fieldset from './Fieldset';

const meta: Meta<typeof Fieldset> = {
  title: 'Components/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '여러 컨트롤을 하나의 이름으로 묶는 래퍼 컴포넌트입니다. `fieldset`으로 렌더되며 레이블이 `aria-labelledby`로 그룹 전체에 연결됩니다. 컨트롤이 하나뿐이라면 `Field`를 사용합니다.',
      },
    },
  },
  argTypes: {
    label: {
      description: '그룹 위에 표시되는 레이블입니다. 그룹의 이름이 됩니다.',
      control: 'text',
    },
    required: {
      description: '필수 항목 여부입니다. 레이블 옆에 표시됩니다.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    error: {
      description: '에러 메시지입니다.',
      control: 'text',
    },
    success: {
      description: '성공 메시지입니다. 에러가 없을 때 표시됩니다.',
      control: 'text',
    },
    description: {
      description: '하단에 표시되는 보조 설명입니다. 에러가 있으면 대체됩니다.',
      control: 'text',
    },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    label: '레이블',
    required: true,
  },
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

const OPTIONS = ['옵션 1', '옵션 2', '옵션 3'];

function Options() {
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((option) => (
        <Chip key={option} size="small" variant="soft">
          {option}
        </Chip>
      ))}
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '레이블이 그룹 전체의 이름이 됩니다.',
      },
    },
  },
  render: (args) => (
    <Fieldset {...args}>
      <Options />
    </Fieldset>
  ),
};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: '`description`은 그룹의 `aria-describedby`로 연결됩니다.',
      },
    },
  },
  args: {
    description: '중복 선택할 수 있어요.',
  },
  render: (args) => (
    <Fieldset {...args}>
      <Options />
    </Fieldset>
  ),
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: '`error`를 전달하면 하단에 에러 메시지가 표시됩니다.',
      },
    },
  },
  args: {
    error: '하나 이상 선택해 주세요.',
  },
  render: (args) => (
    <Fieldset {...args}>
      <Options />
    </Fieldset>
  ),
};
