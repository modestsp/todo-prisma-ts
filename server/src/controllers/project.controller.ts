import { User } from '@prisma/client';
import { Request, Response } from 'express';
import {
  CreateProjectInput,
  DeleteProjectInput,
  UpdateProjectInput,
} from '../schema/project.schema';
import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from '../services/project.service';
import logger from '../utils/logger';

export const createProjectHandler = async (
  req: Request<{}, {}, CreateProjectInput>,
  res: Response
) => {
  try {
    const currentUser: User = res.locals.user;
    const newProject = await createProject(req.body, currentUser.id);
    return res.status(201).send(newProject);
  } catch (e: any) {
    return res.status(400).send({ error: 'Unauthorized' });
  }
};

export const getAllProjectsHandler = async (req: Request, res: Response) => {
  try {
    const currentUser: User = res.locals.user;
    if (currentUser) {
      const projects = await getAllProjects(currentUser.id);
      return res.status(200).send(projects);
    }
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send([]);
  }
};

export const deleteProjectHandler = async (
  req: Request<{}, {}, DeleteProjectInput>,
  res: Response
) => {
  try {
    const { projectId } = req.body;
    const projectDeleted = await deleteProject({ projectId });
    return res.status(200).send(projectDeleted);
  } catch (e: any) {
    return res
      .status(404)
      .send({ error: 'Project not found or already deleted' });
  }
};

export const updateProjectHandler = async (
  req: Request<{}, {}, UpdateProjectInput>,
  res: Response
) => {
  try {
    const { projectId, title, endsAt } = req.body;
    const updatedProject = await updateProject({ projectId, title, endsAt });
    return res.status(200).send(updatedProject);
  } catch (e: any) {
    throw new Error(e.message);
  }
};
