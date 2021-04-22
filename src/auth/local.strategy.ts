import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    /*  In our use case with passport-local, 
    there are no configuration options, 
    so our constructor simply calls super(), 
    without an options object. */
    super();
  }

  /* We need to implement the validate() method. 
  
    For each strategy, 
    Passport will call the verify function (implemented with the validate() method in @nestjs/passport) 
    using an appropriate strategy-specific set of parameters. 
    For the local-strategy, Passport expects a validate() method with the following signature: 
    validate(username: string, password:string): any.
  */

  async validate(username: string, password: string): Promise<any> {
    /* 
        The validate() method for any Passport strategy will follow a similar pattern, 
        varying only in the details of how credentials are represented. 
        If a user is found and the credentials are valid, 
        the user is returned so Passport can complete its tasks 
        (e.g., creating the user property on the Request object), 
        and the request handling pipeline can continue. 
        If it's not found, we throw an exception and let our exceptions layer handle it.
  */

    /* 
        Typically, the only significant difference in the validate() method 
        for each strategy is how you determine if a user exists and is valid. 

        For example, in a JWT strategy, depending on requirements,
         we may evaluate whether the "userId" carried in the decoded token
          matches a record in our user database, or matches a list of revoked tokens.

          ==>  this pattern of sub-classing and implementing strategy-specific validation is consistent, elegant and extensible
    */
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
