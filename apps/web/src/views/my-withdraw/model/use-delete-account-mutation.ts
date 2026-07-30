import { useRouter } from 'next/navigation';

import * as amplitude from '@amplitude/unified';
import { useToast } from '@plog/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { clientApi } from '@/shared/api/client-api';

import { type WithdrawReason } from './constants';

type DeleteAccountVariables = {
  reason: WithdrawReason;
  etcDetail: string;
};

export function useDeleteAccountMutation() {
  const router = useRouter();

  const { toast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: DeleteAccountVariables) => {
      await clientApi.delete<string>('/members/me');
      return variables;
    },
    onSuccess: ({ reason, etcDetail }) => {
      amplitude.track('account_deleted', {
        reason,
        ...(etcDetail && { reason_detail: etcDetail }),
      });
      queryClient.clear();
      toast({ type: 'success', description: '탈퇴가 완료되었어요.' });
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
