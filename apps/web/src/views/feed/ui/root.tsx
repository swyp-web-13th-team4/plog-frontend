'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Avatar, useToast } from '@plog/ui';

import ClockIcon from '@/shared/assets/icons/clock.svg';
import ConcentrateIcon from '@/shared/assets/icons/concentrate.svg';
import CopyLinkIcon from '@/shared/assets/icons/copy_link.svg';
import EmptyBookmarkIcon from '@/shared/assets/icons/empty_bookmark.svg';
import EmptyHeartIcon from '@/shared/assets/icons/empty_heart.svg';
import FillBookmarkIcon from '@/shared/assets/icons/fill_bookmark.svg';
import FillHeartIcon from '@/shared/assets/icons/fill_heart.svg';
import ShareIcon from '@/shared/assets/icons/share.svg';
import postImage from '@/shared/assets/images/image.png';
import profileImage from '@/shared/assets/images/profileImage.png';

const profileImageSrc = profileImage.src;
const postImageSrc = postImage.src;

const MOCK_DATA = [
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
      content:
        '노트북이랑 태블릿을 같이 써야 해서 콘센트 위치가 중요한 날이었는데, 이곳은 거의 모든 좌석에서 전원 연결이 쉬웠다. 의자가 너무 푹신하지 않아서 오히려 오래 앉아 있기 좋았고, 음료 나오는 속도도 빨라서 바로 작업 시작할 수 있었다.',
      image: postImageSrc,
      PLACE_INFO: {
        id: '4',
        placeName: '워크룸 성수',
        studyDate: '2026년 4월 19일',
        studyTime: '4시간 5분',
        concentrateCount: 6,
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
      PLACE_INFO: {
        id: '5',
        placeName: '카페 모먼트',
        studyDate: '2026년 4월 20일',
        studyTime: '1시간 20분',
        concentrateCount: 232,
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
      PLACE_INFO: {
        id: '6',
        placeName: '라이트업 커피',
        studyDate: '2026년 4월 21일',
        studyTime: '2시간 50분',
        concentrateCount: 231235,
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
      PLACE_INFO: {
        id: '7',
        placeName: '브루클린 로스터스',
        studyDate: '2026년 4월 21일',
        studyTime: '2시간 15분',
        concentrateCount: 231224,
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
      PLACE_INFO: {
        id: '10',
        placeName: '플로우 커피하우스',
        studyDate: '2026년 4월 23일',
        studyTime: '3시간',
        concentrateCount: 123215,
      },
    },
  },
];

export default function FeedPage() {
  const [posts, setPosts] = useState(MOCK_DATA);
  const { toast } = useToast();

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.POST_INFO.id === postId
          ? {
              ...post,
              POST_INFO: {
                ...post.POST_INFO,
                isLiked: !post.POST_INFO.isLiked,
              },
            }
          : post,
      ),
    );
  };

  const toggleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.POST_INFO.id === postId
          ? {
              ...post,
              POST_INFO: {
                ...post.POST_INFO,
                isBookmarked: !post.POST_INFO.isBookmarked,
              },
            }
          : post,
      ),
    );
  };

  return (
    <section>
      {posts.map((data) => (
        <div key={data.POST_INFO.id} className="mb-13.5">
          {/* 유저정보 */}
          <div className="flex items-center gap-3 px-6 py-3">
            <Avatar
              size="xsmall"
              src={data.POST_INFO.USER_INFO.profileImage}
              alt={`${data.POST_INFO.USER_INFO.nickname}의 프로필 이미지`}
            />
            <div className="flex flex-col gap-1">
              <span className="label-lg text-semantic-object-boldest">
                {data.POST_INFO.USER_INFO.nickname}
              </span>
              <span className="caption-md text-semantic-object-normal">
                {data.POST_INFO.createdAt}
              </span>
            </div>
          </div>
          {/* 게시글 정보 */}
          <div className="flex flex-col">
            {/* 게시글 이미지*/}
            <Image
              width={480}
              height={480}
              loading="eager"
              src={data.POST_INFO.image}
              alt={`${data.POST_INFO.title} 이미지`}
            />
            {/* 게시글 정보 */}
            <div className="flex flex-col gap-2.5 px-6 pt-3">
              {/* 좋아요 + 좋아요 카운트 / 북마크 + 공유버튼 아이콘 */}
              <div className="flex justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    className="cursor-pointer"
                    onClick={() => toggleLike(data.POST_INFO.id)}
                  >
                    {data.POST_INFO.isLiked ? (
                      <FillHeartIcon />
                    ) : (
                      <EmptyHeartIcon />
                    )}
                  </button>
                  <span className="caption-md text-semantic-object-normal">
                    {data.POST_INFO.heartCount < 1000
                      ? data.POST_INFO.heartCount
                      : '999+'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="cursor-pointer"
                    onClick={() => toggleBookmark(data.POST_INFO.id)}
                  >
                    {data.POST_INFO.isBookmarked ? (
                      <FillBookmarkIcon />
                    ) : (
                      <EmptyBookmarkIcon />
                    )}
                  </button>
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      toast({
                        icon: <CopyLinkIcon />,
                        description: '링크가 복사되었습니다.',
                      })
                    }
                  >
                    <ShareIcon />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {/* 게시글 제목 + 게시글 내용 */}
                <div>
                  <span className="title-xs text-semantic-object-boldest">
                    {data.POST_INFO.title}
                  </span>
                  <p className="body-sm text-semantic-object-normal">
                    {data.POST_INFO.content}
                  </p>
                </div>
                {/* 장소 정보  */}
                <div className="flex justify-between rounded-xl border border-semantic-stroke-subtle p-6">
                  {/* 장소 + 공부시간 + 집중도 */}
                  <div className="flex flex-col gap-1.5">
                    <span className="label-md text-semantic-object-bold">
                      {data.POST_INFO.PLACE_INFO.placeName}
                    </span>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-1.5">
                        <ClockIcon />
                        <p className="caption-md text-semantic-object-normal">
                          {data.POST_INFO.PLACE_INFO.studyTime}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ConcentrateIcon />
                        <p className="caption-md text-semantic-object-normal">
                          {data.POST_INFO.PLACE_INFO.concentrateCount}/5
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* 날짜 */}
                  <span className="caption-md text-semantic-object-subtle">
                    {data.POST_INFO.PLACE_INFO.studyDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
