import { object, string, TypeOf } from 'zod';
export const createTodoSchema = object({
  body: object({
    description: string({
      required_error: 'Description is required',
    }),
    endsAt: string({
      required_error: 'End date is required',
    }),
  }),
});

export type CreateTodoInput = TypeOf<typeof createTodoSchema>['body'];
