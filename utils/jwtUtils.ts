import jwt, { Secret } from "jsonwebtoken";
import { variables } from "../config/envLoader";
const jwtSecret: Secret = variables.JWT_SECRET;

export function signJwt(payload: Object, expiresIn: number | string) {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: "7d",
    algorithm: "HS512",
  });
}
