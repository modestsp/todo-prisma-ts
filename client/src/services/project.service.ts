import { CreateSessionInput, CreateUserInput, User } from '../types';
import { Todo, Project } from '../types';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const config = {
  withCredentials: true,
};

const getProjects = async () => {
  const response = await axios.get(`${BASE_URL}/projects`, config);
  return response.data;
};

export default {
  getProjects,
};
