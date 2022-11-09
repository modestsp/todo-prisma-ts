import { Request, Response } from 'express';
import { CreateTodoInput } from '../schema/todo.schema';
import { createTodo } from '../services/todo.service';
import logger from '../utils/logger';

export const createTodoHandler = async (
  req: Request<{}, {}, CreateTodoInput>,
  res: Response
) => {
  const currentUser = res.locals.user;
  try {
    const todo = await createTodo(req.body, currentUser.id);
    return res.send(todo);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
};
