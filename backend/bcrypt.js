import bcrypt from "bcryptjs"

const senha = "123456"

const hash = await bcrypt.hashSync(senha, 10)

console.log("Senha:", senha)
console.log("Hash:", hash)