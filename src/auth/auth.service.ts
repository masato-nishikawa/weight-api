import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // constructor に必要なものを定義するだけで、Nestが自動でインスタンスを注入
  constructor(
    // Userのエンティティに対してTypeORMのRepository
    @InjectRepository(User)
    // Userのインスタンス作成
    private readonly userRepository: Repository<User>,
    // JWTのインスタンス作成
    private readonly jwtService: JwtService,
  ) {}

  // ユーザー登録のメソッド
  async register(email: string, password: string, name?: string) {
    // メールアドレスが存在しているかの確認
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) {
      throw new BadRequestException('すでに登録されています');
    }
    // bcryptでパスワードのハッシュ化(暗号化)
    const hashedPassword = await bcrypt.hash(password, 10);
    // エンティティに対してcreate
    const user = this.userRepository.create({
      email,
      // ハッシュ状態でDBに入れる
      password: hashedPassword,
      // nullの時に "ゲストさん" を入れる！
      name: name ?? 'ゲストさん', 
    });
    // savaコマンドの実装
    return this.userRepository.save(user);
  }

  // ログインのメソッド
  async login(email: string, password: string) {
    // メールアドレスが存在しているかの確認
    const user = await this.userRepository.findOne({ where: { email } });
    // ユーザーが存在してuserのパスワードを比較すればOKなら
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('ログイン失敗');
    }
    // sub は「トークンの主体（subject）」を意味し、慣習的に user.idを用いている
    const payload = { sub: user.id, email: user.email };
    return {
      // JWTアクセストークンを作成
      access_token: this.jwtService.sign(payload),
    };
  }
}