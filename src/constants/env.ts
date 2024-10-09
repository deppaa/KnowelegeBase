const DB_USER = process.env.DB_USER || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';

const DB_HOST = process.env.DB_HOST || '';
const DB_PORT = process.env.DB_PORT || '';
const DB_NAME = process.env.DB_NAME || '';

export const DB_CONNECTION = (() => {
  const password = DB_PASSWORD ? `:${DB_PASSWORD}` : '';
  const user = DB_USER ? `${DB_USER}${password}@` : '';

  return `postgresql://${user}${DB_HOST}:${DB_PORT}/${DB_NAME}?`;
})();

export const JWT_SECRET = process.env.JWT_SECRET || '';
export const PASSWORD_SALT = process.env.PASSWORD_SALT || '';
