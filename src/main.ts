import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ソフト全体でバリデーションを有効にする
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// 開発中などをTSで動作してほっとりロードができる
// npm run start:dev
//　JSにコンパイルした後に動作
// node dist/main

// ここでデコレーターを使うとバリデーションができる
// 外部キー制約を行う

// SQLでDB操作

// ORMを使っていないのでSQL操作
//　NextJSのキャッチアップ　Ver.14でapp routerの方で開発している
//　Reactも都度調べながら
//　RDBのPostgresがほとんど
// AWSのみECSのコンテナマネージシステム
//　1つ引数で中に3つのキーバリューを入れたオブジェクトの形にする（