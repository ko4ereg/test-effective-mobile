import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validationMiddleware<T>(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(dtoClass, req.body);
    const errors = await validate(instance);
    if (errors.length > 0) {
      const messages = errors.map(e => Object.values(e.constraints || {})).flat();
      return res.status(400).json({ message: messages });
    }
    req.body = instance;
    next();
  };
}
