import { Request, Response } from 'express';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../services/user.service';
import { omit } from 'lodash';
import logger from '../utils/logger';

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);
    const safeUser = omit(user, 'password');
    return res.status(201).send(safeUser);
  } catch (e: any) {
    logger.error(e);
    // 409 because we assume that some of the inputs are not unique
    return res.status(409).send(e.message);
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  return res.send(res.locals.user);
};
