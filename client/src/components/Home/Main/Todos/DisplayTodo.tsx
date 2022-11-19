import { Todo } from '../../../../types';
import styles from './todos.module.css';

export const DisplayTodo = ({ todo }: { todo: Todo }) => {
  return (
    <li className={styles.todoCard}>
      <p>Description</p>
      {todo.description} | {todo.endsAt}
    </li>
  );
};
