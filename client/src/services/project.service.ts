import {
  CreateProjectInput,
  CreateSessionInput,
  CreateUserInput,
  UpdateProjectInput,
  User,
} from '../types';
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

const createProject = async (
  input: CreateProjectInput,
  userId: string
): Promise<Project> => {
  const response = await axios.post(
    `${BASE_URL}/projects`,
    { ...input, userId },
    config
  );
  return response.data;
};

const deleteProject = async (projectId: string): Promise<Project | null> => {
  const response = await axios.delete(`${BASE_URL}/projects`, {
    data: {
      projectId,
    },
    withCredentials: true,
  });
  return response.data;
};

const updateProject = async ({ input }: { input: UpdateProjectInput }) => {
  const response = await axios.put(`${BASE_URL}/projects`, input);
  return response.data;
};
export default {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
};
