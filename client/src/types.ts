import { TypeOf } from 'zod';
import { createSessionSchema } from './components/LogIn/LogInForm';

export type CreateSessionInput = TypeOf<typeof createSessionSchema>;

export interface User {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
  name: string;
  session: string;
}
