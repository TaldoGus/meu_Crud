import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'segredo123';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists)
    return res.status(400).json({ error: 'Usuário já cadastrado' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: 'Usuário criado com sucesso', user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: 'Usuário não encontrado' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ error: 'Senha inválida' });

  const token = jwt.sign(
    { userId: user.id, username: user.username, tipo: user.tipo },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
};
