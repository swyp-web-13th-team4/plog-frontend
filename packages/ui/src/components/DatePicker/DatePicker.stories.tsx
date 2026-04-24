import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import DatePicker from './DatePicker';
import type { DateValue } from './DatePicker.types';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '날짜를 선택하는 컴포넌트입니다. `onChange`로 선택된 날짜를 반환할 수 있으며, 오늘 이후의 날짜는 선택할 수 없습니다.',
      },
    },
  },
  argTypes: {
    defaultValue: {
      description: '초기 날짜를 지정합니다. 비제어 컴포넌트에서만 사용합니다.',
      table: {
        type: { summary: '{ year: number; month: number; date: number }' },
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
        story: '`defaultValue`로 초기 날짜를 지정할 수 있습니다.',
      },
    },
  },
  args: {
    defaultValue: { year: 2026, month: 4, date: 1 },
  },
};

export const ReturnValue: Story = {
  parameters: {
    docs: {
      description: {
        story: '`onChange`로 선택된 날짜를 반환할 수 있습니다.',
      },
      source: {
        code: `const [date, setDate] = useState<DateValue | undefined>();

return (
  <div className="flex flex-col items-center gap-3">
    <DatePicker onChange={setDate} />
    <p className="body-md text-semantic-object-boldest">
      {date
        ? \`선택된 날짜는 \${date.year}년 \${date.month}월 \${date.date}일입니다.\`
        : '날짜를 선택해주세요.'}
    </p>
  </div>
);`,
      },
    },
  },
  render: function Render() {
    const [date, setDate] = useState<DateValue | undefined>();

    return (
      <div className="flex flex-col items-center gap-3">
        <DatePicker onChange={setDate} />
        <p className="body-md text-semantic-object-boldest">
          {date
            ? `선택된 날짜는 ${date.year}년 ${date.month}월 ${date.date}일입니다.`
            : '날짜를 선택해주세요.'}
        </p>
      </div>
    );
  },
};
