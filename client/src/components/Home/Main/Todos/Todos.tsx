import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../App';
import { Link } from 'react-router-dom';
import { Todo } from '../../../../types';
import { DisplayTodo } from './DisplayTodo';
import userService from '../../../../services/user.service';

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const context = useContext(UserContext);
  let userId = context?.currentUser?.id;
  useEffect(() => {
    const getTodos = async () => {
      let userId = context?.currentUser?.id;
      if (userId) {
        const allTodos = await userService.getAllTodos();
        setTodos(allTodos);
        console.log('TODOS', todos);
        console.log(userId);
      } else {
        console.log('No toods');
      }
    };
    getTodos();
  }, [userId]);
  console.log(todos);
  return (
    <ul>
      {todos ? (
        todos.map((todo: Todo) => {
          return <DisplayTodo key={todo.id} todo={todo} />;
        })
      ) : (
        <p>Loading</p>
      )}
      ;
    </ul>
  );
};
