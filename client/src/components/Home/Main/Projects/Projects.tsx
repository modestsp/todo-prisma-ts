import { Project } from '../../../../types';
import { DisplayProject } from './DisplayProject';
import { useGetProjects } from '../../../hooks/useGetProjects';
import { CreateProjectForm } from './CreateProjectForm';
import styles from './projects.module.css';
import { useState } from 'react';
import { Modal } from '../../../utils/Modal';
import { AnimatePresence } from 'framer-motion';
import addIcon from '../../../../assets/addIcon.svg';
import { Loader } from '../../../utils/Loader';

const style = {
  marginTop: '10rem',
};

export const Projects = () => {
  const { data: projects, isLoading } = useGetProjects();
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return !isLoading ? (
    <div className={styles.projectsContainer}>
      {/* Create Project Button */}
      <img
        src={addIcon}
        alt="edit todo"
        className={styles.createProjectButton}
        onClick={() => (modalOpen ? close() : open())}
      />
      {/* Modal Form Create Project */}
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && (
          <Modal handleClose={close}>
            <CreateProjectForm handleClose={close} />
          </Modal>
        )}
      </AnimatePresence>

      {projects.map((project: Project) => {
        return <DisplayProject key={project.id} project={project} />;
      })}
    </div>
  ) : (
    <Loader style={style} />
  );
};
