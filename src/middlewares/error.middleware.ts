import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  // handle Postgres unique violation
  if (err.code === '23505') {
    return res.status(400).json({ message: 'Уникальное значение нарушено' });
  }
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
}
