import { UserDocument } from "../models/user-model";

class UserDto {
  _id: string;
  phone: string;
  name: string;
  avtar: string;
  activated: boolean;
  createdAt: Date;

  constructor(user: UserDocument) {
    this._id = user._id.toString();
    this.phone = user.phone;
    this.name = user.name;
    this.avtar = user.avtar;
    this.activated = user.activated;
    this.createdAt = user.createdAt;
  }
}

export default UserDto;
