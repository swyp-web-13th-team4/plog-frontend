import { useRouter } from 'next/navigation';

import { useToast } from '@plog/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { clientApi } from '@/shared/api/client-api';

const logout = () => clientApi.post<string>('/members/logout');

export function useLogoutMutation() {
  const router = useRouter();

  const { toast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      toast({ type: 'success', description: '로그아웃되었어요.' });
      router.push('/login');
    },
    onError: () => {
      toast({
        type: 'error',
        description: '오류가 발생했어요. 다시 시도해 주세요.',
      });
    },
  });
}
