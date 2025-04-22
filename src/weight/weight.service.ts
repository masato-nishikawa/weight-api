import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weight } from './entities/weight.entity';
import { CreateWeightDto } from './dto/create-weight.dto';


@Injectable()
export class WeightService {
  constructor(
    @InjectRepository(Weight)
    private readonly weightRepository: Repository<Weight>,
  ) {}

  // 登録処理（ログインユーザーに紐づけ）
  async create(dto: CreateWeightDto, userId: string): Promise<Weight> {
    // データ転送オブジェクトを展開して登録
    const newWeight = this.weightRepository.create({
      ...dto,
      userId,
    });
    return this.weightRepository.save(newWeight);
  }

  // 体重データを全て取り出し
  async findAllByUser(userId: string): Promise<Weight[]> {
    // TypeORMのメソッドで検索
    return this.weightRepository.find({
      // whereが絞り込みの条件、SQLではWHERE user_id = '...'
      where: { userId },
      // SQLではORDER BY recorded_at DESC
      order: { recordedAt: 'DESC' }, 
    });
  }

}