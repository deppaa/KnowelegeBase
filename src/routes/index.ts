import { router } from '../utils/router';
import * as publication from './publication';
import * as tags from './tags';

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
});
