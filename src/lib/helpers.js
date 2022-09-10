const bcrypt = require('bcryptjs')
const helpers = {}

// con esta funcion encriptaremos la contraseña
helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

// vamos a comparar la contraseña ya ingresada, con la del logeo
helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword)
  } catch (error) {
    console.error(`Aqui esta el error${error}`)
  }
}
module.exports = helpers
