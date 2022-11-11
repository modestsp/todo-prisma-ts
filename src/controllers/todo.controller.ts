import { Request, Response } from 'express';
import { CreateTodoInput, DeleteTodoInput } from '../schema/todo.schema';
import { createTodo, deleteTodo, getAllTodos } from '../services/todo.service';
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

// Update

// Delete

export const deleteTodoHandler = async (
  req: Request<{}, {}, DeleteTodoInput>,
  res: Response
) => {
  try {
    const { todoId } = req.body;
    const deletedTodo = await deleteTodo(todoId);
    if (deletedTodo) return res.status(200).send(deletedTodo);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
};
