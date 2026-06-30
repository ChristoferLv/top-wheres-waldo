import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { prisma } from './lib/prisma.js';
import { Strategy, ExtractJwt } from 'passport-jwt'

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new Strategy(opts, async function (jwt_payload, done) {
  try {
    if (!jwt_payload) {
      return done(new Error("Game data not found!"), false);
    }

    if (jwt_payload) {
      return done(null, jwt_payload);
    }

  } catch (error) {
    return done(error, false)
  }
}));

export { passport }