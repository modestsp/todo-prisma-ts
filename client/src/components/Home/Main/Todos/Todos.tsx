import { Todo } from '../../../../types';
import todoService from '../../../../services/todo.service';
import { DisplayTodo } from './DisplayTodo';
import { CreateTodoForm } from './CreateTodoForm';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '../../Modal';
import { UpdateTodoForm } from './UpdateTodo';
import styles from './todos.module.css';

export const Todos = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { isLoading, data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: todoService.getAllTodos,
  });

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => (modalOpen ? close() : open())}
      >
        Create todo
      </motion.button>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && (
          <Modal handleClose={close}>
            <CreateTodoForm />
          </Modal>
        )}
      </AnimatePresence>

      {!isLoading ? (
        todos!.map((todo: Todo) => {
          return (
            <div key={todo.id}>
              <DisplayTodo todo={todo} />
            </div>
          );
        })
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};
