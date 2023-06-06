import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('friend')
export class Friend {
  @PrimaryColumn()
  @ApiProperty({ description: '인트라 내부 id1' })
  user_from: string;

  @PrimaryColumn()
  @ApiProperty({ description: '인트라 내부 id2' })
  user_to: string;

  @Column()
  @ApiProperty({
    description: '친구 상태 (0: 친구아님, 1: 친구신청, 2: 친구, 3: block)',
  })
  friend_status: number;
}
