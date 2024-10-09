import { router } from '../utils/router';
import * as publication from './publication';
import * as tags from './tags';
import * as user from './user';
import * as signIn from './signIn';

export const routes = router({
  '/publication': {
    GET: publication.getList,
    POST: publication.create,
  },
  '/publication/:id': {
    GET: publication.get,
    PUT: publication.update,
    DELETE: publication.delete,
  },
  '/tags': {
    GET: tags.getList,
    POST: tags.create,
  },

  '/registration': {
    POST: user.create,
  },
  '/user/:id': {
    DELETE: user.delete,
  },
  '/signin': {
    POST: signIn.login,
  },
});
