import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateWeightDto } from './dto/create-weight.dto';
import { WeightService } from './weight.service';

// @Guardを全体に付けてもいい
// ユーザー認証をしていてログイン済みユーザーのみ使用可能
@UseGuards(JwtAuthGuard)
@Controller('weight')
export class WeightController {
  constructor(private readonly weightService: WeightService) {}

  @Post()
  create(@Body() 
    dto: CreateWeightDto,
    //　req は 現在のリクエスト情報（＝Expressの Request オブジェクト）全体を取得する
    @Request() req) {
      // ログインユーザーのIDを取得
      const userId = req.user.userId; 
      // サービス側に渡して動作
      return this.weightService.create(dto, userId);
  }
  //　JSONの想定
  // {
  //   "value": 64.8,
  //   "measuredAt": "2025-04-22T10:30:00Z"
  // }

  @Get()
  findAllByUser(@Request() req) {
    const userId = req.user.userId;
    return this.weightService.findAllByUser(userId);
  }

}