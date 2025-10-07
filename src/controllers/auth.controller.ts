import { Router } from 'express';
import { AuthService } from '../services/auth.service';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import { instanceToPlain } from 'class-transformer';

const router = Router();

router.post('/register', validationMiddleware(RegisterDto), async (req, res, next) => {
  try {
    const { user, token } = await AuthService.register(req.body);
    res.status(201).json({ user: instanceToPlain(user), token });
  } catch (err) {
    next(err);
  }
});

router.post('/login', validationMiddleware(LoginDto), async (req, res, next) => {
  try {
    const { user, token } = await AuthService.login(req.body.email, req.body.password);
    res.json({ user: instanceToPlain(user), token });
  } catch (err) {
    next(err);
  }
});

export default router;
