import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import type { User } from '@prisma/client';

const SALT_ROUNDS = 10;

export const authService = {
  async hashPassword(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, SALT_ROUNDS);
  },

  async verifyPassword(plaintext: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plaintext, hash);
  },

  async validateCredentials(email: string, password: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.hashedPassword) {
      return null;
    }

    const isValidPassword = await this.verifyPassword(password, user.hashedPassword);
    return isValidPassword ? user : null;
  },

  async createUser(data: {
    email: string;
    hashedPassword: string;
    name?: string;
    role?: 'ADMIN' | 'AGENT' | 'VIEWER';
  }): Promise<User> {
    return prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        hashedPassword: data.hashedPassword,
        name: data.name || undefined,
        role: data.role || 'VIEWER',
      },
    });
  },

  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  },

  async updateUserRole(userId: string, role: 'ADMIN' | 'AGENT' | 'VIEWER'): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  },
};
