import { Module } from '@nestjs/common';
//　classのインポート
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // user.entityを使えるようにする
    TypeOrmModule.forFeature([User]),
    // JWTを使うための設定
    JwtModule.register({
      //.env ファイルに定義されている JWT_SECRET の値を使うが 'supersecretkey' をデフォルト値として使う
      secret: process.env.JWT_SECRET || 'supersecretkey',
      // サインイントークンの有効期限の設定
      signOptions: { expiresIn: '1d' },
    }),
  ],
  //　
  providers: [AuthService],
  // 
  controllers: [AuthController],
})
export class AuthModule {}

// モジュールで全体の設計的なのを行う
// サービスはビジネスロジックで実際に動作するプログラムの部分
// コントローラはエンドポイントの設定をする