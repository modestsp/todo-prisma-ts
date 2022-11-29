import { useState } from 'react';
import { Project } from '../../../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { CreateTodoForm } from '../Todos/CreateTodoForm';
import { Modal } from '../../../utils/Modal';
import { DisplayTodo } from '../Todos/DisplayTodo';
import { UpdateProjectForm } from './UpdateProjectForm';
import { Loader } from '../../../utils/Loader';
import { useUpdateProject } from '../../../hooks/useUpdateProject';
import { useDeleteProject } from '../../../hooks/useDeleteProject';
import editIcon from '../../../../assets/editIcon.svg';
import deleteIcon from '../../../../assets/deleteIcon.svg';
import doneIcon from '../../../../assets/done.svg';
import addTodoIcon from '../../../../assets/add-todo-icon.svg';
import styles from './projects.module.css';

const style = {
  borderColor: 'black transparent black transparent',
  width: '25px',
  height: '25px',
};

export const DisplayProject = ({ project }: { project: Project }) => {
  const { mutate, isError, error, isLoading, isSuccess } = useDeleteProject();
  const { mutate: update } = useUpdateProject();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  const close = () => setModalOpen(false);

  const handleComplete = (e: any) => {
    e.stopPropagation();
    if (window.confirm('Are you sure?')) {
      update({
        title: project.title,
        projectId: project.id,
        completed: true,
        endsAt: project.endsAt,
      });
    } else {
      console.log('Cancelled');
    }
  };

  const closeUpdateModal = (e?: any) => {
    e.stopPropagation();
    setModalUpdate(false);
  };

  const openUpdateModal = () => {
    setModalUpdate(true);
  };

  const open = () => setModalOpen(true);

  const handleDelete = (e?: any) => {
    e.stopPropagation();
    if (window.confirm('Are you sure?')) {
      mutate(project.id);
    } else {
      console.log('Cancelled');
    }
  };

  const handleAddTodoModal = (e: any) => {
    e.stopPropagation();
    modalOpen ? close() : open();
  };

  const handleUpdateModal = (e: any) => {
    e.stopPropagation();
    modalUpdate ? closeUpdateModal() : openUpdateModal();
  };

  return !isLoading && !isSuccess ? (
    <div className={styles.projectCard}>
      {/* PROJECT HEADER */}
      <motion.header
        initial={false}
        className={expanded ? styles.accordionOpen : styles.accordionClosed}
        onClick={() => setExpanded(expanded ? false : true)}
      >
        <p className={styles.projectTitle}>{project.title}</p>

        <img
          src={doneIcon}
          alt="set as completed"
          className={styles.doneIcon}
          onClick={handleComplete}
        />

        {/* Update Todo Button */}
        <img
          src={editIcon}
          alt="edit todo"
          className={styles.editIcon}
          onClick={handleUpdateModal}
        />
        <AnimatePresence
          initial={false}
          mode="wait"
          onExitComplete={() => null}
        >
          {modalUpdate && (
            <Modal handleClose={closeUpdateModal}>
              <UpdateProjectForm
                projectId={project.id}
                handleClose={() => setModalUpdate(false)}
              />
            </Modal>
          )}
        </AnimatePresence>

        {/* Add Todo Button */}
        <img
          src={addTodoIcon}
          alt="add a todo"
          className={styles.addTodoIcon}
          onClick={handleAddTodoModal}
        />
        <AnimatePresence
          initial={false}
          mode="wait"
          onExitComplete={() => null}
        >
          {modalOpen && (
            <Modal handleClose={close}>
              <CreateTodoForm projectId={project.id} handleClose={close} />
            </Modal>
          )}
        </AnimatePresence>
        {/* Delete Button */}
        <img
          src={deleteIcon}
          alt="delete todo"
          className={styles.deleteIcon}
          onClick={handleDelete}
        />
      </motion.header>
      {/* TODOS LIST */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {
                opacity: 1,
                height: 'auto',
              },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            className={styles.todoList}
          >
            <div>
              {project.todos?.map((todo) => {
                return (
                  <DisplayTodo
                    key={todo.id}
                    todo={todo}
                    projectId={project.id}
                  />
                );
              })}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  ) : (
    <div className={styles.loaderContainer}>
      <Loader style={style} />
      <p className={styles.deleteMessage}>Deleting...</p>
    </div>
  );
};
