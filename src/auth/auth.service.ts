import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger();
  constructor(
    @InjectRepository(UserRepository)
    private UserRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.UserRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    const username = await this.UserRepository.signIn(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generaged JWT Token with payload ${JSON.stringify(payload)}`
    );
    return { accessToken };
  }
}
