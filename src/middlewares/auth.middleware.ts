import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string } | null;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Нет токена' });
  }
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Неверный токен' });
  }
}

export function requireAdminOrSelf() {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const targetId = req.params.id;
    if (!user) return res.status(401).json({ message: 'Не авторизован' });
    if (user.role === 'admin' || user.id === parseInt(targetId)) return next();
    return res.status(403).json({ message: 'Нет доступа' });
  };
}

export function requireAdmin() {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Не авторизован' });
    if (user.role !== 'admin') return res.status(403).json({ message: 'Требуется роль admin' });
    next();
  };
}
