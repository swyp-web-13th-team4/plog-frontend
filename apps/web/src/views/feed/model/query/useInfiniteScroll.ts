'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import postImage from '@/shared/assets/images/image.png';
import profileImage from '@/shared/assets/images/profileImage.png';

const profileImageSrc = profileImage.src;
const postImageSrc = postImage.src;

const PAGE_SIZE = 10;
export const FEED_QUERY_KEY = ['feed'] as const;

export type FeedTag = {
  id: string;
  name: string;
};

export type FeedPost = {
  POST_INFO: {
    id: string;
    isLiked: boolean;
    isBookmarked: boolean;
    USER_INFO: {
      id: string;
      nickname: string;
      profileImage: string;
    };
    createdAt: string;
    heartCount: number;
    title: string;
    content: string;
    image: string;
    tags: FeedTag[];
    PLACE_INFO: {
      id: string;
      placeName: string;
      studyDate: string;
      studyTime: string;
      concentrateCount: number;
    };
  };
};

export type FeedPage = {
  items: FeedPost[];
  nextPage: number | undefined;
};

export const BASE_FEED_DATA: FeedPost[] = [
  {
    POST_INFO: {
      id: '1',
      isLiked: false,
      isBookmarked: false,
      USER_INFO: {
        id: '1',
        nickname: '승민',
        profileImage: profileImageSrc,
      },
      createdAt: '1시간 전',
      heartCount: 213219,
      title: '동네 카페 작업 일지',
      content:
        '광화문 근처에서 작업하기 좋은 곳을 드디어 찾았다. 재즈 음악이 흐르지만 소음이 적당해서 집중하기 딱 좋다. 특히 오후 2시쯤 창가 자리는 채광이 정말 예뻐서 사진 찍기에도 최고. 와이파이도 끊김 없고 테이블 높이도 적당해서 자주 오게 될 것 같은 느낌!',
      image: postImageSrc,
      tags: [
        { id: '1-1', name: '#카페' },
        { id: '1-2', name: '#작업공간' },
        { id: '1-3', name: '#광화문' },
      ],
      PLACE_INFO: {
        id: '1',
        placeName: '스타벅스 광화문점',
        studyDate: '2026년 4월 16일',
        studyTime: '2시간 30분',
        concentrateCount: 4,
      },
    },
  },
  {
    POST_INFO: {
      id: '2',
      isLiked: false,
      isBookmarked: false,
      USER_INFO: {
        id: '2',
        nickname: '민서',
        profileImage: profileImageSrc,
      },
      createdAt: '2시간 전',
      heartCount: 24,
      title: '조용한 도서관 라운지 발견',
      content:
        '주말 오전에 사람이 많지 않은 공간을 찾다가 들렀는데 생각보다 훨씬 만족스러웠다. 좌석 간 간격이 넓어서 답답하지 않고, 콘센트도 자리마다 가까워서 노트북 작업하기 편했다. 커피 향이 은은하게 나고 전체적으로 차분한 분위기라서 긴 글을 써야 할 때 다시 오고 싶다.',
      image: postImageSrc,
      tags: [
        { id: '2-1', name: '#도서관' },
        { id: '2-2', name: '#라운지' },
        { id: '2-3', name: '#주말' },
      ],
      PLACE_INFO: {
        id: '2',
        placeName: '시청 북라운지',
        studyDate: '2026년 4월 17일',
        studyTime: '3시간 10분',
        concentrateCount: 5,
      },
    },
  },
  {
    POST_INFO: {
      id: '3',
      isLiked: false,
      isBookmarked: false,
      USER_INFO: {
        id: '3',
        nickname: '도윤',
        profileImage: profileImageSrc,
      },
      createdAt: '3시간 전',
      heartCount: 17,
      title: '비 오는 날엔 이 카페',
      content:
        '창문이 크게 나 있어서 비 오는 풍경을 보며 작업하기 좋았다. 잔잔한 플레이리스트가 계속 나와서 집중 흐름도 끊기지 않았고, 디저트가 너무 달지 않아서 커피랑 같이 먹기 좋았다. 오후 늦게 가면 살짝 붐비긴 하지만, 그래도 재방문 의사는 충분하다.',
      image: postImageSrc,
      tags: [
        { id: '3-1', name: '#비오는날' },
        { id: '3-2', name: '#카페' },
        { id: '3-3', name: '#작업' },
      ],
      PLACE_INFO: {
        id: '3',
        placeName: '레인드롭 카페',
        studyDate: '2026년 4월 18일',
        studyTime: '1시간 45분',
        concentrateCount: 3,
      },
    },
  },
  {
    POST_INFO: {
      id: '4',
      isLiked: false,
      isBookmarked: false,
      USER_INFO: {
        id: '4',
        nickname: '하린',
        profileImage: profileImageSrc,
      },
      createdAt: '5시간 전',
      heartCount: 31,
      title: '콘센트 맛집 작업 공간',
      content: '노트북이랑 태블릿을 같이 써야 해서 콘센트 위치가중요함123456',
      image: postImageSrc,
      tags: [
        { id: '4-1', name: '#콘센트맛집' },
        { id: '4-2', name: '#작업공간' },
        { id: '4-3', name: '#성수동' },
      ],
      PLACE_INFO: {
        id: '4',
        placeName: '워크룸 성수',
        studyDate: '2026년 4월 19일',
        studyTime: '4시간 5분',
        concentrateCount: 2,
      },
    },
  },
  {
    POST_INFO: {
      id: '5',
      isLiked: false,
      isBookmarked: false,
      USER_INFO: {
        id: '5',
        nickname: '지후',
        profileImage: profileImageSrc,
      },
      createdAt: '6시간 전',
      heartCount: 8,
      title: '짧게 몰입하기 좋았던 곳',
      content:
        '잠깐 할 일 정리하려고 들어갔는데 예상보다 집중이 잘 됐다. 매장이 크진 않지만 동선이 복잡하지 않고 음악 소리도 크지 않아서 짧은 시간 안에 할 일을 끝내기 좋았다. 음료 가격도 무난해서 근처 올 때 부담 없이 들를 수 있을 것 같다.',
      image: postImageSrc,
      tags: [
        { id: '5-1', name: '#짧은시간' },
        { id: '5-2', name: '#몰입' },
        { id: '5-3', name: '#카페' },
      ],
      PLACE_INFO: {
        id: '5',
        placeName: '카페 모먼트',
        studyDate: '2026년 4월 20일',
        studyTime: '1시간 20분',
        concentrateCount: 2,
      },
    },
  },
  {
    POST_INFO: {
      id: '6',
      isLiked: false,
      isBookmarked: false,
      USER_INFO: {
        id: '6',
        nickname: '서윤',
        profileImage: profileImageSrc,
      },
      createdAt: '8시간 전',
      heartCount: 42,
      title: '오전 집중력이 잘 나왔던 스팟',
      content:
        '아침 일찍 방문했더니 햇살이 부드럽게 들어와서 기분 좋게 시작할 수 있었다. 테이블이 넓어서 책이랑 노트북을 같이 펼쳐도 공간이 남았고, 전체적으로 정돈된 분위기 덕분에 산만해지지 않았다. 오전 공부 루틴 만들기에 꽤 괜찮은 장소다.',
      image: postImageSrc,
      tags: [
        { id: '6-1', name: '#오전' },
        { id: '6-2', name: '#집중력' },
        { id: '6-3', name: '#카페' },
      ],
      PLACE_INFO: {
        id: '6',
        placeName: '라이트업 커피',
        studyDate: '2026년 4월 21일',
        studyTime: '2시간 50분',
        concentrateCount: 4,
      },
    },
  },
  {
    POST_INFO: {
      id: '7',
      isLiked: false,
      isBookmarked: false,
      USER_INFO: {
        id: '7',
        nickname: '예준',
        profileImage: profileImageSrc,
      },
      createdAt: '10시간 전',
      heartCount: 13,
      title: '사람은 많지만 이상하게 집중되는 분위기',
      content:
        '처음엔 조금 시끄러울까 걱정했는데 오히려 적당한 생활 소음 덕분에 더 몰입됐다. 주변에 혼자 작업하는 사람이 많아서 자연스럽게 나도 집중 모드로 들어가게 되는 느낌이다. 좌석 회전도 빠른 편이라 기다림 없이 앉을 수 있었던 것도 좋았다.',
      image: postImageSrc,
      tags: [
        { id: '7-1', name: '#사람많은' },
        { id: '7-2', name: '#집중되는' },
        { id: '7-3', name: '#카페' },
      ],
      PLACE_INFO: {
        id: '7',
        placeName: '브루클린 로스터스',
        studyDate: '2026년 4월 21일',
        studyTime: '2시간 15분',
        concentrateCount: 4,
      },
    },
  },
  {
    POST_INFO: {
      id: '8',
      isLiked: false,
      isBookmarked: false,
      USER_INFO: {
        id: '8',
        nickname: '가은',
        profileImage: profileImageSrc,
      },
      createdAt: '12시간 전',
      heartCount: 27,
      title: '팀플 준비하기 괜찮은 좌석 구성',
      content:
        '혼자 정리하는 시간도 좋았지만, 나중에 둘이 같이 와서 이야기 나누기에도 괜찮겠다는 생각이 들었다. 좌석 간 간섭이 심하지 않고, 테이블 폭이 넉넉해서 자료 펼쳐두기 편했다. 매장 조명이 너무 노랗지 않아서 눈이 덜 피로한 것도 만족 포인트.',
      image: postImageSrc,
      tags: [
        { id: '8-1', name: '#팀플' },
        { id: '8-2', name: '#좌석' },
        { id: '8-3', name: '#커먼테이블' },
      ],
      PLACE_INFO: {
        id: '8',
        placeName: '커먼테이블 을지로',
        studyDate: '2026년 4월 22일',
        studyTime: '3시간 25분',
        concentrateCount: 5,
      },
    },
  },
  {
    POST_INFO: {
      id: '9',
      isLiked: false,
      isBookmarked: false,
      USER_INFO: {
        id: '9',
        nickname: '현우',
        profileImage: profileImageSrc,
      },
      createdAt: '1일 전',
      heartCount: 19,
      title: '재방문 확정한 저녁 작업 장소',
      content:
        '저녁 시간대에 방문했는데 조명이 너무 어둡지 않아서 작업하기 편했다. 의외로 늦은 시간까지도 분위기가 안정적이었고, 직원 응대도 빠르고 친절해서 전반적인 경험이 좋았다. 특히 마감 전까지 와이파이가 안정적으로 유지돼서 화상 회의도 무리 없었다.',
      image: postImageSrc,
      tags: [
        { id: '9-1', name: '#저녁' },
        { id: '9-2', name: '#작업' },
        { id: '9-3', name: '#스터디카페' },
      ],
      PLACE_INFO: {
        id: '9',
        placeName: '문라이트 스터디카페',
        studyDate: '2026년 4월 22일',
        studyTime: '2시간 40분',
        concentrateCount: 4,
      },
    },
  },
  {
    POST_INFO: {
      id: '10',
      isLiked: false,
      isBookmarked: false,
      USER_INFO: {
        id: '10',
        nickname: '채원',
        profileImage: profileImageSrc,
      },
      createdAt: '1일 전',
      heartCount: 35,
      title: '창가 자리가 특히 좋았던 곳',
      content:
        '오후 햇빛이 비치는 시간대에 앉았는데 공간 분위기가 정말 좋아서 시작부터 만족스러웠다. 자리마다 간격이 적당하고 주변 소음도 낮아서 글쓰기나 기획 정리에 잘 맞았다. 커피 맛도 무난하게 괜찮아서 작업 공간으로 재사용하기 좋은 밸런스였다.',
      image: postImageSrc,
      tags: [
        { id: '10-1', name: '#창가자리' },
        { id: '10-2', name: '#오후' },
        { id: '10-3', name: '#카페' },
        { id: '10-4', name: '#작업카페' },
        { id: '10-5', name: '#채광좋음' },
      ],
      PLACE_INFO: {
        id: '10',
        placeName: '플로우 커피하우스',
        studyDate: '2026년 4월 23일',
        studyTime: '3시간',
        concentrateCount: 4,
      },
    },
  },
];

const MOCK_FEED_DATA = Array.from({ length: 3 }, (_, pageIndex) =>
  BASE_FEED_DATA.map((post, postIndex) => ({
    ...post,
    POST_INFO: {
      ...post.POST_INFO,
      id: String(pageIndex * BASE_FEED_DATA.length + postIndex + 1),
      createdAt:
        pageIndex === 0
          ? post.POST_INFO.createdAt
          : `${pageIndex + 1}페이지 · ${post.POST_INFO.createdAt}`,
      title:
        pageIndex === 0
          ? post.POST_INFO.title
          : `${post.POST_INFO.title} ${pageIndex + 1}`,
      PLACE_INFO: {
        ...post.POST_INFO.PLACE_INFO,
        id: String(pageIndex * BASE_FEED_DATA.length + postIndex + 1),
      },
    },
  })),
).flat();

async function fetchFeedPage(pageParam: number): Promise<FeedPage> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  // 강제로 네트워크 오류 발생시키기(테스트용)
  // if (pageParam === 1) {
  //   throw new Error('네트워크 오류 발생');
  // }

  const start = pageParam * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const items = MOCK_FEED_DATA.slice(start, end);

  return {
    items,
    nextPage: end < MOCK_FEED_DATA.length ? pageParam + 1 : undefined,
  };
}

export function useInfiniteFeedQuery() {
  return useInfiniteQuery({
    queryKey: FEED_QUERY_KEY,
    queryFn: ({ pageParam }) => fetchFeedPage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
