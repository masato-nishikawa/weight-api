import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { User } from '../../user/user.entity/user.entity';

@Entity()
export class Weight {
// 登録データのuuid
@PrimaryGeneratedColumn('uuid')
id: string;

@ManyToOne(() => User, user => user.weights)
// 外部キーのカラム名を指定
@JoinColumn({ name: "userId" }) 
user: User;

// 体重のデータ
@Column('float')
value: number;

// データの登録タイムスタンプ
@CreateDateColumn({ type: 'timestamp with time zone' })
recordedAt: Date;

}