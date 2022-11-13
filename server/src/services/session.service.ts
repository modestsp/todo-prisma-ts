import { get } from 'lodash';
import { db } from '../utils/db.server';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import { findUser } from './user.service';
import config from 'config';

export const createSession = async (userId: string) => {
  const session = await db.session.create({
    data: {
      userId,
    },
  });

  return session;
};

export const findSessions = ({
  userId,
  valid,
}: {
  userId: string;
  valid: boolean;
}) => {
  return db.session.findMany({
    where: {
      userId,
      valid,
    },
  });
};

export const updateSession = ({
  sessionId,
  valid,
}: {
  sessionId: string;
  valid: boolean;
}) => {
  return db.session.update({
    where: {
      id: sessionId,
    },
    data: {
      valid,
    },
  });
};

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, 'session')) return false;

  const session = await db.session.findFirst({
    where: {
      userId: get(decoded, 'session'),
    },
  });

  if (!session || !session.valid) return false;

  const user = await findUser(session.userId);

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: config.get('accessTokenTtl') } // 15minutes
  );

  return accessToken;
};
