import { Pool } from 'pg';

import { DB_CONNECTION } from '../../constants/env';

export const db = new Pool({ connectionString: DB_CONNECTION });
