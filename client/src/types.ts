import { TypeOf } from 'zod';
import { createSessionSchema } from './components/LogIn/LogInForm';
import { createUserSchema } from './components/SignUp/SignUp';

export type CreateSessionInput = TypeOf<typeof createSessionSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>;

export interface User {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
  name: string;
  session: string;
}
