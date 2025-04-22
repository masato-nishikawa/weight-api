import { 
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
  } from 'typeorm';

// 既存のテーブル名を使う
@Entity({ name: 'user' }) 
export class User {
  @PrimaryGeneratedColumn('uuid') // ← 自動で UUID を生成！
  id: string;

  // 名前は自由に設定ができる
  @Column()
  name: string;

  //emailに対しては一意でありNOT NULL
  @Column({ 
    unique: true,
    nullable: false,
})
  email: string;

  // NOT NULL
  @Column({nullable: false})
  password: string;

  // タイムスタンプを使用する
  @CreateDateColumn({ name: 'recorded_at', type: 'timestamp with time zone' })
  recordedAt: Date;
}