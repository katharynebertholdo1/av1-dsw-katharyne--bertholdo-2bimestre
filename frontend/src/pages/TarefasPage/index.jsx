import { useEffect, useState } from "react";
import api from "../../services/api";
import TarefaForm from "../../components/TarefaForm";
import TarefaTabela from "../../components/TarefaTabela";

export default function TarefasPage() {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState("");

  async function buscarTarefas() {
    const resposta = await api.get("/tasks");
    setTarefas(resposta.data);
  }

  async function cadastrarTarefa(event) {
    event.preventDefault();

    if (descricao.trim() === "") {
      alert("digite uma tarefa");
      return;
    }

    await api.post("/tasks", {
      title: descricao
    });

    setDescricao("");
    buscarTarefas();
  }

  useEffect(() => {
    buscarTarefas();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Lista de Tarefas
          </h1>

          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Cadastre tarefas no frontend e visualize os dados salvos no backend.
          </p>
        </div>

        <TarefaForm
          descricao={descricao}
          setDescricao={setDescricao}
          cadastrarTarefa={cadastrarTarefa}
        />

        <TarefaTabela tarefas={tarefas} />
      </div>
    </section>
  );
}
