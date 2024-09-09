import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Register a new user
  async register(registerDto: RegisterDto): Promise<User> {
    const { username, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  // Validate user credentials and generate JWT token
  async login(loginDto: LoginDto): Promise<{ access_token: string }> { // Rename here to 'access_token'
    const { username, password } = loginDto;
    const user = await this.usersRepository.findOne({ where: { username } });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate JWT Token
      const payload = { username: user.username, sub: user.id };
      const access_token = this.jwtService.sign(payload);  // Use 'access_token'
      return { access_token };  // Return the token as 'access_token'
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
  
}
