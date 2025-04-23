import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto'; 

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
  // 1つ引数で中に3つのキーバリューを入れたオブジェクトの形にする（順番に寄らない入力に対応）
  async register(dto: RegisterAuthDto) {
    const { email, password, name } = dto;
    // メールアドレスが存在しているかの確認
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) {
      throw new BadRequestException('すでに登録されています');
    }
    // bcryptでパスワードのハッシュ化(暗号化)
    // 複合が出来ない（平文が分からない状態にする）
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
  async login(dto: LoginAuthDto) {
    const {email, password} = dto;
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
      // 中身は見れるけど改竄はできないのが特徴
      access_token: this.jwtService.sign(payload),
    };
  }
}