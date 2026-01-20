import UserModel, { UserDocument } from "../models/user-model";

interface CreateUserDto {
  phone: string;
}
interface FindUserDto {
  phone?: string;
  _id?: string;
}
class userService {
  async createUser(data: CreateUserDto) {
    const user = await UserModel.create(data);
    return user;
  }

  async findById(id: string) {
    return await UserModel.findById<UserDocument>(id);
  }

  async findUser(filter: FindUserDto) {
    const user = await UserModel.findOne(filter);
    return user;
  }
}

export default new userService();
