import { Request, Response, NextFunction } from 'express';
import { get, omit } from 'lodash';
import { verifyJwt } from '../utils/jwt.utils';

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, 'headers.authorization', '')?.replace(
    /^Bearer\s/,
    ''
  );

  if (!accessToken) {
    return next();
  }

  const { decoded } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = omit(decoded, 'password');
    return next();
  }

  return next();
};

export default deserializeUser;
