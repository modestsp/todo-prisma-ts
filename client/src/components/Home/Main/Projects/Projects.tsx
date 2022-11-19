import { Project } from '../../../../types';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../../App';
import projectService from '../../../../services/project.service';
import { DisplayProject } from './DisplayProject';
import { useNavigate } from 'react-router-dom';

export const Projects = () => {
  const [projects, setProjects] = useState<Project[] | []>([]);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  let userId = context?.currentUser?.id;

  // Tal vez guardar los todos en context
  useEffect(() => {
    const getTodos = async () => {
      try {
        let userId = context?.currentUser?.id;
        if (userId && projects.length === 0) {
          console.log('projects ANTES DEL FETCHING', projects);

          const AllProjects = await projectService.getProjects();
          console.log(projects);
          setProjects(AllProjects);
          console.log(userId);
        }
      } catch (e: any) {
        console.log(e);
        navigate('/auth/login');
      }
    };
    getTodos();
  }, [userId]);
  console.log(projects);
  return (
    <ul>
      {projects ? (
        projects.map((project: Project) => {
          return <DisplayProject key={project.id} project={project} />;
        })
      ) : (
        <p>Loading</p>
      )}
    </ul>
  );
};
