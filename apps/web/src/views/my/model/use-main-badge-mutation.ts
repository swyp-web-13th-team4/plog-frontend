import { useToast } from '@plog/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { mypageQueryKeys } from '@/entities/user';

import { clientApi } from '@/shared/api/client-api';

function setMainBadge(badgeId: number) {
  return clientApi.patch<string>(`/members/badge/main?badgeId=${badgeId}`);
}

function unsetMainBadge() {
  return clientApi.delete<string>('/members/badge/main');
}

export function useSetMainBadgeMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: setMainBadge,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: mypageQueryKeys.info() });
    },
    onError: () => {
      toast({
        type: 'error',
        description: '오류가 발생했어요. 다시 시도해 주세요.',
      });
    },
  });
}

export function useUnsetMainBadgeMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: unsetMainBadge,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: mypageQueryKeys.info() });
    },
    onError: () => {
      toast({
        type: 'error',
        description: '오류가 발생했어요. 다시 시도해 주세요.',
      });
    },
  });
}
