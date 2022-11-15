import { CreateSessionInput } from '../types';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

let token: string = '';

const config = {
  headers: { Authorization: token },
};
const setAccessToken = (newAccessToken: string) => {
  token = `Bearer ${newAccessToken}`;
};

const login = async (input: CreateSessionInput) => {
  const response = await axios.post(`${BASE_URL}/sessions`, input, config);
  return response.data;
};

const getCurrentUser = async () => {
  const response = await axios.get(`${BASE_URL}/me`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const getAllTodos = async () => {
  const response = await axios.get(`${BASE_URL}/todos`, config);
  return response.data;
};

export default { setAccessToken, login, getCurrentUser, getAllTodos };
