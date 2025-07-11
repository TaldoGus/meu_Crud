import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userService from '../services/userService';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'segredo123';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      res.status(400).json({ error: 'Usuário já cadastrado' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ error: 'Usuário não encontrado' });
      return;
    }

    //  Verifica se está bloqueado
    if (user.status === 'B') {
      res.status(403).json({ error: 'Usuário bloqueado por excesso de tentativas' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      const tentativas = user.tentativas + 1;

      //  Se atingir 3 tentativas, bloqueia
      if (tentativas >= 3) {
        await prisma.user.update({
          where: { id: user.id },
          data: { tentativas, status: 'B' }
        });

        res.status(403).json({ error: 'Usuário bloqueado após 3 tentativas inválidas' });
      } else {
        //  Atualiza só tentativas
        await prisma.user.update({
          where: { id: user.id },
          data: { tentativas }
        });

        res.status(401).json({ error: `Senha inválida (${tentativas}/3)` });
      }

      return;
    }

    //  Se login for válido, zera tentativas e incrementa acesso
    await prisma.user.update({
      where: { id: user.id },
      data: {
        tentativas: 0,
        quantAcesso: { increment: 1 }
      }
    });

    const token = jwt.sign(
      { userId: user.id, username: user.username, tipo: user.tipo },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


// ===========================
// CRUD DE USUÁRIOS
// ===========================

export const getUsers = async (req: Request, res: Response) => {
  if (req.user?.tipo !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem ver todos os usuários' });
  }

  const users = await userService.getAllUsers();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (req.user?.tipo !== 'admin' && req.user?.userId !== id) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  const user = await userService.getUserById(id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

  res.json(user);
};

export const updateUserData = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (req.user?.tipo !== 'admin' && req.user?.userId !== id) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  const updated = await userService.updateUser(id, req.body);
  res.json(updated);
};

export const removeUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (req.user?.tipo !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem excluir usuários' });
  }

  await userService.deleteUser(id);
  res.json({ message: 'Usuário removido com sucesso' });
};


//Recuperação de senha simulada 
export const recoverPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(404).json({ error: 'Email não encontrado' });
      return;
    }

    // Simula envio de recuperação
    console.log(`📨 Simulando envio de recuperação para: ${email}`);

    res.json({ message: 'Instruções de recuperação enviadas (simulado)' });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
