import { useQuery } from '@tanstack/react-query';
import projectService from '../../services/project.service';

export const useGetProjects = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getProjects,
    onSuccess: () => {
      // console.log('Projects completed');
    },
  });

  return { isLoading, data, isError, error };
};
