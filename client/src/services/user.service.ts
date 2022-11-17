import { CreateSessionInput, CreateUserInput } from '../types';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

let token: string = '';

const config = {
  withCredentials: true,
};
const setAccessToken = (newAccessToken: string) => {
  token = `Bearer ${newAccessToken}`;
};

const login = async (input: CreateSessionInput) => {
  const response = await axios.post(`${BASE_URL}/sessions`, input, config);
  return response.data;
};

const logout = async () => {
  const response = await axios.put(`${BASE_URL}/sessions`, config);
  return response.data;
};
const createUser = async (input: CreateUserInput) => {
  const response = await axios.post(`${BASE_URL}/users`, input, config);
  return response.data;
};
const getCurrentUser = async () => {
  const response = await axios.get(`${BASE_URL}/me`, config);
  return response.data;
};

const getAllTodos = async () => {
  const response = await axios.get(`${BASE_URL}/todos`, config);
  return response.data;
};

export default {
  setAccessToken,
  login,
  logout,
  getCurrentUser,
  getAllTodos,
  createUser,
};
