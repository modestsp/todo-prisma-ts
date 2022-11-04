import { object, string, TypeOf } from 'zod';
export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    username: string({
      required_error: 'Username is required',
    }),
    password: string({
      required_error: 'Name is required',
    }).min(6, 'Password should be at least 6 characters'),
    passwordConfirm: string({
      required_error: 'Password confirm is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
