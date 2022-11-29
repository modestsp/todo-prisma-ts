import { useMutation, useQueryClient } from '@tanstack/react-query';
import projectService from '../../services/project.service';

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { mutate, isError, error, isLoading, isSuccess } = useMutation({
    mutationFn: (projectId: string) => {
      return projectService.deleteProject(projectId);
    },
    onSuccess: () => {
      // console.log('Project deleted');
      queryClient.invalidateQueries(['projects']);
    },
  });

  return { mutate, isError, error, isLoading, isSuccess };
};
