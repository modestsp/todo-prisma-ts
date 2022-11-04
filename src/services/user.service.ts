import { db } from '../utils/db.server';
import bcrypt from 'bcrypt';
import config from 'config';
import { CreateUserInput } from '../schema/user.schema';

export const createUser = async (input: CreateUserInput) => {
  const { username, email, name, password } = input;
  const salt = await config.get<number>('saltRounds');
  const passwordHash = await bcrypt.hash(password, salt);
  try {
    const newUser = await db.user.create({
      data: {
        username,
        name,
        email,
        password: passwordHash,
      },
    });
    return newUser;
  } catch (e: any) {
    throw new Error(e);
  }
};
