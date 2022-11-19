import { Todo } from '../../../../types';
import todoService from '../../../../services/todo.service';
import { DisplayTodo } from './DisplayTodo';
import { CreateTodoForm } from './CreateTodoForm';
import { useQuery } from '@tanstack/react-query';

export const Todos = () => {
  const { isLoading, data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: todoService.getAllTodos,
  });

  return (
    <ul>
      <button>Create a todo</button>

      {!isLoading ? (
        todos!.map((todo: Todo) => {
          return <DisplayTodo key={todo.id} todo={todo} />;
        })
      ) : (
        <p>Loading</p>
      )}
      <CreateTodoForm />
    </ul>
  );
};
