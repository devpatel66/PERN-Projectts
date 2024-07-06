// import crypto from 'crypto'
// import { Buffer } from 'buffer';
import bcrypt from 'bcryptjs'


const encryptPassword = async (password) => {
  let encrypted = await bcrypt.hash(password,10)
  return encrypted
}

const decryptPassword = async (encryptedPassword,password) => {
  let decrypted = await bcrypt.compare(password,encryptedPassword) 
  return decrypted
}

export { encryptPassword, decryptPassword }