import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    /*  In our use case with passport-jwt, 
        we have some configuration options in our super() 
    */
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false,
    });
  }

  /* We need to implement the validate() method. 
  
    For the jwt-strategy, Passport first verifies the JWT's signature and decodes the JSON. 
    It then invokes our validate() method passing the decoded JSON as its single parameter.

    Based on the way JWT signing works, 
    we're guaranteed that we're receiving a valid token 
    that we have previously signed and issued to a valid user.
  */
  async validate(payload: any): Promise<any> {
    return { userId: payload.sub, username: payload.username };
  }
}
