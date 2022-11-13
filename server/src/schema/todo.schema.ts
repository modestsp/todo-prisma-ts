import { object, string, TypeOf, boolean } from 'zod';

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

export const deleteTodoSchema = object({
  body: object({
    todoId: string({
      required_error: 'todoId is required',
    }),
  }),
});

export const updateTodoSchema = object({
  body: object({
    todoId: string({
      required_error: 'todoId is required',
    }),
    description: string().optional(),
    endsAt: string().optional(),
    completed: boolean().optional(),
    projectId: string().optional(),
  }),
});

export type CreateTodoInput = TypeOf<typeof createTodoSchema>['body'];
export type DeleteTodoInput = TypeOf<typeof deleteTodoSchema>['body'];
export type UpdateTodoInput = TypeOf<typeof updateTodoSchema>['body'];
