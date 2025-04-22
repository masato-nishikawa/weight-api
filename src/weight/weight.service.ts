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

}