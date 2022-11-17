import { Express, Request, Response } from 'express';

import {
  createProjectHandler,
  deleteProjectHandler,
  getAllProjectsHandler,
  updateProjectHandler,
} from '../controllers/project.controller';
import {
  createUserSessionHandler,
  updateSessionHandler,
  getUserSessionsHandler,
} from '../controllers/session.controller';
import {
  createTodoHandler,
  deleteTodoHandler,
  getAllTodosHandler,
  updateTodoHandler,
} from '../controllers/todo.controller';
import {
  createUserHandler,
  getCurrentUser,
} from '../controllers/user.controller';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import {
  createProjectSchema,
  deleteProjectSchema,
  updateProjectSchema,
} from '../schema/project.schema';
import { createSessionSchema } from '../schema/session.schema';
import {
  createTodoSchema,
  deleteTodoSchema,
  updateTodoSchema,
} from '../schema/todo.schema';
import { createUserSchema } from '../schema/user.schema';

function routes(app: Express) {
  app.get('/ok', (req: Request, res: Response) => res.sendStatus(200));

  // Users
  app.post('/api/users', validateResource(createUserSchema), createUserHandler);
  app.get('/api/me', requireUser, getCurrentUser);

  // Projects
  app.post(
    '/api/projects',
    validateResource(createProjectSchema),
    createProjectHandler
  );
  app.get('/api/projects', getAllProjectsHandler);
  app.delete(
    '/api/projects',
    validateResource(deleteProjectSchema),
    deleteProjectHandler
  );
  app.put(
    '/api/projects',
    validateResource(updateProjectSchema),
    updateProjectHandler
  );

  // Todos
  app.post('/api/todos', validateResource(createTodoSchema), createTodoHandler);
  app.get('/api/todos', getAllTodosHandler);
  app.delete(
    '/api/todos',
    validateResource(deleteTodoSchema),
    deleteTodoHandler
  );
  app.put('/api/todos', validateResource(updateTodoSchema), updateTodoHandler);

  // Sessions
  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get('/api/sessions', requireUser, getUserSessionsHandler);
  app.delete('/api/sessions', requireUser, updateSessionHandler);
}

export default routes;
