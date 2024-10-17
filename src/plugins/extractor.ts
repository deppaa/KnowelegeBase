import { ExtractorOptions } from 'fastify-extract-definitions';

export const extractorConfig: ExtractorOptions = {
  enabled: process.env.PUBLIC_ENV === 'local',
  ignoreHead: true,
  outputs: {
    './src/_generated.ts': {
      target: 'serverTypes',
    },
  },
};
