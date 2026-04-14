import type { ReactNode } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '@/components/Checkbox';

function StatePreview({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <span className="label-md">{label}</span>
    </div>
  );
}

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '20x20 크기의 체크박스 컴포넌트입니다. `default`, `hover`, `selected`, `indeterminate`, `disabled` 상태를 지원하며 Base UI Checkbox 프리미티브를 감싸 디자인 시스템 스타일만 고정합니다.',
      },
    },
    controls: {
      exclude: ['className', 'aria-label', 'defaultChecked'],
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
      description:
        '체크 대신 중간 상태를 표시합니다. 일부 선택 상태 표현에 사용합니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description:
        '비활성화 상태입니다. 클릭이 차단되며 disabled 전용 색상이 적용됩니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: false,
      table: { disable: true },
    },
    'aria-label': {
      control: false,
      table: { disable: true },
    },
  },

  args: {
    disabled: false,
    indeterminate: false,
    checked: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 상태입니다. 흰 배경과 assistive border를 사용합니다.',
      },
    },
  },
};

export const Selected: Story = {
  parameters: {
    docs: {
      description: {
        story: '선택 상태입니다. accent color 배경과 체크 아이콘이 표시됩니다.',
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
        story: '중간 상태입니다. 체크 대신 minus 아이콘이 표시됩니다.',
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
        story:
          '비활성화 상태입니다. 입력이 차단되고 회색 계열 색상이 적용됩니다.',
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
        story:
          '선택된 비활성화 상태입니다. selected와 disabled 조합 전용 색상이 적용됩니다.',
      },
    },
  },
  args: {
    checked: true,
    disabled: true,
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '디자인 QA를 위해 주요 상태를 한 번에 비교합니다. hover는 시안 확인을 위해 정적 클래스로 시뮬레이션했습니다.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <StatePreview label="default">
        <Checkbox aria-label="default" />
      </StatePreview>
      <StatePreview label="hover">
        <Checkbox
          aria-label="hover"
          className="border-semantic-accent-normal bg-semantic-system-white"
        />
      </StatePreview>
      <StatePreview label="selected">
        <Checkbox aria-label="selected" checked />
      </StatePreview>
      <StatePreview label="indeterminate">
        <Checkbox aria-label="indeterminate" indeterminate />
      </StatePreview>
      <StatePreview label="disabled">
        <Checkbox aria-label="disabled" disabled />
      </StatePreview>
      <StatePreview label="disabled checked">
        <Checkbox aria-label="disabled checked" checked disabled />
      </StatePreview>
    </div>
  ),
};
