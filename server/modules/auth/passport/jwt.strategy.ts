import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { jwtSecret } from './jwt.secret';

@Component()
export class JwtStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: jwtSecret(),
      },
      async (req, payload, next) => await this.verify(req, payload, next)
    );
    console.log('JwtStrategy');
    passport.use(this);
  }

  public async verify(req, payload, done) {
    console.log('JwtStrategy verify');
    const isValid = await this.authService.validateUser(payload);
    if (!isValid) {
      return done('Unauthorized', false);
    }
    done(null, payload);
  }
}