import pkg from '@prisma/client';
const { PrismaClient } = pkg;

export const db = new PrismaClient();

db.$connect().then(() => console.log('Connected to Prisma'));
