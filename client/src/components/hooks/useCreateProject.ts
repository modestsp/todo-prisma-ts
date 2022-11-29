import { useMutation, useQueryClient } from '@tanstack/react-query';
import projectService from '../../services/project.service';
import { CreateProjectInput } from '../../types';

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error, isError } = useMutation({
    mutationFn: ({
      input,
      userId,
    }: {
      input: CreateProjectInput;
      userId: string;
    }) => {
      return projectService.createProject(input, userId);
    },
    onSuccess: () => {
      // console.log('Project created');
      queryClient.invalidateQueries(['projects']);
    },
  });

  return { mutate, isError, error, isLoading };
};
