import { useMutation, useQueryClient } from '@tanstack/react-query';
import todoService from '../../services/todo.service';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: (todoId: string) => {
      return todoService.deleteTodo(todoId);
    },
    onSuccess: () => {
      // console.log('Deleted succesfully');
      queryClient.invalidateQueries(['todos']);
      queryClient.invalidateQueries(['projects']);
    },
  });

  return { mutate, isLoading, isError, error, isSuccess };
};
