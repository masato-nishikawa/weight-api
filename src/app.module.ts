import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity/user.entity';
import { Weight } from './weight/entities/weight.entity'; 
import { WeightModule } from './weight/weight.module';

@Module({
  imports: [
    // 全体で.envを使えるようにする
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        // Weightで入れ忘れに注意
        entities: [User, Weight],
        // 本番では false にする
        synchronize: true, 
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    WeightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}