import * as bcrypt from 'bcrypt'

export const generateHash = async (password: string): Promise<string> => {
  return bcrypt.hashSync(password, 14)
}

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compareSync(password, hash)
}