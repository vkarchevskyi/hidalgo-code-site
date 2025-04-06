import features from '$lib/data/features';
import { filteredPosts } from '$lib/data/blog-posts';
import { getAllGames } from '$lib/utils/games';

export async function load() {
	const posts = filteredPosts.slice(0, 4);
	const games = getAllGames();

	return {
		features,
		posts,
		games
	};
}
