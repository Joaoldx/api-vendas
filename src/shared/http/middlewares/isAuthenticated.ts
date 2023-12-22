import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

export default function isAutenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Esta faltando o token');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodeToken = verify(token, authConfig.jwt.secret);

    return next();
  } catch (e) {
    throw new AppError('Token JWT inválido');
  }
}
