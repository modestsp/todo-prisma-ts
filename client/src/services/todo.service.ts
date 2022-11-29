import { CreateTodoInput, UpdateTodoInput } from '../types';
import { Todo } from '../types';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const config = {
  withCredentials: true,
};

const getAllTodos = async (): Promise<Todo[] | []> => {
  const response = await axios.get(`${BASE_URL}/todos`, config);
  return response.data;
};

const createTodo = async (
  input: CreateTodoInput,
  userId: string,
  projectId?: string
): Promise<Todo> => {
  const response = await axios.post(
    `${BASE_URL}/todos`,
    { ...input, userId, projectId },
    config
  );
  return response.data;
};

const deleteTodo = async (todoId: string) => {
  const response = await axios.delete(`${BASE_URL}/todos`, {
    data: {
      todoId,
    },
    withCredentials: true,
  });
  return response.data;
};

export const updateTodo = async ({ input }: { input: UpdateTodoInput }) => {
  const response = await axios.put(`${BASE_URL}/todos`, input);
  return response.data;
};

export default {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};
