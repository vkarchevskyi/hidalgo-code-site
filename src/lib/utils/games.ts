import type { Game } from './types';

// Dummy data for example purposes
const games: Game[] = [
	{
		slug: 'stellar-odyssey',
		title: 'Stellar Odyssey',
		releaseDate: new Date('2023-10-15'),
		shortDescription: 'Embark on an epic space adventure across the stars',
		description: `
			<p>Stellar Odyssey is an epic space adventure game that takes you on a journey across the stars. 
			Explore uncharted planets, encounter alien civilizations, and unravel the mysteries of the universe.</p>
			
			<h2>A Universe of Possibilities</h2>
			<p>In Stellar Odyssey, the entire galaxy is yours to explore. With over 100 unique star systems, 
			each with their own planets, moons, and inhabitants, you'll never run out of new horizons to discover.</p>
			
			<h2>Your Ship, Your Crew</h2>
			<p>Customize your starship with upgrades and modifications to suit your playstyle. 
			Recruit crew members from across the galaxy, each with their own skills, personalities, and stories.</p>
			
			<p>Will you be a peaceful explorer, a fearsome pirate, or a diplomatic ambassador? 
			The choice is yours in this vast open-world space adventure.</p>
		`,
		coverImage: '/images/posts/customization.jpg', // Placeholder
		gallery: [
			'/images/posts/customization.jpg',
			'/images/posts/project-structure.jpg',
			'/images/posts/customization.jpg',
			'/images/posts/project-structure.jpg'
		],
		trailer: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
		features: [
			{
				title: 'Vast Open Galaxy',
				description: 'Explore over 100 unique star systems with diverse planets and moons.'
			},
			{
				title: 'Dynamic Story',
				description: 'Your choices matter in a narrative that adapts to your decisions.'
			},
			{
				title: 'Ship Customization',
				description: 'Build and upgrade your ship with hundreds of different components.'
			},
			{
				title: 'Crew Management',
				description: 'Recruit and manage crew members, each with their own stories and abilities.'
			},
			{
				title: 'Space Combat',
				description:
					'Engage in tactical space battles with an advanced physics-based combat system.'
			},
			{
				title: 'Trading & Economy',
				description: 'Buy low, sell high as you navigate a dynamic interstellar economy.'
			}
		],
		systemRequirements: {
			minimal: {
				OS: 'Windows 10 64-bit',
				Processor: 'Intel Core i5-4460 / AMD Ryzen 3 1200',
				Memory: '8 GB RAM',
				Graphics: 'NVIDIA GeForce GTX 960 / AMD Radeon R9 380',
				DirectX: 'Version 11',
				Storage: '50 GB available space',
				Network: 'Broadband Internet connection'
			},
			recommended: {
				OS: 'Windows 10 64-bit',
				Processor: 'Intel Core i7-8700K / AMD Ryzen 5 3600',
				Memory: '16 GB RAM',
				Graphics: 'NVIDIA GeForce RTX 2060 / AMD Radeon RX 5700',
				DirectX: 'Version 12',
				Storage: '50 GB SSD',
				Network: 'Broadband Internet connection'
			}
		},
		platforms: ['Windows PC', 'PlayStation 5', 'Xbox Series X|S'],
		price: '$39.99',
		storeLinks: [
			{ platform: 'Steam', url: 'https://store.steampowered.com' },
			{ platform: 'Epic Games', url: 'https://www.epicgames.com/store' }
		],
		tags: ['Space', 'Adventure', 'RPG', 'Open World'],
		awards: [
			{
				name: 'Game of the Year',
				organization: 'Space Game Awards',
				year: 2023,
				image: '/images/posts/customization.jpg', // Placeholder image
				description:
					'Awarded for exceptional gameplay innovation and storytelling in the space exploration genre.'
			},
			{
				name: 'Best Art Direction',
				organization: 'Digital Arts Foundation',
				year: 2023,
				image: '/images/posts/project-structure.jpg', // Placeholder image
				description: 'Recognized for its stunning visual design and atmospheric space environments.'
			},
			{
				name: 'Excellence in Game Design',
				organization: 'Game Developers Conference',
				year: 2022,
				image: '/images/posts/customization.jpg', // Placeholder image
				description:
					'Honored for its innovative gameplay mechanics and immersive player experience.'
			}
		]
	}
];

export async function getGameBySlug(slug: string): Promise<Game | undefined> {
	return games.find((game) => game.slug === slug);
}

export async function getAllGames(): Promise<Game[]> {
	return games;
}
