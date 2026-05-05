'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Divider } from '@plog/ui';
import { cn } from '@plog/utils';
import { cva } from 'class-variance-authority';

import { TYPE_CARDS } from '../model/constants';
import { type TypeCardTheme } from '../model/types';

type TypeCardProps = {
  id: string;
};

const STAT_SEGMENTS = 4;

const cardCva = cva('rounded-[20px] border-[3px]', {
  variants: {
    theme: {
      green: 'bg-semantic-accent-subtler border-semantic-accent-normal',
      yellow:
        'bg-semantic-theme-yellow-assistive border-semantic-theme-yellow-bold',
      pink: 'bg-semantic-feedback-error-subtle border-semantic-feedback-error-alternative',
      sky: 'bg-semantic-theme-sky-subtle border-semantic-theme-sky-normal',
      navy: 'bg-semantic-feedback-info-subtle border-semantic-feedback-info-neutral',
      purple:
        'bg-semantic-theme-purple-subtle border-semantic-theme-purple-neutral',
    },
  },
});

const badgeCva = cva(
  'title-xs inline-block rounded-full px-4 py-2 max-[440px]:text-semantic-label-lg max-[440px]:leading-semantic-label-lg max-[440px]:font-semantic-label-lg',
  {
    variants: {
      theme: {
        green: 'bg-semantic-accent-normal text-semantic-object-inverse',
        navy: 'bg-semantic-feedback-info-bold text-semantic-object-inverse',
        yellow: 'bg-semantic-theme-yellow-normal text-semantic-object-boldest',
        purple: 'bg-semantic-theme-purple-normal text-semantic-object-inverse',
        pink: 'bg-semantic-feedback-error-alternative text-semantic-object-inverse',
        sky: 'bg-semantic-theme-sky-normal text-semantic-object-inverse',
      },
    },
  },
);

const barFillCva = cva('', {
  variants: {
    theme: {
      green: 'bg-semantic-accent-normal',
      navy: 'bg-semantic-feedback-info-bold',
      yellow: 'bg-semantic-theme-yellow-normal',
      purple: 'bg-semantic-theme-purple-normal',
      pink: 'bg-semantic-feedback-error-alternative',
      sky: 'bg-semantic-theme-sky-normal',
    },
  },
});

function NameBadge({ name, theme }: { name: string; theme: TypeCardTheme }) {
  return <span className={badgeCva({ theme })}>{name}</span>;
}

function StatBar({
  label,
  filled,
  theme,
}: {
  label: string;
  filled: number;
  theme: TypeCardTheme;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="label-sm w-12 shrink-0 text-semantic-object-bold">
        {label}
      </span>
      <div className="flex h-3 flex-1 divide-x-1 divide-semantic-system-white overflow-hidden rounded-full">
        {Array.from({ length: STAT_SEGMENTS }, (_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1',
              i < filled ? barFillCva({ theme }) : 'bg-semantic-bg-deeper',
            )}
          />
        ))}
      </div>
    </div>
  );
}

function CardFront({ data }: { data: (typeof TYPE_CARDS)[number] }) {
  return (
    <div className="flex flex-col items-center p-6 max-[440px]:p-5">
      <div className="relative mb-5 aspect-square w-full overflow-hidden rounded-xl">
        <Image
          src={data.image}
          alt={data.name}
          fill
          className="object-cover"
          loading="eager"
        />
      </div>
      <NameBadge name={data.name} theme={data.theme} />
      <p className="body-sm mt-3 text-center tracking-tight whitespace-pre-line text-semantic-object-bold max-[440px]:text-semantic-caption-md max-[440px]:leading-semantic-caption-md max-[440px]:font-semantic-caption-md">
        {data.description}
      </p>
    </div>
  );
}

function CardBack({ data }: { data: (typeof TYPE_CARDS)[number] }) {
  return (
    <div className="flex flex-col items-center p-6 max-[440px]:p-5">
      <NameBadge name={data.name} theme={data.theme} />
      <div className="mt-5 flex w-full flex-col gap-7 rounded-xl bg-semantic-system-white px-5 py-7 max-[440px]:gap-4 max-[440px]:px-3 max-[440px]:py-4">
        <ul className="flex flex-col gap-3" aria-label={`${data.name} 능력치`}>
          {data.stats.map((stat) => (
            <li key={stat.label}>
              <StatBar
                label={stat.label}
                filled={stat.filled}
                theme={data.theme}
              />
            </li>
          ))}
        </ul>
        <Divider className="border-t-semantic-stroke-subtle" />
        <ul
          className="w-full space-y-2 text-semantic-object-bold"
          aria-label={`${data.name} 특징`}
        >
          {data.traits.map((trait) => (
            <li
              key={trait}
              className="label-sm flex items-start gap-2 pl-1 tracking-tight max-[440px]:text-semantic-caption-md max-[440px]:leading-semantic-caption-md max-[440px]:font-semantic-caption-md"
            >
              <span aria-hidden="true">•</span>
              <span className="break-keep">{trait}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function TypeCard({ id }: TypeCardProps) {
  const [flipped, setFlipped] = useState(false);
  const data = TYPE_CARDS.find((card) => card.id === id);

  if (!data) return null;

  return (
    <div
      className="w-90 cursor-pointer drop-shadow-[1.5px_1.5px_7.5px_rgba(0,0,0,0.2)] select-none perspective-distant max-[440px]:w-64"
      onClick={() => setFlipped((prev) => !prev)}
      aria-label={`${data.name} 카드`}
    >
      <article
        className="relative transition-transform duration-500 transform-3d"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div className={cardCva({ theme: data.theme })}>
          <CardFront data={data} />
        </div>
        <div
          className={cn(
            cardCva({ theme: data.theme }),
            'absolute inset-0 [transform:rotateY(180deg)] backface-hidden',
          )}
        >
          <CardBack data={data} />
        </div>
      </article>
    </div>
  );
}
