import { prisma } from "../config/prisma.js";

export async function listarTasks() {
  const listaTasks = await prisma.task.findMany();

  return listaTasks;
}

export async function criarTask(title, description = null) {
  const novaTask = await prisma.task.create({
    data: {
      title: title.trim(),
      description: description ? description.trim() : null
    }
  });

  return novaTask;
}

export async function buscarTaskPorId(id) {
  const task = await prisma.task.findUnique({
    where: {
      id: id
    }
  });

  return task;
}

export async function atualizarTask(id, title, description, completed) {
  try {
    const taskAtualizada = await prisma.task.update({
      where: {
        id: id
      },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(description !== undefined && {
          description: description ? description.trim() : null
        }),
        ...(completed !== undefined && { completed: completed })
      }
    });

    return taskAtualizada;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}

export async function excluirTask(id) {
  try {
    const taskRemovida = await prisma.task.delete({
      where: {
        id: id
      }
    });

    return taskRemovida;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}
