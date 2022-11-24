import { useState } from 'react';
import { Project } from '../../../../types';
import { useDeleteProject } from '../../../hooks/useDeleteProject';
import styles from './projects.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { CreateTodoForm } from '../Todos/CreateTodoForm';
import { Modal } from '../../Modal';
import { DisplayTodo } from '../Todos/DisplayTodo';

export const DisplayProject = ({ project }: { project: Project }) => {
  const { mutate, isError, error, isLoading } = useDeleteProject();
  const [modalOpen, setModalOpen] = useState(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      mutate(project.id);
    } else {
      console.log('Cancelled');
    }
  };

  return (
    <div>
      {!isLoading ? (
        <div className={styles.projectCard}>
          {/* PROJECT HEADER */}
          <motion.header
            initial={false}
            className={expanded ? styles.accordionOpen : styles.accordionClosed}
            onClick={() => setExpanded(expanded ? false : true)}
          >
            {project.title}
            <button>Update Project</button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => (modalOpen ? close() : open())}
            >
              Add todo
            </motion.button>
            <AnimatePresence
              initial={false}
              mode="wait"
              onExitComplete={() => null}
            >
              {modalOpen && (
                <Modal handleClose={close}>
                  <CreateTodoForm projectId={project.id} />
                </Modal>
              )}
            </AnimatePresence>
            <button onClick={handleDelete}>Delete</button>
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
                  open: { opacity: 1, height: 'auto' },
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
        <p>Deleting!</p>
      )}
    </div>
  );
};
