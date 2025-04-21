import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name?: string) {
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) {
      throw new Error('すでに登録されています');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name: name ?? 'ゲストさん', // ← nullやundefinedの時に "ゲストさん" を入れる！
    });
  
    return this.userRepository.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('ログイン失敗');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}