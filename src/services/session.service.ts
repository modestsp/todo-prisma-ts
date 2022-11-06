import { db } from '../utils/db.server';

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
