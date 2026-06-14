import { z } from 'zod';

import { profileFeedItemSchema } from '@/entities/feed/model/schemas';
import { mypageDataSchema } from '@/entities/user/model/schemas';

export const feedProfileViewResponseSchema = z.object({
  memberInfo: mypageDataSchema,
  posts: z.array(profileFeedItemSchema),
});

export type FeedProfileViewResponse = z.infer<
  typeof feedProfileViewResponseSchema
>;
