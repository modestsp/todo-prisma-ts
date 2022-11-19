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
    }: {
      input: CreateTodoInput;
      userId: string;
    }) => {
      return todoService.createTodo(input, userId);
    },
    onSuccess: () => {
      console.log('Created Todo');
      queryClient.invalidateQueries(['todos']);
    },
  });

  return { isLoading, error, isError, data, mutate };
};
