// Disabling eslint because importing Prism is needed
// even if not directly used in this file
// eslint-disable-next-line no-unused-vars
import Prism from 'prismjs';
// Here we assign it to a variable so the import above
// is not removed automatically on build
const ifYouRemoveMeTheBuildFails = Prism;
import 'prism-svelte';
import readingTime from 'reading-time/lib/reading-time';
import striptags from 'striptags';
import type { BlogPost } from '$lib/utils/types';

export const importPosts = (render = false) => {
	const blogImports = import.meta.glob('$routes/*/*/*.md', { eager: true });
	const innerImports = import.meta.glob('$routes/*/*/*/*.md', { eager: true });

	const imports = { ...blogImports, ...innerImports };

	const posts: BlogPost[] = [];
	for (const path in imports) {
		const post = imports[path] as any;
		if (post) {
			posts.push({
				...post.metadata,
				html: render && post.default.render ? post.default.render()?.html : undefined
			});
		}
	}

	return posts;
};

export const filterPosts = (posts: BlogPost[], options?: { tag?: string; limit?: number }) => {
	return (
		posts
			.filter((post) => {
				// Filter out hidden posts
				if (post.hidden) return false;

				// If tag is specified, filter by tag
				if (options?.tag && post.tags) {
					return post.tags.some((tag) => tag.toLowerCase() === options.tag?.toLowerCase());
				}

				return true;
			})
			.sort((a, b) =>
				new Date(a.date).getTime() > new Date(b.date).getTime()
					? -1
					: new Date(a.date).getTime() < new Date(b.date).getTime()
					? 1
					: 0
			)
			.map((post) => {
				const readingTimeResult = post.html ? readingTime(striptags(post.html) || '') : undefined;
				const relatedPosts = getRelatedPosts(posts, post);

				return {
					...post,
					readingTime: readingTimeResult ? readingTimeResult.text : '',
					relatedPosts: relatedPosts
				} as BlogPost;
			})
			// Apply limit if specified
			.slice(0, options?.limit || undefined)
	);
};

/**
 * Get posts related to a specific tag
 * @param tag The tag to filter by
 * @param limit Maximum number of posts to return
 */
export const getPostsByTag = (posts: BlogPost[], tag: string, limit?: number) => {
	return filterPosts(posts, { tag, limit });
};

/**
 * Get posts related to a specific game
 * @param gameTitle The game title to search for in post tags
 * @param limit Maximum number of posts to return
 */
export const getGameRelatedPosts = (posts: BlogPost[], gameTitle: string, limit = 3) => {
	return getPostsByTag(posts, gameTitle, limit);
};

// #region Unexported Functions

const getRelatedPosts = (posts: BlogPost[], post: BlogPost) => {
	// Get the first 3 posts that have the highest number of tags in common
	const relatedPosts = posts
		.filter((p) => !p.hidden && p.slug !== post.slug)
		.sort((a, b) => {
			const aTags = a.tags?.filter((t) => post.tags?.includes(t));
			const bTags = b.tags?.filter((t) => post.tags?.includes(t));
			return aTags?.length > bTags?.length ? -1 : aTags?.length < bTags?.length ? 1 : 0;
		});

	return relatedPosts.slice(0, 3).map((p) => ({
		...p,
		readingTime: p.html ? readingTime(striptags(p.html) || '').text : ''
	}));
};

// #endregion
