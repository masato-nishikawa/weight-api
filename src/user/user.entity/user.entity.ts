import { Entity, PrimaryColumn, Column } from 'typeorm';

// 既存のテーブル名を使う
@Entity({ name: 'user' }) 
export class User {
  @PrimaryColumn('uuid') // 自動生成されていないなら PrimaryColumn
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
  @Column({ type: 'timestamp with time zone', name: 'recorded_at' })
  recordedAt: Date;
}