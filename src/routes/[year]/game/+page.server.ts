import type { GameStats } from '../../../types.ts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { API_URL } from '$env/static/private';

export const load: PageServerLoad = async ({ params }) => {
	const response = await (await fetch(`${API_URL}/games/2025`)).json();

	const res = response.filter((game: GameStats) => game.shortName === params.game)[0];

	if (!res) {
		throw error(404, 'Game not found');
	}

	return {
		gameStats: res
	};
};
