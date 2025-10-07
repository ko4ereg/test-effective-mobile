import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

const repo = () => AppDataSource.getRepository(User);

export class UserService {
  static async getById(id: string) {
    const repository = repo();
    const user = await repository.findOne({ where: { id } });
    if (!user) throw { status: 404, message: 'Пользователь не найден' };
    return user;
  }

  static async getAll(page = 1, limit = 20) {
    const repository = repo();
    const [items, total] = await repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { items, total, page, limit };
  }

  static async updateStatus(id: string, isActive: boolean) {
    const repository = repo();
    const user = await repository.findOne({ where: { id } });
    if (!user) throw { status: 404, message: 'Пользователь не найден' };
    user.isActive = isActive;
    await repository.save(user);
    return user;
  }
}
