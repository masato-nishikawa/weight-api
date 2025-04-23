import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
    @IsEmail({}, { message: '正しいメールアドレス形式で入力してください' })
    email: string;

    @IsNotEmpty({ message: 'パスワードは必須です' })
    @IsString()
    password: string;
}