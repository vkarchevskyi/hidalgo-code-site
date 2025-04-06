export type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };

export type SparkleType = {
	id: string;
	createdAt: number;
	color: string;
	size: number;
	style: any;
};

export type TagType = {
	label: string;
	color?: 'primary' | 'secondary';
};

export type SocialLink = {};

export type Feature = {
	name: string;
	description: string;
	image: string;
	tags: TagType[];
};

export type BlogPost = {
	tags: string[];
	keywords: string[];
	hidden: boolean;
	slug: string;
	title: string;
	date: string;
	updated: string;
	excerpt: string;
	html: string | undefined;
	readingTime: string;
	relatedPosts: BlogPost[];
	coverImage: string | undefined;
};

export interface Game {
	slug: string;
	title: string;
	shortDescription: string;
	description: string;
	coverImage: string;
	gallery?: string[];
	trailer?: string;
	releaseDate?: Date;
	features?: { title: string; description: string; icon?: string }[];
	platforms?: string[];
	price?: string;
	storeLinks?: { platform: string; url: string }[];
	tags?: string[];
	awards?: Award[];
}

export type Award = {
	name: string;
	organization: string;
	year: number;
	image?: string;
	description?: string;
};
