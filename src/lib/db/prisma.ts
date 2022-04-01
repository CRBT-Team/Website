import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

db.$connect().then(() => console.log('Connected to Prisma'));
