import { compare, hash } from "bcrypt";

export const hashPassword = async (data: string) => {
  const password = await hash(data, 12);
  return password;
};

export const matchHash = async (pwd: string, hash: string) => {
  const result = await compare(pwd, hash);
  return result;
};
