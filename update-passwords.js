require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

const updatePasswords = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    const emails = ['admin@demostore.com', 'cliente@demostore.com'];

    for (let email of emails) {
      const user = await User.findOne({ email });
      if (user) {
        user.passwordHash = 'Janis724';
        await user.save();
        console.log(`🔑 Contraseña actualizada para: ${email}`);
      } else {
        console.log(`⚠️ Usuario no encontrado: ${email}`);
      }
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updatePasswords();
