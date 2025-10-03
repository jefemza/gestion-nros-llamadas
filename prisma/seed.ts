import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const reasons = [
    { name: 'MOVISTAR' },
    { name: 'MOROSO' },
    { name: 'QUITAR' },
  ];

  for (const reason of reasons) {
    await prisma.reason.create({
      data: reason,
    });
  }

  const adminUser = {
    username: 'jefe-admin',
    password: await bcrypt.hash('jefe2025+', 10),
    role: 'ADMIN',
  };

  await prisma.user.create({
    data: adminUser,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
