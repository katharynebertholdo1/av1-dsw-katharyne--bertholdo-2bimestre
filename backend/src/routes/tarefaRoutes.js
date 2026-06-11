import express from "express";
import * as TarefaController from "../controllers/tarefaController.js";

const router = express.Router();

router.get("/tasks", TarefaController.listar);
router.get("/tasks/:id", TarefaController.buscarPorId);
router.post("/tasks", TarefaController.criar);
router.put("/tasks/:id", TarefaController.atualizar);
router.delete("/tasks/:id", TarefaController.excluir);

export default router;
