import express from "express";
import * as TarefaController from "../controllers/tarefaController.js";

const router = express.Router();

router.get("/tasks", TarefaController.listarTaskPrisma);
router.get("/tasks/:id", TarefaController.buscarTaskPorIdPrisma);
router.post("/tasks", TarefaController.criarTaskPrisma);
router.put("/tasks/:id", TarefaController.atualizarTaskPrisma);
router.delete("/tasks/:id", TarefaController.excluirTaskPrisma);

export default router;
