import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['node_modules', 'build'],
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
});
