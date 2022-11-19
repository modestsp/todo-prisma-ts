import { CreateTodoInput } from '../types';
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
  userId: string
): Promise<Todo> => {
  const response = await axios.post(
    `${BASE_URL}/todos`,
    { ...input, userId },
    config
  );
  return response.data;
};
export default {
  getAllTodos,
  createTodo,
};
