import { IsNotEmpty } from 'class-validator';

export class CreateWeightDto {
    @IsNotEmpty({ message: '体重が未入力です。' })
    value: number;
    measuredAt: string; // ISO8601形式の日付文字列
  }