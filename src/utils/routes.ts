import { Express, Request, Response } from 'express';
import {
  createUserSessionHandler,
  updateSessionHandler,
  getUserSessionsHandler,
} from '../controllers/session.controller';
import { createTodoHandler } from '../controllers/todo.controller';
import { createUserHandler } from '../controllers/user.controller';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import { createSessionSchema } from '../schema/session.schema';
import { createTodoSchema } from '../schema/todo.schema';
import { createUserSchema } from '../schema/user.schema';

function routes(app: Express) {
  app.get('/ok', (req: Request, res: Response) => res.sendStatus(200));

  // Users
  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  // Todos
  app.post('/api/todos', validateResource(createTodoSchema), createTodoHandler);

  // Sessions
  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get('/api/sessions', requireUser, getUserSessionsHandler);
  app.put('/api/sessions', requireUser, updateSessionHandler);
}

export default routes;
