import crypto from "crypto";

class Hashservice {
  //otp-hashing
  hashOtp(data: string) {
    return crypto.createHmac("sha256", "shaAlgo").update(data).digest("hex");
  }

  //compare hash

  compareHash(val1: string, val2: string) {
    return val1 === val2 ? true : false;
  }
}

export default new Hashservice();
