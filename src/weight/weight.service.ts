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
    const newWeight = this.weightRepository.create({
      ...dto,
      userId,
    });
    return this.weightRepository.save(newWeight);
  }

  // 体重データの取り出し
  async findAllByUser(userId: string): Promise<Weight[]> {
    return this.weightRepository.find({
      where: { userId },
      // 任意：新しい順に並び替え
      order: { recordedAt: 'DESC' }, 
    });
  }

}