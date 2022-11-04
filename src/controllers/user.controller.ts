import { Request, Response } from 'express';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../services/user.service';
import logger from '../utils/logger';

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);
    return res.json(user);
  } catch (e: any) {
    logger.error(e);
    // 409 because we assum that some of the inputs are not unique
    return res.status(409).send(e.message);
  }
};
