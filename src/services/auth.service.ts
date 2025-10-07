import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { hashPassword, comparePassword } from '../utils/hash';
import jwt from 'jsonwebtoken';

const repo = () => AppDataSource.getRepository(User);

export class AuthService {
  static async register(data: { fullName: string; birthDate: string; email: string; password: string }) {
    const repository = repo();
    const existing = await repository.findOne({ where: { email: data.email } });
    if (existing) throw { status: 400, message: 'Email уже используется' };

    const hashed = await hashPassword(data.password);
    const user = repository.create({
      fullName: data.fullName,
      birthDate: data.birthDate,
      email: data.email,
      password: hashed,
      role: 'user',
      isActive: true,
    });
    await repository.save(user);

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });
    return { user, token };
  }

  static async login(email: string, password: string) {
    const repository = repo();
    const user = await repository.findOne({ where: { email } });
    if (!user) throw { status: 401, message: 'Неверные учётные данные' };

    if (!user.isActive) throw { status: 403, message: 'Пользователь заблокирован' };

    const ok = await comparePassword(password, user.password);
    if (!ok) throw { status: 401, message: 'Неверные учётные данные' };

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });
    return { user, token };
  }
}
