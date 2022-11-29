import { useMutation, useQueryClient } from '@tanstack/react-query';
import projectService from '../../services/project.service';
import { UpdateProjectInput } from '../../types';

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (input: UpdateProjectInput) => {
      console.log('input', input);
      return projectService.updateProject({ input });
    },
    onSuccess: () => {
      // console.log('Project Updated');
      queryClient.invalidateQueries(['todos']);
      queryClient.invalidateQueries(['projects']);
    },
  });
  return { mutate, isLoading, isError, error };
};
