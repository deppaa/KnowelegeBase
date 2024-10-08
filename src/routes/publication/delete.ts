//import { Handler, PublicationGet } from 'src/_generated';
import { config } from '../../utils/router';
import { HTTP_STATUS } from '../../constants/message';

export const options = config({
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
      additionalProperties: false,
    },
    response: {
      [HTTP_STATUS.OK]: {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
        additionalProperties: false,
      },
    },
  },
});

export const handler = () => {};
