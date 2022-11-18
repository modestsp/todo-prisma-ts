import { Todo } from '../../../../types';
import styles from './todos.module.css';

export const DisplayTodo = ({ todo }: { todo: Todo }) => {
  console.log('TODO', todo);
  return <li className={styles.todoCard}>{todo.description}</li>;
};
