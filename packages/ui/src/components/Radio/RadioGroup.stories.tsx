import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

import RadioGroup from './RadioGroup';
import { type RadioGroupOption } from './RadioGroup.types';

const OPTIONS: RadioGroupOption[] = [
  { value: 'option-1', label: '옵션 1' },
  { value: 'option-2', label: '옵션 2' },
  { value: 'option-3', label: '옵션 3' },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '`items` 배열로 라디오 목록을 구성하는 컴포넌트입니다. 하나의 값만 선택할 수 있으며, `value`/`onValueChange`로 선택 상태를 제어합니다. 라벨은 각 항목과 자동으로 연결되어 접근성을 보장합니다.',
      },
    },
  },
  argTypes: {
    items: {
      description:
        '라디오 목록을 구성하는 항목 배열입니다. 각 항목의 `value`는 그룹 내에서 고유해야 합니다.',
      control: false,
      table: {
        type: { summary: 'RadioGroupOption[]' },
      },
    },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    className: { table: { disable: true } },
    itemClassName: { table: { disable: true } },
    labelClassName: { table: { disable: true } },
    disabled: {
      description: '`true`이면 그룹 전체를 비활성화합니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    items: OPTIONS,
    disabled: false,
  },

  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    return (
      <RadioGroup
        {...args}
        value={value}
        onValueChange={(nextValue) => updateArgs({ value: nextValue })}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};

export const Selected: Story = {
  parameters: {
    docs: {
      description: {
        story: '`value`로 선택 상태를 제어합니다.',
      },
    },
  },
  args: {
    value: 'option-2',
  },
};

export const DisabledOption: Story = {
  parameters: {
    docs: {
      description: {
        story: '각 항목의 `disabled`로 특정 옵션만 비활성화할 수 있습니다.',
      },
    },
  },
  args: {
    items: [
      { value: 'option-1', label: '옵션 1' },
      { value: 'option-2', label: '옵션 2', disabled: true },
      { value: 'option-3', label: '옵션 3' },
    ],
  },
};

export const DisabledGroup: Story = {
  parameters: {
    docs: {
      description: {
        story: '그룹의 `disabled`로 모든 항목을 한 번에 비활성화합니다.',
      },
    },
  },
  args: {
    value: 'option-2',
    disabled: true,
  },
};
