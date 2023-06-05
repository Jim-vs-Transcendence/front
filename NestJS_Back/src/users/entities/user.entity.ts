import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
	@PrimaryColumn()
	@ApiProperty({ description: '인트라 내부 id' })
	id: string;

	@Column()
	@ApiProperty({ description: '인트라 닉네임' })
	nickname: string;

	@Column()
	@ApiProperty({ description: '인트라 이메일 주소' })
	email: string;

	@Column()
	@ApiProperty({ description: '인트라 이미지 주소' })
	avatar: string;

	@Column()
	@ApiProperty({ description: '승리 횟수' })
	win: number;

	@Column()
	@ApiProperty({ description: '패배 횟수' })
	lose: number;

	@Column()
	@ApiProperty({ description: '레벨' })
	level: number;

	@Column()
	@ApiProperty({ description: '유저 상태 (0: 오프라인, 1: 온라인, 2: 게임중, 3: 채팅중)' })
	user_status: number;

	@Column()
	@ApiProperty({ description: 'two-factor 사용 여부 (0: 비활성화, 1: 활성화)' })
	two_factor: boolean;

	@Column()
	two_factor_secret: string;
}
