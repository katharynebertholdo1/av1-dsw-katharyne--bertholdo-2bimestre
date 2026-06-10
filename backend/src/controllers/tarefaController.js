import * as TarefaModel from "../models/tarefaModel.js";

export async function listarTaskPrisma(req, res) {
  try {
    const listaTasks = await TarefaModel.listarTasks();

    return res.json(listaTasks);
  } catch (error) {}
}

export async function criarTaskPrisma(req, res) {
  try {
    const { title, description } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ erro: "Título é obrigatório" });
    }

    const taskCriada = await TarefaModel.criarTask(title, description);

    res.status(201).json({
      mensagem: "Task criada com sucesso!",
      task: taskCriada
    });
  } catch (error) {
    console.error("Erro ao criar task:", error);
    res
      .status(500)
      .json({ erro: "Erro ao criar task", detalhes: error.message });
  }
}

export async function buscarTaskPorIdPrisma(req, res) {
  try {
    const idNumero = Number(req.params.id);

    if (!idNumero) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const task = await TarefaModel.buscarTaskPorId(idNumero);

    if (!task) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

    res.json(task);
  } catch (error) {
    console.error("Erro ao buscar task:", error);
    res
      .status(500)
      .json({ erro: "Erro ao buscar task", detalhes: error.message });
  }
}

export async function atualizarTaskPrisma(req, res) {
  try {
    const idNumero = Number(req.params.id);
    const { title, description, completed } = req.body;

    if (!idNumero) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const taskAtualizada = await TarefaModel.atualizarTask(
      idNumero,
      title,
      description,
      completed
    );

    if (!taskAtualizada) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

    res.json({
      mensagem: "Task atualizada com sucesso!",
      task: taskAtualizada
    });
  } catch (error) {
    console.error("Erro ao atualizar task:", error);
    res
      .status(500)
      .json({ erro: "Erro ao atualizar task", detalhes: error.message });
  }
}

export async function excluirTaskPrisma(req, res) {
  try {
    const idNumero = Number(req.params.id);

    if (!idNumero) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const taskRemovida = await TarefaModel.excluirTask(idNumero);

    if (!taskRemovida) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

    res.json({
      mensagem: "Task excluída com sucesso!",
      task: taskRemovida
    });
  } catch (error) {
    console.error("Erro ao excluir task:", error);
    res
      .status(500)
      .json({ erro: "Erro ao excluir task", detalhes: error.message });
  }
}
