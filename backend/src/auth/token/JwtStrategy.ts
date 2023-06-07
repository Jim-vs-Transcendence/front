// import { Injectable } from '@nestjs/common'

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private configService: ConfigService) {
//     super({
//       JwtFromRequest: ExtractJwt.fromExtractors([(request: any) => {
//         return Cookie(request, 'authToken');
//       }]),
//       ignoreExpiration: false,
//       secretOrKey: configService.get('JWT_SECRET'),
//     });
//   }
//   async validate(payload: any) {
//     return { userId: payload.id };
//   }
// }
