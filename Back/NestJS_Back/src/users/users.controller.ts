import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { tokenDTO } from './DTO/token.dto';

@Controller('user')
@ApiTags('유저 API')
export class UsersController {
	constructor(
		private readonly usersService: UsersService
	) {}

	@Get('list')
	@ApiOperation({ summary: '모든 유저 조회 API', description: '모든 유저를 조회합니다.' })
	@ApiCreatedResponse({ description: '모든 유저를 조회합니다.', type: User })
	async findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Get('token')
	async getToken(): Promise<tokenDTO> {
		return this.usersService.getToken();
	}

	@Get(':id')
	@ApiOperation({ summary: '유저 조회 API', description: '인자로 넘어온 id와 일치하는 유저를 조회합니다.' })
	@ApiCreatedResponse({ description: '인자로 넘어온 id와 일치하는 유저를 조회합니다.', type: User })
	async findOne(@Param('id') id: string): Promise<User> {
		return this.usersService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: '유저 정보 업데이트 API', description: '첫번째 인자인 id와 일치하는 유저의 데이터를 Body의 User로 업데이트 합니다.' })
	@ApiCreatedResponse({ description: '첫번째 인자인 id와 일치하는 유저의 데이터를 Body의 User로 업데이트 합니다.', type: String })
	async updateUser(@Param('id') id: string, @Body() user: User): Promise<string> {
		return this.usersService.updateUser(id, user);
	}

	@Post()
	@ApiOperation({ summary: '유저 등록 API', description: '유저를 등록합니다.' })
	@ApiCreatedResponse({ description: '유저를 등록합니다.', type: String })
	async saveUser(@Body() user: User): Promise<string> {
		return this.usersService.saveUser(user);
	}

	@Delete(':id')
	@ApiOperation({ summary: '유저 삭제 API', description: '인자로 넘어온 id와 일치하는 유저를 삭제합니다.' })
	@ApiCreatedResponse({ description: '인자로 넘어온 id와 일치하는 유저를 삭제합니다.' , type: String })
	async deleteUser(@Param('id') id: string): Promise<string> {
		return this.usersService.deleteUser(id);
	}
}
