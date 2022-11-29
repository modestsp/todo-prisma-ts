import { useMutation } from '@tanstack/react-query';
import { CreateTodoInput } from '../../types';
import todoService from '../../services/todo.service';
import { useQueryClient } from '@tanstack/react-query';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, isError, data, mutate } = useMutation({
    mutationFn: ({
      input,
      userId,
      projectId,
    }: {
      input: CreateTodoInput;
      userId: string;
      projectId?: string;
    }) => {
      return todoService.createTodo(input, userId, projectId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      queryClient.invalidateQueries(['projects']);
    },
  });

  return { isLoading, error, isError, data, mutate };
};
