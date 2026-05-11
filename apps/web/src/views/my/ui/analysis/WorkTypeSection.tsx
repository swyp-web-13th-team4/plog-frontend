import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@plog/ui';
import { cva } from 'class-variance-authority';

import { TYPE_CARDS, type TypeCardId } from '@/entities/user';

const containerCva = cva('rounded-xl border-3 p-5', {
  variants: {
    theme: {
      green: 'bg-semantic-accent-subtler border-semantic-accent-normal',
      yellow:
        'bg-semantic-theme-yellow-assistive border-semantic-theme-yellow-bold',
      pink: 'bg-semantic-theme-red-subtle border-semantic-theme-red-alternative',
      sky: 'bg-semantic-theme-sky-subtle border-semantic-theme-sky-alternative',
      navy: 'bg-semantic-theme-blue-subtle border-semantic-theme-blue-neutral',
      purple:
        'bg-semantic-theme-purple-subtle border-semantic-theme-purple-neutral',
    },
  },
});

const badgeCva = cva(
  'self-start label-lg inline-block rounded-full px-4 py-2 mobile:text-semantic-label-md mobile:leading-semantic-label-md mobile:font-semantic-label-md mobile:px-3 mobile:py-1.5',
  {
    variants: {
      theme: {
        green: 'bg-semantic-accent-normal text-semantic-object-inverse',
        navy: 'bg-semantic-theme-blue-bold text-semantic-object-inverse',
        yellow: 'bg-semantic-theme-yellow-normal text-semantic-object-boldest',
        purple: 'bg-semantic-theme-purple-normal text-semantic-object-inverse',
        pink: 'bg-semantic-theme-red-alternative text-semantic-object-inverse',
        sky: 'bg-semantic-theme-sky-normal text-semantic-object-inverse',
      },
    },
  },
);

function LockedTypeCard() {
  return (
    <div className="rounded-xl border-3 border-semantic-stroke-assistive bg-semantic-bg-deeper p-4">
      <div className="flex gap-6">
        <div className="size-36 shrink-0 rounded-xl bg-semantic-object-subtle mobile:size-30" />
        <div className="flex flex-1 flex-col gap-2">
          <span className="label-lg inline-block self-start rounded-full bg-semantic-object-subtle px-4 py-2 text-semantic-object-inverse mobile:px-3 mobile:py-1.5 mobile:text-semantic-label-md mobile:leading-semantic-label-md mobile:font-semantic-label-md">
            ??? 유형
          </span>
          <p className="body-sm break-keep text-semantic-object-bold mobile:text-semantic-caption-md mobile:leading-semantic-caption-md mobile:font-semantic-caption-md">
            작업 기록을 분석해 나의 작업 유형을 찾아드려요.
          </p>
        </div>
      </div>
    </div>
  );
}

type WorkTypeSectionProps = {
  workType: TypeCardId | null;
};

export default function WorkTypeSection({ workType }: WorkTypeSectionProps) {
  const cardData = workType ? TYPE_CARDS.find((c) => c.id === workType) : null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="title-sm text-semantic-object-boldest">
        나의 작업 유형 카드
      </h2>
      {cardData ? (
        <div className={containerCva({ theme: cardData.theme })}>
          <div className="flex gap-6">
            <div className="relative size-36 shrink-0 overflow-hidden rounded-xl mobile:size-30">
              <Image
                src={cardData.image}
                alt={cardData.name}
                fill
                sizes="(max-width: 440px) 120px, 144px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <span className={badgeCva({ theme: cardData.theme })}>
                {cardData.name}
              </span>
              <div className="flex-1">
                <p className="body-sm mt-2 line-clamp-3 break-keep text-semantic-object-bold mobile:text-semantic-caption-md mobile:leading-semantic-caption-md mobile:font-semantic-caption-md">
                  {cardData.summary}
                </p>
              </div>
              <Link
                href="/my/analysis/type-cards"
                className="caption-md inline-flex items-center justify-end gap-2 text-semantic-object-normal"
              >
                자세히 보러가기
                <Icon name="chevron-right" size={12} />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <LockedTypeCard />
      )}
    </section>
  );
}
