import { Project } from '../../../../types';
export const DisplayProject = ({ project }: { project: Project }) => {
  return <li>{project.title}</li>;
};
