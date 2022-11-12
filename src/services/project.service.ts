import { User } from '@prisma/client';
import { CreateProjectSchema } from '../schema/project.schema';
import { db } from '../utils/db.server';

export const createProject = async (
  input: CreateProjectSchema,
  userId: User['id']
) => {
  try {
    const { title, endsAt } = input;
    const newProject = await db.project.create({
      data: {
        title,
        endsAt: new Date(endsAt),
        creatorId: userId,
      },
    });
    return newProject;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getAllProjects = async (userId: User['id']) => {
  try {
    const projects = await db.project.findMany({
      where: {
        creatorId: userId,
      },
    });
    return projects;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
