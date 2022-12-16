import pkg from '@prisma/client';
const { PrismaClient } = pkg;

export const prisma = new PrismaClient();

prisma.$connect().then(() => console.log('Connected to Prisma'));
