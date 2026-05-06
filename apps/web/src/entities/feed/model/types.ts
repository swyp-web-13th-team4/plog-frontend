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
    image: string[];
    tags: FeedTag[];
    PLACE_INFO: {
      id: string;
      placeName: string;
      studyDate: string;
      studyTime: string;
      concentrateCount: number;
<<<<<<< HEAD
      roadAddress?: string;
      category?: string;
=======
>>>>>>> dev
    };
  };
};

export type FeedPage = {
  items: FeedPost[];
  nextPage: number | undefined;
};
