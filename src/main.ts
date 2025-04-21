import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// 開発中などをTSで動作してほっとりロードができる
// npm run start:dev
//　JSにコンパイルした後に動作
// node dist/main