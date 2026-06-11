import { prisma } from "../config/prisma.js";

export async function listar() {
  return await prisma.task.findMany();
}

export async function buscarPorId(id) {
  const task = await prisma.task.findUnique({ where: { id } });
  return task ?? null;
}

export async function criar(data) {
  const { title, description = null, completed = false } = data;
  const nova = await prisma.task.create({
    data: {
      title: title.trim(),
      description: description ? description.trim() : null,
      completed
    }
  });
  return nova;
}

export async function atualizar(id, data) {
  try {
    const { title, description, completed } = data;
    const atualizada = await prisma.task.update({
      where: { id },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(description !== undefined && { description: description ? description.trim() : null }),
        ...(completed !== undefined && { completed })
      }
    });
    return atualizada;
  } catch (error) {
    if (error?.code === "P2025") return null;
    throw error;
  }
}

export async function excluir(id) {
  try {
    const removida = await prisma.task.delete({ where: { id } });
    return removida;
  } catch (error) {
    if (error?.code === "P2025") return null;
    throw error;
  }
}
