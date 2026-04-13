import type { Meta, StoryObj } from '@storybook/react';

import Switch from '@/components/Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '토글 스위치 컴포넌트입니다. 활성화/비활성화 두 가지 상태를 전환할 때 사용합니다.',
      },
    },
  },
  argTypes: {
    checked: {
      description: '제어 컴포넌트에서 현재 체크 상태를 지정합니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: '비활성화 상태입니다. 클릭과 포커스 상호작용이 차단됩니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultChecked: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
    onCheckedChange: { table: { disable: true } },
  },
  args: {
    checked: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 상태의 스위치입니다.',
      },
    },
  },
};

export const Checked: Story = {
  parameters: {
    docs: {
      description: {
        story: '체크된 상태의 스위치입니다.',
      },
    },
  },
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 스위치입니다.',
      },
    },
  },
  args: {
    disabled: true,
  },
};

export const CheckedDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '체크된 상태를 유지한 채 비활성화된 스위치입니다.',
      },
    },
  },
  args: {
    checked: true,
    disabled: true,
  },
};
