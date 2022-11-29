import { Todo } from '../../../../types';
import styles from './todos.module.css';
import { useDeleteTodo } from '../../../hooks/useDeleteTodo';
import { TodoInfo } from './TodoInfo';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { UpdateTodoForm } from './UpdateTodo';
import { Modal } from '../../../utils/Modal';
import deleteIcon from '../../../../assets/deleteIcon.svg';
import editIcon from '../../../../assets/editIcon.svg';
import { Loader } from '../../../utils/Loader';

const style = {
  borderColor: 'black transparent black transparent',
  width: '25px',
  height: '25px',
};

export const DisplayTodo = ({
  todo,
  projectId,
}: {
  todo: Todo;
  projectId?: string;
}) => {
  const { mutate, isError, isLoading, error, isSuccess } = useDeleteTodo();
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      mutate(todo.id);
    } else {
      console.log('Cancelled');
    }
  };

  return (
    <article className={styles.todoCard}>
      {!isLoading && !isSuccess ? (
        <div className={styles.todoInfoContainer}>
          <TodoInfo todo={todo} />
          {/* Update Todo Button */}
          <img
            src={editIcon}
            alt="edit todo"
            className={styles.editIcon}
            onClick={() => (modalOpen ? close() : open())}
          />
          <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={() => null}
          >
            {modalOpen && (
              <Modal handleClose={close}>
                <UpdateTodoForm
                  todo={todo}
                  projectId={projectId}
                  handleClose={close}
                />
              </Modal>
            )}
          </AnimatePresence>
          {/* Delete Todo Button */}
          <img
            src={deleteIcon}
            alt="delete todo"
            className={styles.deleteIcon}
            onClick={handleDelete}
          />
        </div>
      ) : (
        <div className={styles.loaderContainer}>
          <Loader style={style} />
          <p className={styles.deleteMessage}>Deleting...</p>
        </div>
      )}
    </article>
  );
};
