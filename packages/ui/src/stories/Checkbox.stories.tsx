import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

import Checkbox from '@/components/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '체크박스 컴포넌트입니다. `checked`로 선택 상태를, `indeterminate`로 중간 선택 상태를 제어합니다. `<label>` 요소와 함께 사용해 접근 가능한 이름을 제공해야 합니다.',
      },
    },
    controls: {
      exclude: ['className', 'defaultChecked'],
    },
  },
  argTypes: {
    checked: {
      description: '제어 컴포넌트로 사용할 때 현재 선택 여부를 지정합니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    indeterminate: {
      description: '`true`로 설정하면 체크 대신 중간 선택 상태를 표시합니다.',
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
    className: { table: { disable: true } },
    onCheckedChange: { table: { disable: true } },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
  },

  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs();

    return (
      <div className="flex items-center gap-2">
        <Checkbox
          {...args}
          id="checkbox"
          checked={checked}
          onCheckedChange={(nextValue) => updateArgs({ checked: nextValue })}
        />
        <label htmlFor="checkbox" className="body-sm cursor-pointer">
          레이블 텍스트
        </label>
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Selected: Story = {
  parameters: {
    docs: {
      description: {
        story: '선택 상태에서는 accent 색상 배경과 체크 아이콘이 표시됩니다.',
      },
    },
  },
  args: {
    checked: true,
  },
};

export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`indeterminate`가 `true`이면 체크 대신 빼기 아이콘이 표시됩니다.',
      },
    },
  },
  args: {
    indeterminate: true,
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

export const DisabledChecked: Story = {
  parameters: {
    docs: {
      description: {
        story: '선택 상태를 유지한 채 비활성화할 수 있습니다.',
      },
    },
  },
  args: {
    checked: true,
    disabled: true,
  },
};
