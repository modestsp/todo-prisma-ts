import { Todo } from '../../../../types';
import styles from './todos.module.css';
export const TodoInfo = ({ todo }: { todo: Todo }) => {
  return (
    <div className={styles.todoInfo}>
      <span>
        <p className={styles.todoInfoTitle}>Description</p>
        <p>{todo.description}</p>
      </span>
      <span>
        <p className={styles.todoInfoTitle}>End Date</p>
        <p>{todo.endsAt}</p>
      </span>
      <span>
        <p className={styles.todoInfoTitle}>Completed</p>
        <input type="checkbox" />
      </span>
    </div>
  );
};
