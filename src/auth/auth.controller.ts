import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  // 最初に1度きりのサービス呼び出し
  constructor(private readonly authService: AuthService) {}

  // POSTを定義するデコレーター
  @Post('register')
  // JSONを受け取る@Bodyのデコレーター
  register(@Body() 
    // 受け取るJSONの内容
    body: {
      email: string;
      password: string;
      name?: string 
    }) {
    console.log('Received body:', body);
    // 登録APIの送信元に返す内容
    return this.authService.register(
      body.email,
      body.password,
      body.name
    );
  }


  @Post('login')
  login(@Body() 
    body: {
      email: string;
      password: string
    }) {
    return this.authService.login(
      body.email,
      body.password
    );
  }
}