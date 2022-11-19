import { CreateSessionInput, CreateUserInput, User } from '../types';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const config = {
  withCredentials: true,
};

const login = async (input: CreateSessionInput) => {
  const response = await axios.post(`${BASE_URL}/sessions`, input, config);
  return response.data;
};

const logout = async () => {
  const response = await axios.delete(`${BASE_URL}/sessions`, config);
  return response.data;
};
const createUser = async (input: CreateUserInput): Promise<User> => {
  const response = await axios.post(`${BASE_URL}/users`, input, config);
  return response.data;
};
const getCurrentUser = async (): Promise<User> => {
  const response = await axios.get(`${BASE_URL}/me`, config);
  return response.data;
};

export default {
  login,
  logout,
  getCurrentUser,
  createUser,
};
