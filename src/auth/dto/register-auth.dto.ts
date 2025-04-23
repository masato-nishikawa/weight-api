import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterAuthDto {
  //　メールアドレス形式かどうか
  @IsEmail({}, { message: '正しいメールアドレス形式で入力してください' })
  email: string;

  // 空でなく、文字列かどうか
  @IsNotEmpty({ message: 'パスワードは必須です' })
  @IsString()
  password: string;

  // 入力があってもなくても良い、文字列かどうか
  @IsOptional()
  @IsString()
  name?: string;
}