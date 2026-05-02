import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import TimePicker from './TimePicker';
import type { TimeValue } from './TimePicker.types';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '스와이프로 시간을 선택하는 컴포넌트입니다. `onChange`로 선택된 시간을 반환할 수 있으며, `hour`는 24시간 기준으로 반환됩니다.',
      },
    },
  },
  argTypes: {
    defaultValue: {
      description: '초기 시간을 지정합니다. 비제어 컴포넌트에서만 사용합니다.',
      table: {
        type: { summary: '{ hour: number; minute: number }' },
      },
    },
    minuteStep: {
      description: '분 선택 단위를 지정합니다.',
      control: { type: 'number', min: 1, max: 30 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  parameters: {
    docs: {
      description: {
        story: '`defaultValue`로 초기 시간을 지정할 수 있습니다.',
      },
    },
  },
  args: {
    defaultValue: { hour: 14, minute: 30 },
  },
};

export const WithMinuteStep: Story = {
  parameters: {
    docs: {
      description: {
        story: '`minuteStep`으로 분 선택 단위를 지정할 수 있습니다.',
      },
    },
  },
  args: {
    minuteStep: 10,
    defaultValue: { hour: 9, minute: 0 },
  },
};

export const ReturnValue: Story = {
  parameters: {
    docs: {
      description: {
        story: '`onChange`로 선택된 시간을 반환할 수 있습니다.',
      },
      source: {
        code: `const [time, setTime] = useState<TimeValue>({ hour: 0, minute: 0 });

return (
  <div className="flex flex-col items-center gap-3">
    <TimePicker onChange={setTime} />
    <p className="body-md text-semantic-object-boldest">
      {\`선택된 시간은 \${time.hour}시\${time.minute !== 0 ? \` \${time.minute}분\` : ''}입니다.\`}
    </p>
  </div>
);`,
      },
    },
  },
  render: function Render() {
    const [time, setTime] = useState<TimeValue>({ hour: 0, minute: 0 });

    return (
      <div className="flex flex-col items-center gap-3">
        <TimePicker onChange={setTime} />
        <p className="body-md text-semantic-object-boldest">
          {`선택된 시간은 ${time.hour}시${time.minute !== 0 ? ` ${time.minute}분` : ''}입니다.`}
        </p>
      </div>
    );
  },
};
