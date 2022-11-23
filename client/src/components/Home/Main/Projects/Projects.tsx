import { Project } from '../../../../types';
import { DisplayProject } from './DisplayProject';
import { useGetProjects } from '../../../hooks/useGetProjects';
import { CreateProjectForm } from './CreateProjectForm';
import styles from './projects.module.css';
import { useState } from 'react';
import { Modal } from '../../Modal';
import { motion, AnimatePresence } from 'framer-motion';
export const Projects = () => {
  const { data: projects, isError, error, isLoading } = useGetProjects();
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <div className={styles.projectsContainer}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => (modalOpen ? close() : open())}
      >
        Create Project
      </motion.button>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && (
          <Modal handleClose={close}>
            <CreateProjectForm
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          </Modal>
        )}
      </AnimatePresence>
      {!isLoading ? (
        projects.map((project: Project) => {
          return <DisplayProject key={project.id} project={project} />;
        })
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};
