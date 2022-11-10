import { CreateTodoInput } from '../schema/todo.schema';
import { db } from '../utils/db.server';
import { User } from '@prisma/client';

export const createTodo = async (
  input: CreateTodoInput,
  userId: User['id']
) => {
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

// Get All Todos
export const getAllTodos = async (userId: User['id']) => {
  try {
    const todos = db.todo.findMany({
      where: {
        creatorId: userId,
      },
    });
    return todos;
  } catch (e) {}
};

// Update to complete

// Update and Asign a todo to a project
