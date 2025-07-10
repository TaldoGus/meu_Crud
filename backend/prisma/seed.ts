import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Usuário admin:
//Email: admin@email.com
//Senha: admin123
//Tipo: admin

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@email.com';
  const existing = await prisma.user.findUnique({ where: { email } });

  if (!existing) {
    const hashed = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        username: 'admin',
        email,
        password: hashed,
        tipo: 'admin',
      },
    });

    console.log('✅ Usuário admin criado com sucesso!');
  } else {
    console.log('ℹ️ Usuário admin já existe.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
