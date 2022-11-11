import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requireUser;
