import { Todo } from '../../../../types';
import todoService from '../../../../services/todo.service';
import { DisplayTodo } from './DisplayTodo';
import { CreateTodoForm } from './CreateTodoForm';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '../../../utils/Modal';
import addIcon from '../../../../assets/addIcon.svg';
import { UpdateTodoForm } from './UpdateTodo';
import styles from './todos.module.css';
import { Loader } from '../../../utils/Loader';

const style = {
  marginTop: '10rem',
};

export const Todos = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { isLoading, data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: todoService.getAllTodos,
  });
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return !isLoading ? (
    <div className={styles.todosContainer}>
      <img
        src={addIcon}
        alt="edit todo"
        className={styles.createTodoButton}
        onClick={() => (modalOpen ? close() : open())}
      />

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && (
          <Modal handleClose={close}>
            <CreateTodoForm handleClose={close} />
          </Modal>
        )}
      </AnimatePresence>

      {todos!.map((todo: Todo) => {
        return (
          <div key={todo.id}>
            <DisplayTodo todo={todo} />
          </div>
        );
      })}
    </div>
  ) : (
    <Loader style={style} />
  );
};
