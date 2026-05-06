import { type StaticImageData } from 'next/image';

export type TypeCardId = 'logi' | 'chichi' | 'tori' | 'haru' | 'popo' | 'nao';

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
  id: TypeCardId;
  name: string;
  fullName: string;
  image: StaticImageData;
  theme: TypeCardTheme;
  description: string;
  stats: TypeCardStat[];
  traits: string[];
};
