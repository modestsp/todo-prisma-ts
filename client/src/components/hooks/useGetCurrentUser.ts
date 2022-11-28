import { useQuery } from '@tanstack/react-query';
import userService from '../../services/user.service';

export const useGetCurrentUser = () => {
  const { isLoading, data, isError, error, isLoadingError, isSuccess } =
    useQuery({
      queryKey: ['currentUser'],
      queryFn: userService.getCurrentUser,
      onSuccess: () => {
        console.log('Fetching completed');
      },
      refetchInterval: 900000,
    });

  return { isLoading, data, isError, error, isSuccess, isLoadingError };
};
