import { Injectable } from "@nestjs/common";

import { Repository } from "typeorm";

import { User } from "../users/entiti/user.entity";

@Injectable()

export class userRepository extends Repository<User> {// 엔티티를 추가하거나 삭제 수정하기 위해서 extends 를 넣는다.

  // Add custom methods here

  async findByName(name:string): Promise<User | undefined> {

    return this.findOne({ where: { nickname:name }});

  }

}
