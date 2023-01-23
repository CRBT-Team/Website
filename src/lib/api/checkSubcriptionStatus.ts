import { prisma } from '$lib/prisma';

export async function checkSubcriptionStatus(userId: string) {
	const subscriptionExpiresAt = (
		await prisma.user.findFirst({
			where: { id: userId },
			select: { subscriptionExpiresAt: true }
		})
	)?.subscriptionExpiresAt;

	if (subscriptionExpiresAt && subscriptionExpiresAt.getTime() <= Date.now()) {
		return subscriptionExpiresAt;
	}

	return false;
}
