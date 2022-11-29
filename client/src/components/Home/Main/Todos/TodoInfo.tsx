import { Todo } from '../../../../types';
import { useUpdateTodo } from '../../../hooks/useUpdateTodo';
import styles from './todos.module.css';
export const TodoInfo = ({ todo }: { todo: Todo }) => {
  const { mutate, isLoading, isError, error } = useUpdateTodo();

  const handleComplete = () => {
    mutate({
      description: todo.description,
      projectId: todo.projectId || undefined,
      endsAt: todo.endsAt,
      todoId: todo.id,
      completed: true,
    });
  };
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
          onClick={handleComplete}
          className={styles.completedCheckbox}
        />
      </span>
    </div>
  );
};
