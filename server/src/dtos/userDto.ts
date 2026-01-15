import { UserDocument } from "../models/user-model";

class UserDto {
  _id: string;
  phone: string;
  activated: boolean;
  createdAt: Date;

  constructor(user: UserDocument) {
    this._id = user._id.toString();
    this.phone = user.phone;
    this.activated = user.activated;
    this.createdAt = user.createdAt;
  }
}

export default UserDto;
