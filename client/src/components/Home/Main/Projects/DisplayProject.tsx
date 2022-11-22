import { Project } from '../../../../types';
import { useDeleteProject } from '../../../hooks/useDeleteProject';
import styles from './projects.module.css';
export const DisplayProject = ({ project }: { project: Project }) => {
  const { mutate, isError, error, isLoading } = useDeleteProject();
  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      mutate(project.id);
    } else {
      console.log('Cancelled');
    }
  };
  return (
    <li>
      {!isLoading ? (
        <div className={styles.projectCard}>
          Title:{project.title} <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <p>Deleting!</p>
      )}
    </li>
  );
};
