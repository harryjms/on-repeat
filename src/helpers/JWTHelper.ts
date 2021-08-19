import jwt from "jsonwebtoken";

class JWTHelper {
  private readonly jwtSecret: string;
  constructor(secret?: string) {
    this.jwtSecret = secret || process.env.JWT_SECRET;
  }

  public decode<T = any>(token: string) {
    return jwt.verify(token, this.jwtSecret) as T;
  }

  public encode(payload: object) {
    return jwt.sign(payload, this.jwtSecret);
  }
}

export default new JWTHelper();
