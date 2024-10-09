import { Handler, UserIdDelete } from 'src/_generated';
import { config } from '../../utils/router';
import { ERRORS, HTTP_STATUS } from '../../constants/message';
import { checkValidStringToNumber } from '../../utils/validation';
import {
  deleteUserById,
  getUserById,
} from '../../integrations/db/storage/user';

export const options = config({
  roles: ['user'],
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
      [HTTP_STATUS.BAD_REQUEST]: {
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
        additionalProperties: false,
      },
      [HTTP_STATUS.NOT_FOUND]: {
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
        additionalProperties: false,
      },
    },
  },
});

export const handler: Handler<UserIdDelete> = async (request, reply) => {
  const { id } = request.params;

  if (!checkValidStringToNumber(id)) {
    return reply
      .code(HTTP_STATUS.BAD_REQUEST)
      .send({ error: ERRORS.USER_ID_IS_NOT_CORRECT });
  }

  const user = await getUserById(Number(id));

  if (!user) {
    return reply
      .code(HTTP_STATUS.NOT_FOUND)
      .send({ error: ERRORS.USER_NOT_EXIST });
  }

  const result = await deleteUserById(Number(id));

  return reply.code(HTTP_STATUS.OK).send({ id: result });
};
