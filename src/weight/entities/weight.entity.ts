import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity()
export class Weight {
// 登録データのuuid
@PrimaryGeneratedColumn('uuid')
id: string;

// userテーブルのuuidを使いたい
@Column()
userId: string;

// 体重のデータ
@Column('float')
value: number;

// データの登録タイムスタンプ
@CreateDateColumn({ type: 'timestamp with time zone' })
recordedAt: Date;

}