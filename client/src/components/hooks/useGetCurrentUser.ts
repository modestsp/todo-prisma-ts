import { useQuery } from '@tanstack/react-query';
import userService from '../../services/user.service';

export const useGetCurrentUser = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: userService.getCurrentUser,
    onSuccess: () => {
      console.log('Fetching completed');
    },
  });

  return { isLoading, data, isError, error };
};
