import { Project } from '../../../../types';
import { DisplayProject } from './DisplayProject';
import { useGetProjects } from '../../../hooks/useGetProjects';

export const Projects = () => {
  const { data: projects, isError, error, isLoading } = useGetProjects();

  console.log(projects);
  return (
    <ul>
      {!isLoading ? (
        projects.map((project: Project) => {
          return <DisplayProject key={project.id} project={project} />;
        })
      ) : (
        <p>Loading</p>
      )}
    </ul>
  );
};
