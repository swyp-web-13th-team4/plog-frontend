import { type StaticImageData } from 'next/image';

export type TypeCardTheme =
  | 'green'
  | 'yellow'
  | 'pink'
  | 'sky'
  | 'navy'
  | 'purple';

export type TypeCardStat = {
  label: string;
  filled: number;
};

export type TypeCardData = {
  id: string;
  name: string;
  fullName: string;
  image: StaticImageData;
  theme: TypeCardTheme;
  description: string;
  stats: TypeCardStat[];
  traits: string[];
};
