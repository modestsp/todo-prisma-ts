import { object, string, boolean, TypeOf } from 'zod';

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

export const deleteProjectSchema = object({
  body: object({
    projectId: string({
      required_error: 'projectId is required',
    }),
  }),
});

export const updateProjectSchema = object({
  body: object({
    projectId: string({
      required_error: 'todoId is required',
    }),
    title: string().optional(),
    endsAt: string().optional(),
  }),
});

export type CreateProjectInput = TypeOf<typeof createProjectSchema>['body'];
export type DeleteProjectInput = TypeOf<typeof deleteProjectSchema>['body'];
export type UpdateProjectInput = TypeOf<typeof updateProjectSchema>['body'];
