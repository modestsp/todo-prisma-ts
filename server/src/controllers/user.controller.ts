import { NextFunction, Request, Response } from 'express';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../services/user.service';
import { omit } from 'lodash';
import { Prisma } from '@prisma/client';
import logger from '../utils/logger';

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req.body);
    const safeUser = omit(user, 'password');
    return res.status(201).send(safeUser);
  } catch (e: any) {
    next(e);
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  return res.send(res.locals.user);
};
