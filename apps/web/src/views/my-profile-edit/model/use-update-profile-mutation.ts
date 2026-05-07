import { useToast } from '@plog/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type ProfileFormData } from '@/widgets/profile-form';

import { mypageQueryKeys, updateProfile } from '@/entities/user';

type Options = {
  onSuccess: () => void;
};

export function useUpdateProfileMutation({ onSuccess }: Options) {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ nickname, introduction, imageOption }: ProfileFormData) =>
      updateProfile(
        { nickname, introduction: introduction || undefined },
        imageOption,
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: mypageQueryKeys.info });
      toast({ type: 'success', description: '프로필이 수정되었어요.' });
      onSuccess();
    },
    onError: () => {
      toast({
        type: 'error',
        description: '오류가 발생했어요. 다시 시도해 주세요.',
      });
    },
  });
}
