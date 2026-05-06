import ChichiImage from '@/shared/assets/card-illustration/chichi.jpg';
import HaruImage from '@/shared/assets/card-illustration/haru.jpg';
import LogiImage from '@/shared/assets/card-illustration/logi.jpg';
import NaoImage from '@/shared/assets/card-illustration/nao.jpg';
import PopoImage from '@/shared/assets/card-illustration/popo.jpg';
import ToriImage from '@/shared/assets/card-illustration/tori.jpg';

import { type TypeCardData } from './types';

export const TYPE_CARDS: TypeCardData[] = [
  {
    id: 'logi',
    name: '아침형 로기',
    fullName: '부지런한 아침형 로기',
    image: LogiImage,
    theme: 'green',
    description:
      '남들보다 일찍 하루를 시작해\n계획한 일을 즉시 실행해요.\n부지런한 움직임으로 오전 시간을\n누구보다 밀도 있고 효율적으로 채워가요.',
    stats: [
      { label: '집중력', filled: 3 },
      { label: '계획적', filled: 4 },
      { label: '성실함', filled: 3 },
      { label: '부지런함', filled: 4 },
    ],
    traits: [
      '하루 시작이 빠르고 실행력이 좋아요.',
      '오전 시간에 높은 효율을 발휘해요.',
      '미루기보다 바로 시작하는 편이에요.',
    ],
  },
  {
    id: 'chichi',
    name: '루틴형 치치',
    fullName: '성실 루틴형 치치',
    image: ChichiImage,
    theme: 'yellow',
    description:
      '매일 정해진 시간과 장소에서\n나만의 리듬을 지키며,\n흔들림 없는 꾸준함으로\n단단한 성취를 쌓아가는 타입이에요.',
    stats: [
      { label: '꾸준함', filled: 4 },
      { label: '계획적', filled: 3 },
      { label: '성실함', filled: 4 },
      { label: '부지런함', filled: 4 },
    ],
    traits: [
      '같은 시간, 방식에서 집중이 잘 돼요.',
      '안정적으로 꾸준한 작업이 가능해요.',
      '루틴이 유지될수록 효율이 높아져요.',
    ],
  },
  {
    id: 'tori',
    name: '스퍼트형 토리',
    fullName: '빠른 스퍼트형 토리',
    image: ToriImage,
    theme: 'pink',
    description:
      '짧은 시간 동안 에너지를 집중시켜\n마감 직전 최고의 추진력을 발휘해요.\n빠른 실행으로 문제를 해결하며\n최상의 효율을 만들어내는 타입이에요.',
    stats: [
      { label: '추진력', filled: 4 },
      { label: '계획적', filled: 2 },
      { label: '실행력', filled: 4 },
      { label: '부지런함', filled: 1 },
    ],
    traits: [
      '집중력이 붙으면 빠르게 결과를 내요.',
      '처리 속도가 빠르고 실행력이 강해요.',
      '짧고 강한 몰입에 특화되어 있어요.',
    ],
  },
  {
    id: 'haru',
    name: '탐험형 하루',
    fullName: '자유로운 탐험형 하루',
    image: HaruImage,
    theme: 'sky',
    description:
      '새로운 환경에 빠르게 적응해 장소를 옮기며\n작업할 때 더 몰입해요. 자유로운\n분위기 속에서 나만의 공간을 발견하며\n즐겁게 성취를 만드는 타입이에요.',
    stats: [
      { label: '자유로움', filled: 4 },
      { label: '계획적', filled: 2 },
      { label: '실행력', filled: 3 },
      { label: '꾸준함', filled: 1 },
    ],
    traits: [
      '어디서든 작업이 가능해요.',
      '다양한 장소에서도 적응력이 좋아요.',
      '부담이 적을수록 집중이 잘 돼요.',
    ],
  },
  {
    id: 'popo',
    name: '새벽형 포포',
    fullName: '고요한 새벽형 포포',
    image: PopoImage,
    theme: 'navy',
    description:
      '고요한 밤의 시간 속에서\n혼자만의 시간에 깊이 몰입해요.\n차분하게 생각을 정리하며\n아이디어로 결과물을 만들어요.',
    stats: [
      { label: '탐구력', filled: 4 },
      { label: '성실함', filled: 3 },
      { label: '집중력', filled: 4 },
      { label: '부지런함', filled: 1 },
    ],
    traits: [
      '모두가 잠든 고요한 시간을 선호해요.',
      '조용한 시간에 집중력이 높아요.',
      '혼자만의 깊은 사색이 필요한 작업에 강해요.',
    ],
  },
  {
    id: 'nao',
    name: '예민형 나오',
    fullName: '섬세한 예민형 나오',
    image: NaoImage,
    theme: 'purple',
    description:
      '나만의 환경이 갖춰져 있을 때 깊이\n몰입하며, 작은 차이를 감각적으로\n발견해요. 섬세한 감각으로\n완성도 있는 결과물을 만들어요.',
    stats: [
      { label: '꾸준함', filled: 2 },
      { label: '완성도', filled: 3 },
      { label: '실행력', filled: 2 },
      { label: '섬세함', filled: 4 },
    ],
    traits: [
      '환경 영향을 많이 받아요.',
      '조건이 맞으면 누구보다 깊게 집중할 수 있어요.',
      '섬세한 감각을 가지고 있어요.',
    ],
  },
];
