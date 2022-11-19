import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../App';
import { Todo } from '../../../../types';
import todoService from '../../../../services/todo.service';
import { DisplayTodo } from './DisplayTodo';
import projectService from '../../../../services/project.service';
import { useNavigate } from 'react-router-dom';
import { CreateTodoForm } from './CreateTodoForm';
import { useQuery } from '@tanstack/react-query';

export const Todos = () => {
  // const [todos, setTodos] = useState<Todo[] | []>([]);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  let userId = context?.currentUser?.id;

  const { isLoading, data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: todoService.getAllTodos,
  });
  // Tal vez guardar los todos en context
  // useEffect(() => {
  //   const getTodos = async () => {
  //     try {
  //       let userId = context?.currentUser?.id;
  //       if (userId && todos.length === 0) {
  //         console.log('TODOS ANTES DEL FETCHING', todos);
  //         const allTodos = await todoService.getAllTodos();
  //         const projects = await projectService.getProjects();
  //         console.log(projects);
  //         setTodos(allTodos);
  //         console.log(userId);
  //       }
  //     } catch (e: any) {
  //       console.log('ERROR', e);
  //       navigate('/auth/login');
  //     }
  //   };
  //   getTodos();
  // }, [userId]);
  // console.log(todos);
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
