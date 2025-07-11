import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = () => prisma.user.findMany({
  select: {
    id: true,
    username: true,
    email: true,
    tipo: true,
    status: true,
    quantAcesso: true, 
    tentativas: true,  
    createdAt: true
  }
});

export const getUserById = (id: number) => prisma.user.findUnique({
  where: { id },
  select: {
    id: true,
    username: true,
    email: true,
    tipo: true,
    status: true,
    quantAcesso: true, 
    tentativas: true,  
    createdAt: true
  }
});

export const updateUser = (id: number, data: any) => prisma.user.update({
  where: { id },
  data
});

export const deleteUser = (id: number) => prisma.user.delete({
  where: { id }
});
