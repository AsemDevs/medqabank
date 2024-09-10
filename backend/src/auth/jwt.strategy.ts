import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract the token from the "Bearer" header
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Get the secret from config
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username }; // Return the user info
  }
}
