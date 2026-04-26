import type { Meta, StoryObj } from '@storybook/react';

import Carousel from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '스와이프로 슬라이드를 전환할 수 있는 컴포넌트입니다. `Carousel.Slide`로 각 슬라이드를 구성합니다.',
      },
    },
  },
  argTypes: {
    loop: {
      description: '마지막 슬라이드에서 첫 번째 슬라이드로 순환합니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    initialSlide: {
      description: '초기 슬라이드 인덱스입니다.',
      control: 'number',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    onChange: {
      description: '슬라이드 전환 시 현재 인덱스를 반환합니다.',
      table: { type: { summary: '(index: number) => void' } },
    },
    'aria-label': {
      description:
        '캐러셀 영역의 접근 가능한 이름입니다. `aria-labelledby`와 둘 중 하나를 반드시 전달해야 합니다.',
      control: 'text',
    },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    'aria-labelledby': { table: { disable: true } },
  },
  args: {
    'aria-label': '게시물 이미지',
  },
  decorators: [
    (Story) => (
      <div className="max-w-120">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const IMAGES = [
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
];

const DEFAULT_CODE = `\
<Carousel aria-label="게시물 이미지">
  <Carousel.Slide>
    <img src="..." alt="" />
  </Carousel.Slide>
  <Carousel.Slide>
    <img src="..." alt="" />
  </Carousel.Slide>
  <Carousel.Slide>
    <img src="..." alt="" />
  </Carousel.Slide>
</Carousel>`;

const LOOP_CODE = `\
<Carousel aria-label="게시물 이미지" loop>
  <Carousel.Slide>
    <img src="..." alt="" />
  </Carousel.Slide>
  <Carousel.Slide>
    <img src="..." alt="" />
  </Carousel.Slide>
  <Carousel.Slide>
    <img src="..." alt="" />
  </Carousel.Slide>
</Carousel>`;

const SINGLE_SLIDE_CODE = `\
<Carousel aria-label="게시물 이미지">
  <Carousel.Slide>
    <img src="..." alt="" />
  </Carousel.Slide>
</Carousel>`;

const INITIAL_SLIDE_CODE = `\
<Carousel aria-label="게시물 이미지" initialSlide={2}>
  <Carousel.Slide>
    <img src="..." alt="" />
  </Carousel.Slide>
  <Carousel.Slide>
    <img src="..." alt="" />
  </Carousel.Slide>
  <Carousel.Slide>
    <img src="..." alt="" />
  </Carousel.Slide>
</Carousel>`;

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: DEFAULT_CODE },
    },
  },
  render: (args) => (
    <Carousel {...args}>
      {IMAGES.map((src, i) => (
        <Carousel.Slide key={i}>
          <img src={src} alt="" />
        </Carousel.Slide>
      ))}
    </Carousel>
  ),
};

export const Loop: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`loop`를 설정하면 마지막 슬라이드에서 첫 번째 슬라이드로 순환합니다.',
      },
      source: { code: LOOP_CODE },
    },
  },
  args: { loop: true },
  render: (args) => (
    <Carousel {...args}>
      {IMAGES.map((src, i) => (
        <Carousel.Slide key={i}>
          <img src={src} alt="" />
        </Carousel.Slide>
      ))}
    </Carousel>
  ),
};

export const SingleSlide: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '슬라이드가 1개인 경우 페이지네이션과 스와이프가 자동으로 비활성화됩니다.',
      },
      source: { code: SINGLE_SLIDE_CODE },
    },
  },
  render: (args) => (
    <Carousel {...args}>
      <Carousel.Slide>
        <img src={IMAGES[0]} alt="" />
      </Carousel.Slide>
    </Carousel>
  ),
};

export const InitialSlide: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`initialSlide`로 초기에 표시할 슬라이드 인덱스를 지정할 수 있습니다.',
      },
      source: { code: INITIAL_SLIDE_CODE },
    },
  },
  args: { initialSlide: 2 },
  render: (args) => (
    <Carousel {...args}>
      {IMAGES.map((src, i) => (
        <Carousel.Slide key={i}>
          <img src={src} alt="" />
        </Carousel.Slide>
      ))}
    </Carousel>
  ),
};
