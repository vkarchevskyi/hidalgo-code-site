import type { PageServerLoad } from './$types';
import { getAllGames } from '$lib/utils/games';

export const load = (async () => {
	const games = await getAllGames();

	return {
		games
	};
}) satisfies PageServerLoad;
