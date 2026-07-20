import ReviewItem, { type ReviewItemData } from './ReviewItem';

const MOCK_REVIEWS: ReviewItemData[] = [
  {
    reviewId: 1,
    nickname: '플로그 사용자',
    profileImageUrl: '/og-image.jpg',
    isAuthor: true,
    rating: 4,
    createdAt: '2026.07.20',
    environments: [
      {
        environmentName: 'spaceSize',
        title: '공간 크기',
        iconName: 'company-filled',
        label: '넓은 편이에요',
      },
      {
        environmentName: 'noiseLevel',
        title: '소음 수준',
        iconName: 'megaphone-filled',
        label: '조용한 편이에요',
      },
      {
        environmentName: 'congestionLevel',
        title: '혼잡도',
        iconName: 'smile-filled',
        label: '여유 있는 편이에요',
      },
      {
        environmentName: 'focusLevel',
        title: '집중도',
        iconName: 'fire-filled',
        label: '집중이 잘돼요',
      },
    ],
    content:
      '공간이 넓고 조용해서 오래 작업하기 좋았어요. 다음에도 다시 방문하고 싶어요.',
    imageUrls: [
      '/og-image.jpg',
      '/og-image.jpg',
      '/og-image.jpg',
      '/og-image.jpg',
    ],
  },
  {
    reviewId: 2,
    nickname: '집중하는 사람',
    profileImageUrl: '/og-image.jpg',
    isAuthor: false,
    rating: 5,
    createdAt: '2026.07.19',
    environments: [
      {
        environmentName: 'spaceSize',
        title: '공간 크기',
        iconName: 'company-filled',
        label: '적당해요',
      },
      {
        environmentName: 'noiseLevel',
        title: '소음 수준',
        iconName: 'megaphone-filled',
        label: '조용해요',
      },
      {
        environmentName: 'congestionLevel',
        title: '혼잡도',
        iconName: 'smile-filled',
        label: '보통이에요',
      },
      {
        environmentName: 'focusLevel',
        title: '집중도',
        iconName: 'fire-filled',
        label: '아주 좋아요',
      },
    ],
    content: '콘센트가 많고 좌석 간격도 넉넉해서 만족스러웠습니다.',
    imageUrls: [],
  },
];

export default function ReviewList() {
  return (
    <section aria-label="방문자 리뷰 목록">
      {MOCK_REVIEWS.map((review) => (
        <ReviewItem key={review.reviewId} review={review} />
      ))}
    </section>
  );
}
