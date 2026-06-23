import bcrypt from "bcryptjs"

const senha = "manu123"

const hash = await bcrypt.hashSync(senha, 10)

console.log("Senha:", senha)
console.log("Hash:", hash)