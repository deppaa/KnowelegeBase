import crypto from 'crypto';
import { PASSWORD_SALT } from '../constants/env';

export const createHash = (password: string): string => {
  const key = crypto.scryptSync(password, PASSWORD_SALT, 64);

  return key.toString('hex');
};
