import type { Meta, StoryObj } from '@storybook/react';

import Avatar from '@/components/Avatar';

const SAMPLE_SRC =
  'https://images.unsplash.com/photo-1735989967755-706e5edcb44b?q=80&w=400&auto=format&fit=crop';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '사용자 프로필 사진을 표시하는 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    size: {
      description: '아바타 크기를 설정합니다.',
      control: 'select',
      options: ['lg', 'md', 'sm', 'xs'],
      table: {
        type: { summary: "'lg' | 'md' | 'sm' | 'xs'" },
      },
    },
    src: {
      description: '표시할 이미지 URL입니다.',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    fallbackSrc: {
      description:
        '이미지 로드 실패 시 표시할 폴백 이미지 URL입니다. 없으면 회색 원이 표시됩니다.',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    alt: {
      description: '이미지의 대체 텍스트입니다.',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    selected: {
      description: '선택된 상태입니다. 초록색 테두리가 표시됩니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      description:
        '업로드 중 오버레이를 표시합니다. `xs` 크기에서는 작은 스피너를 사용합니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: { table: { disable: true } },
  },
  args: {
    size: 'md',
    src: SAMPLE_SRC,
    alt: '사용자 프로필',
    selected: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const Fallback: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`src`가 없거나 이미지 로드에 실패하면 폴백 이미지를 표시합니다. `fallbackSrc`가 없으면 회색 원을 표시합니다.',
      },
    },
  },
  args: {
    src: undefined,
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: '네 가지 크기를 제공합니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex items-end gap-6">
      {(['lg', 'md', 'sm', 'xs'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar {...args} size={size} />
          <span className="caption-md text-semantic-object-normal">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Selected: Story = {
  parameters: {
    docs: {
      description: {
        story: '`selected`가 `true`이면 테두리가 표시됩니다.',
      },
    },
  },
  args: {
    selected: true,
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: '`loading`이 `true`이면 오버레이와 스피너가 표시됩니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar {...args} size="lg" loading />
        <span className="caption-md text-semantic-object-normal">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar {...args} size="xs" loading />
        <span className="caption-md text-semantic-object-normal">xs</span>
      </div>
    </div>
  ),
};
