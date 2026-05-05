import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const email = 'dilanzchi@gmail.com'
const newPassword = 'Kiku1978$'

async function resetUser() {
  const payload = await getPayload({ config })

  const users = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: email,
      },
    },
    limit: 1,
  })

  if (!users.docs.length) {
    console.log('❌ Usuario no encontrado')
    process.exit(1)
  }

  const user = users.docs[0]

  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      password: newPassword,
      loginAttempts: 0,
      lockUntil: null,
    },
  })

  console.log('✅ Usuario desbloqueado y contraseña cambiada')
  console.log(`Email: ${email}`)
  console.log(`Nueva clave: ${newPassword}`)

  process.exit(0)
}

resetUser().catch((err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})