import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  if (!user) {
    return res.status(400).send(null);
  }

  return next();
};

export default requireUser;
