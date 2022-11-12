import { object, string, TypeOf } from 'zod';

export const createProjectSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    endsAt: string({
      required_error: 'End date is required',
    }),
  }),
});

export type CreateProjectSchema = TypeOf<typeof createProjectSchema>['body'];
