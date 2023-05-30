import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT, // +를 붙여 int형으로 변환
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.DB_SYNC === 'true',
    logging: process.env.DB_LOG === 'true',
    // entities: [User]
    entities: [__dirname + '/../users/**/*.entity.{js,ts}'], // 엔티티를 이용해서 데이터베이스 테이블을 생성해준다. 그래서 앤티티 파일이 어디있는 지 설정.
    /*
        Todo:
        synchronize: true, // true 값을 주면 앱이 다시 실행할 때 앤티티안의 수정된 컬럼의 길이 타입 변경값 등을 해당 테이블에 Drop한 후 다시 생성.
    */
}