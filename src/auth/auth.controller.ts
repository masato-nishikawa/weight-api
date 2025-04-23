import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  // 最初に1度きりのサービス呼び出し
  constructor(private readonly authService: AuthService) {}

  // POSTを定義するデコレータ
  @Post('register')
  // dtoで入力内容の確認
  register(@Body() body: RegisterAuthDto) {
    console.log('登録内容:', body);
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginAuthDto) {
    console.log('ログイン情報:', body);
    return this.authService.login(body);
  }
}