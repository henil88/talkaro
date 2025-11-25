import UserModel from "../models/user-model";

interface CreateUserDto {
  phone: string;
}

class userService {
  async createUser(data: CreateUserDto) {
    const user = await UserModel.create(data);
    return user;
  }

  async findUser(filter: CreateUserDto) {
    const user = await UserModel.findOne(filter);
    return user;
  }
}

export default new userService();
