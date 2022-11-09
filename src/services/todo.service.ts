import { CreateTodoInput } from '../schema/todo.schema';
import { db } from '../utils/db.server';

export const createTodo = async (input: CreateTodoInput, userId: string) => {
  const { description, endsAt } = input;
  try {
    const newTodo = await db.todo.create({
      data: {
        description,
        endsAt: new Date(endsAt),
        creatorId: userId,
      },
    });
    return newTodo;
  } catch (e: any) {
    throw new Error(e);
  }
};
