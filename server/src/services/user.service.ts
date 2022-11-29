import { db } from '../utils/db.server';
import bcrypt from 'bcrypt';
import config from 'config';
import { CreateUserInput } from '../schema/user.schema';
import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';

export const createUser = async (input: CreateUserInput): Promise<User> => {
  const { username, email, name, password } = input;
  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt);
  const newUser = await db.user.create({
    data: {
      username,
      name,
      email,
      password: passwordHash,
    },
  });
  return newUser;
};

export const validatePassword = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return false;
  }
  // Bcrypt compare
  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    return false;
  }

  return user;
};

export const findUser = async (id: string) => {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
};
