import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';

@Entity({ name: 'passport' })
export class PassportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'expired_at',
    default: () => "CURRENT_TIMESTAMP + interval '30 days'",
  })
  expiredAt: Date;

  @Column({ name: 'secret_token' })
  secretToken: string;

  @Column({ type: 'text' })
  password: string;

  @OneToOne(() => UserEntity, (user) => user.passport)
  @JoinColumn({ name: 'user' })
  user?: UserEntity;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
