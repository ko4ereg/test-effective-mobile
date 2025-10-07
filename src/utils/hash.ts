import bcrypt from 'bcryptjs';
const rounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

export async function hashPassword(password: string) {
  return bcrypt.hash(password, rounds);
}

export async function comparePassword(raw: string, hash: string) {
  return bcrypt.compare(raw, hash);
}
