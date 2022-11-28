import { useMutation, useQueryClient } from '@tanstack/react-query';
import todoService from '../../services/todo.service';
import { UpdateTodoInput } from '../../types';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (input: UpdateTodoInput) => {
      return todoService.updateTodo({ input });
    },
    onSuccess: () => {
      console.log('Todo Updated');
      queryClient.invalidateQueries(['todos']);
      queryClient.invalidateQueries(['projects']);
    },
  });
  return { mutate, isLoading, isError, error };
};
