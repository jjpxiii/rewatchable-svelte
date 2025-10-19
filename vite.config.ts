import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), svelteTesting(), tailwindcss()],
	test: {
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.js']
	}
});
