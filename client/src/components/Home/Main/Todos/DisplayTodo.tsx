import { Todo } from '../../../../types';
import styles from './todos.module.css';
import { useDeleteTodo } from '../../../hooks/useDeleteTodo';

export const DisplayTodo = ({ todo }: { todo: Todo }) => {
  const { mutate, isError, isLoading, error, isSuccess } = useDeleteTodo();
  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      mutate(todo.id);
    } else {
      console.log('Cancelled');
    }
  };
  return (
    <li className={styles.todoCard}>
      {!isLoading ? (
        <div>
          {' '}
          <p>Description</p>
          {todo.description} | {todo.endsAt}
          <button onClick={handleDelete}>Remove Todo</button>
        </div>
      ) : (
        <p>Deleting</p>
      )}
    </li>
  );
};
