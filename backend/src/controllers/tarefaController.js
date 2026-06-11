import * as TaskModel from "../models/tarefaModel.js";

export async function listar(req, res) {
  try {
    const lista = await TaskModel.listar();
    return res.json(lista);
  } catch (error) {
    console.error("Erro ao listar tasks:", error);
    return res.status(500).json({ erro: "Erro ao listar tasks", detalhes: error.message });
  }
}

export async function criar(req, res) {
  try {
    const { title, description, completed } = req.body;
    if (!title || !title.toString().trim()) {
      return res.status(400).json({ erro: "Campo 'title' é obrigatório" });
    }
    const criada = await TaskModel.criar({ title, description, completed });
    return res.status(201).json({ mensagem: "Criada", task: criada });
  } catch (error) {
    console.error("Erro ao criar task:", error);
    return res.status(500).json({ erro: "Erro ao criar task", detalhes: error.message });
  }
}

export async function buscarPorId(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ erro: "ID inválido" });
    const task = await TaskModel.buscarPorId(id);
    if (!task) return res.status(404).json({ erro: "Task não encontrada" });
    return res.json(task);
  } catch (error) {
    console.error("Erro ao buscar task:", error);
    return res.status(500).json({ erro: "Erro ao buscar task", detalhes: error.message });
  }
}

export async function atualizar(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ erro: "ID inválido" });
    const data = req.body || {};
    const atualizada = await TaskModel.atualizar(id, data);
    if (!atualizada) return res.status(404).json({ erro: "Task não encontrada" });
    return res.json({ mensagem: "Atualizada", task: atualizada });
  } catch (error) {
    console.error("Erro ao atualizar task:", error);
    return res.status(500).json({ erro: "Erro ao atualizar task", detalhes: error.message });
  }
}

export async function excluir(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ erro: "ID inválido" });
    const removida = await TaskModel.excluir(id);
    if (!removida) return res.status(404).json({ erro: "Task não encontrada" });
    return res.json({ mensagem: "Excluída", task: removida });
  } catch (error) {
    console.error("Erro ao excluir task:", error);
    return res.status(500).json({ erro: "Erro ao excluir task", detalhes: error.message });
  }
}
