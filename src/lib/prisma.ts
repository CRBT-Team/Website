import { building } from '$app/environment';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

if (!building) {
	prisma.$connect().then(() => console.log('Connected to Prisma'));
}
