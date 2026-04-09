import type { Meta, StoryObj } from '@storybook/react';

import BlankIcon from '@/assets/blank.svg?react';
import Button from '@/components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '기본 버튼 컴포넌트입니다. `variant`로 시각적 강조 수준을, `size`로 크기를 조절합니다. 아이콘과 로딩 상태를 설정할 수 있습니다.',
      },
    },
  },
  argTypes: {
    variant: {
      description:
        '버튼의 시각적 스타일입니다. 액션의 중요도에 따라 선택합니다.',
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      table: {
        type: { summary: "'primary' | 'secondary' | 'outline'" },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      description:
        '버튼 크기를 설정합니다. 아이콘 크기와 간격도 함께 조정됩니다.',
      control: 'select',
      options: ['large', 'medium', 'small'],
      table: {
        type: { summary: "'large' | 'medium' | 'small'" },
        defaultValue: { summary: 'medium' },
      },
    },
    children: {
      description: '버튼 내부에 표시될 콘텐츠입니다.',
      control: 'text',
    },
    iconLeft: { table: { disable: true } },
    iconRight: { table: { disable: true } },
    loading: {
      description:
        '로딩 상태입니다. `primary`는 흰색 스피너, 그 외에는 회색 스피너가 표시됩니다.',
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
    fullWidth: {
      description: '`true`로 설정하면 부모 요소의 너비를 가득 채웁니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    children: '버튼',
    variant: 'primary',
    size: 'medium',
    fullWidth: false,
    disabled: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`primary`는 주요 액션, `secondary`는 보조 액션, `outline`은 낮은 강조 수준의 액션에 사용합니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex gap-3">
      <Button {...args} variant="primary">
        primary
      </Button>
      <Button {...args} variant="secondary">
        secondary
      </Button>
      <Button {...args} variant="outline">
        outline
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: '크기에 따라 패딩, 폰트 크기, 아이콘 크기가 함께 변경됩니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="small">
        small
      </Button>
      <Button {...args} size="medium">
        medium
      </Button>
      <Button {...args} size="large">
        large
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: '부모 컨테이너의 전체 너비를 차지합니다.',
      },
    },
  },
  args: {
    fullWidth: true,
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
  render: (args) => (
    <div className="flex gap-3">
      <Button {...args} variant="primary" disabled>
        primary
      </Button>
      <Button {...args} variant="secondary" disabled>
        secondary
      </Button>
      <Button {...args} variant="outline" disabled>
        outline
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: '`variant`에 따라 스피너 색상이 달라집니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} variant="primary" loading>
        primary
      </Button>
      <Button {...args} variant="secondary" loading>
        secondary
      </Button>
      <Button {...args} variant="outline" loading>
        outline
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`iconLeft`, `iconRight`에 ReactNode를 전달할 수 있습니다. 아이콘 크기와 간격은 `size`에 따라 자동으로 조정됩니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} iconLeft={<BlankIcon />}>
        left
      </Button>
      <Button {...args} iconRight={<BlankIcon />}>
        right
      </Button>
      <Button {...args} iconLeft={<BlankIcon />} iconRight={<BlankIcon />}>
        both
      </Button>
    </div>
  ),
};
