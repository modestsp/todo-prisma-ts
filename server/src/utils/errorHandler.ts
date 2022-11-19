import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
export const errorHandler = (
  e: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('ESTOY ENTRANDO ACA MIDDLEWARE');
  // console.log(e.meta.target);
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // The .code property can be accessed in a type-safe manner
    if (e.code === 'P2002') {
      console.log(
        'There is a unique constraint violation, a new user cannot be created with this email'
      );
      return res
        .status(409)
        .send({ error: 'Username or email already exists' });
    }
  }
  // 409 because we assume that some of the inputs are not unique

  next(e);
};
