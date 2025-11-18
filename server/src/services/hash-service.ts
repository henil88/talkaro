import crypto from "crypto";

class Hashservice {
  //otp-hashing
  hashOtp(data: string) {
    return crypto.createHmac("sha256", "shaAlgo").update(data).digest("hex");
  }
}

export default new Hashservice();
