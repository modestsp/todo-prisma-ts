import { Todo } from '../../../../types';
import styles from './todos.module.css';
export const TodoInfo = ({ todo }: { todo: Todo }) => {
  return (
    <div className={styles.todoInfo}>
      <span>
        <p className={styles.todoInfoTitle}>Description</p>
        <p className={styles.todoInfoContent}>{todo.description}</p>
      </span>
      <span>
        <p className={styles.todoInfoTitle}>End Date</p>
        <p className={styles.todoInfoContent}>{todo.endsAt.substring(0, 10)}</p>
      </span>
      <span>
        <p className={styles.todoInfoTitle}>Completed</p>
        <input
          type="checkbox"
          onClick={() => console.log('Completed')}
          className={styles.completedCheckbox}
        />
      </span>
    </div>
  );
};
