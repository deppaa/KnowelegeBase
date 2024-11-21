import passport from '@fastify/passport';
import { User } from '@prisma/client';
import { Strategy as LocalStrategy } from 'passport-local';
import { ERRORS } from '../constants/message';
import { getUserById, getUserByLogin } from '../integrations/db/storage/user';
import { verifyPassword } from '../utils/auth';

declare module 'fastify' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface PassportUser extends User {}
}

const authEmailConfig = {
  usernameField: 'email',
  passwordField: 'password',
};

export const configureStrategies = () => {
  passport.use(
    new LocalStrategy(authEmailConfig, async (email, password, done) => {
      console.log('LocalStrategy', email);
      const user = await getUserByLogin(email);
      if (!user || !verifyPassword(password, user.password)) {
        done(ERRORS.INVALID_EMAIL_OR_PASSWORD);
      } else {
        done(null, user);
      }
    }),
  );

  passport.registerUserSerializer<User, number>(async ({ id }) => id);
  passport.registerUserDeserializer<number, User | null>(getUserById);
};
