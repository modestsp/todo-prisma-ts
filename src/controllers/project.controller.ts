import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { CreateProjectSchema } from '../schema/project.schema';
import { createProject, getAllProjects } from '../services/project.service';

export const createProjectHandler = async (
  req: Request<{}, {}, CreateProjectSchema>,
  res: Response
) => {
  try {
    const currentUser: User = res.locals.user;
    const newProject = await createProject(req.body, currentUser.id);
    return res.status(201).send(newProject);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getAllProjectsHandler = async (req: Request, res: Response) => {
  try {
    const currentUser: User = res.locals.user;
    const projects = await getAllProjects(currentUser.id);
    return res.status(200).send(projects);
  } catch (e: any) {
    throw new Error(e.message);
  }
};
