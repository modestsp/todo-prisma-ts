import { NextFunction, Request, Response } from 'express';
import config from 'config';
import {
  createSession,
  findSessions,
  updateSession,
} from '../services/session.service';
import { validatePassword } from '../services/user.service';
import { signJwt } from '../utils/jwt.utils';

export const createUserSessionHandler = async (req: Request, res: Response) => {
  // Validate users password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send({ error: 'Invalid username or password' });
  }
  // Create a session
  const session = await createSession(user.id);
  // Create an access token
  const accessToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: process.env.ACCESS_TOKEN_TTL } // 15minutes
  );

  // Create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: process.env.REFRESH_TOKEN_TTL } // 1 year
  );
  // Return access and refresh tokens
  res.cookie('accessToken', accessToken, {
    maxAge: 900000, // 15min
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: false,
  });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 3.154e10, // 1y
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'lax',
    secure: false,
  });

  return res.send({ accessToken, refreshToken });
};

export const getUserSessionsHandler = async (req: Request, res: Response) => {
  const user = res.locals.user.id;

  const sessions = await findSessions({ userId: user, valid: true });

  return res.send(sessions);
};

export const updateSessionHandler = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session;
  await updateSession({ sessionId, valid: false });
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
};
