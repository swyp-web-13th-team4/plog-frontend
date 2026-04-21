import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

import BlankIcon from '@/assets/blank.svg?react';

import Chip from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '태그 및 필터 선택에 사용하는 칩 컴포넌트입니다. `pressed`로 선택 상태를, `size`로 크기를 조절합니다. 아이콘을 설정할 수 있습니다.',
      },
    },
  },
  argTypes: {
    pressed: {
      description: '칩의 선택 여부를 나타냅니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      description: '칩 크기를 설정합니다.',
      control: 'select',
      options: ['small', 'large'],
      table: {
        type: { summary: "'small' | 'large'" },
        defaultValue: { summary: 'small' },
      },
    },
    children: {
      description: '칩 내부에 표시될 콘텐츠입니다.',
      control: 'text',
    },
    variant: {
      description: '선택 상태에서 적용되는 칩의 시각적 스타일입니다.',
      control: 'select',
      options: ['solid', 'soft'],
      table: {
        type: { summary: "'solid' | 'soft'" },
        defaultValue: { summary: 'solid' },
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
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
    iconLeft: { table: { disable: true } },
    iconRight: { table: { disable: true } },
    type: { table: { disable: true } },
  },
  args: {
    children: '칩',
    size: 'small',
    variant: 'solid',
    pressed: false,
    disabled: false,
  },

  render: function Render(args) {
    const [{ pressed }, updateArgs] = useArgs();

    return (
      <Chip
        {...args}
        pressed={pressed}
        onPressedChange={(next) => updateArgs({ pressed: next })}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: '크기에 따라 패딩과 폰트 크기가 함께 변경됩니다.',
      },
    },
  },
  render: function Render(args) {
    const [{ pressed }, updateArgs] = useArgs();
    return (
      <div className="flex items-center gap-3">
        <Chip
          {...args}
          size="small"
          pressed={pressed}
          onPressedChange={(next) => updateArgs({ pressed: next })}
        >
          small
        </Chip>
        <Chip
          {...args}
          size="large"
          pressed={pressed}
          onPressedChange={(next) => updateArgs({ pressed: next })}
        >
          large
        </Chip>
      </div>
    );
  },
};

export const Pressed: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '선택 상태에서는 `variant`에 따라 서로 다른 스타일이 적용됩니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Chip {...args} variant="solid" pressed>
        solid
      </Chip>
      <Chip {...args} variant="soft" pressed>
        soft
      </Chip>
    </div>
  ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '비활성화 상태에서는 클릭 이벤트가 차단됩니다. 선택 여부와 관계없이 동일한 스타일로 표시됩니다.',
      },
    },
  },
  args: {
    disabled: true,
  },
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`iconLeft`, `iconRight`에 ReactNode를 전달할 수 있습니다. 아이콘 크기는 `size`와 무관하게 고정됩니다.',
      },
    },
  },
  render: function Render(args) {
    const [{ pressed }, updateArgs] = useArgs();
    const toggle = (next: boolean) => updateArgs({ pressed: next });
    return (
      <div className="flex items-center gap-3">
        <Chip
          {...args}
          iconLeft={<BlankIcon />}
          pressed={pressed}
          onPressedChange={toggle}
        >
          left
        </Chip>
        <Chip
          {...args}
          iconRight={<BlankIcon />}
          pressed={pressed}
          onPressedChange={toggle}
        >
          right
        </Chip>
        <Chip
          {...args}
          iconLeft={<BlankIcon />}
          iconRight={<BlankIcon />}
          pressed={pressed}
          onPressedChange={toggle}
        >
          both
        </Chip>
      </div>
    );
  },
};
