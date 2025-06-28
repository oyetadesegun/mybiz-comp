import bcrypt from "bcryptjs";

export async function bcryptHash(password: string) {

  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(password, salt)
  return hashed
}


export async function bcryptCompare({ password, hashedPassword }: { password: string, hashedPassword: string | null }) {
  const isValid = await bcrypt.compare(password, hashedPassword || "")
  return isValid
}