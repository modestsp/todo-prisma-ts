import { useMutation, useQueryClient } from '@tanstack/react-query';
import todoService from '../../services/todo.service';
import { UpdateProjectInput } from '../../types';

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (input: UpdateProjectInput) => {
      return todoService.updateTodo({ input });
    },
    onSuccess: () => {
      console.log('Project Updated');
      queryClient.invalidateQueries(['todos']);
      queryClient.invalidateQueries(['projects']);
    },
  });
  return { mutate, isLoading, isError, error };
};
