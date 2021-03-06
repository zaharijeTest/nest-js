import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from 'src/settings/auth.settings';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  validate(payload: IJWT): IJWT {
    return {
      sub: payload.sub,
      username: payload.username,
      selectedOrganizationId: payload.selectedOrganizationId,
      roles: payload.roles,
    };
  }
}
