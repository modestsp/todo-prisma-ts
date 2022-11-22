import { useMutation, useQueryClient } from '@tanstack/react-query';
import projectService from '../../services/project.service';

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { mutate, isError, error, isLoading } = useMutation({
    mutationFn: (projectId: string) => {
      return projectService.deleteProject(projectId);
    },
    onSuccess: () => {
      console.log('Project deleted');
      queryClient.invalidateQueries();
    },
  });

  return { mutate, isError, error, isLoading };
};