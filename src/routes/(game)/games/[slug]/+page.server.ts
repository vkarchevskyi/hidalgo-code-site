import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getGameBySlug } from '$lib/utils/games';

export const load = (async ({ params }) => {
	const { slug } = params;

	try {
		const game = await getGameBySlug(slug);

		if (!game) {
			throw error(404, 'Game not found');
		}

		return {
			game
		};
	} catch (e) {
		throw error(404, 'Game not found');
	}
}) satisfies PageServerLoad;
