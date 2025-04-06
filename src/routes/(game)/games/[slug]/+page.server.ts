import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getGameBySlug } from '$lib/utils/games';
import { getGameRelatedPosts } from '$lib/data/blog-posts/utils';
import { allPosts } from '$lib/data/blog-posts';

export const load = (async ({ params }) => {
	const { slug } = params;

	try {
		const game = await getGameBySlug(slug);

		if (!game) {
			throw error(404, 'Game not found');
		}

		const posts = getGameRelatedPosts(allPosts, game.title, 3);

		return {
			game,
			posts
		};
	} catch (e) {
		throw error(404, 'Game not found');
	}
}) satisfies PageServerLoad;
