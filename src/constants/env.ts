const DB_USER = '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';

const DB_HOST = 'localhost';
const DB_PORT = '5300';
const DB_NAME = 'postgres';

export const DB_CONNECTION = (() => {
  const password = DB_PASSWORD ? `:${DB_PASSWORD}` : '';
  const user = DB_USER ? `${DB_USER}${password}@` : '';

  return `postgresql://${user}${DB_HOST}:${DB_PORT}/${DB_NAME}`;
})();
