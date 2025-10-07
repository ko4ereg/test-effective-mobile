import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { hashPassword } from '../utils/hash';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(User);
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const existing = await repo.findOne({ where: { email: adminEmail } });
  if (!existing) {
    const admin = repo.create({
      fullName: 'Admin',
      birthDate: '1995-01-01',
      email: adminEmail,
      password: await hashPassword(process.env.ADMIN_PASSWORD || 'admin123'),
      role: 'admin',
      isActive: true,
    });
    await repo.save(admin);
    console.log('Admin created:', adminEmail);
  } else {
    console.log('Admin exists');
  }
  process.exit(0);
}

run().catch(console.error);
