import { Injectable } from '@nestjs/common';

//creating a fake type for users
export type User = any;

@Injectable()
export class UsersService {
  //creating a fake users database
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  //fake async method to find users from our fake database
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
