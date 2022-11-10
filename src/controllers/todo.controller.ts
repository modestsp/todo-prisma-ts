import { Request, Response } from 'express';
import { CreateTodoInput } from '../schema/todo.schema';
import { createTodo, getAllTodos } from '../services/todo.service';
import logger from '../utils/logger';
import { User } from '@prisma/client';

export const createTodoHandler = async (
  req: Request<{}, {}, CreateTodoInput>,
  res: Response
) => {
  const currentUser: Omit<User, 'password'> = res.locals.user;
  try {
    const todo = await createTodo(req.body, currentUser.id);
    return res.send(todo);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
};

export const getAllTodosHandler = async (req: Request, res: Response) => {
  try {
    const currentUser: Omit<User, 'password'> = res.locals.user;
    const todos = await getAllTodos(currentUser.id);
    return res.send(todos);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
};
