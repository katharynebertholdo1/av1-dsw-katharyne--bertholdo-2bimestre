# Queries Prisma - Task

Este documento descreve todas as queries do CRUD completo implementadas para a tabela Task usando Prisma.

## Estrutura do Model Task

```javascript
model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
}
```

## 1. Query de Inserção (CREATE)

### Model: `criarTask()`

**Localização:** `backend/src/models/tarefaModel.js`

```javascript
export async function criarTask(title, description = null) {
  const novaTask = await prisma.task.create({
    data: {
      title: title.trim(),
      description: description ? description.trim() : null
    }
  });

  return novaTask;
}
```

### Controller: `criarTaskPrisma()`

**Localização:** `backend/src/controllers/tarefaController.js`

```javascript
export async function criarTaskPrisma(req, res) {
  try {
    const { title, description } = req.body;

    // Validações...

    const taskCriada = await TarefaModel.criarTask(title, description);

    res.status(201).json({
      mensagem: "Task criada com sucesso!",
      task: taskCriada
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar task" });
  }
}
```

### Endpoint

**Rota:** `POST /tasks`

**Body (JSON):**

```json
{
  "title": "Título da tarefa",
  "description": "Descrição opcional"
}
```

**Resposta de Sucesso (201):**

```json
{
  "mensagem": "Task criada com sucesso!",
  "task": {
    "id": 1,
    "title": "Título da tarefa",
    "description": "Descrição opcional",
    "completed": false,
    "createdAt": "2026-05-11T12:00:00.000Z"
  }
}
```

## 2. Query de Exclusão (DELETE)

### Model: `excluirTask()`

**Localização:** `backend/src/models/tarefaModel.js`

```javascript
export async function excluirTask(id) {
  try {
    const taskRemovida = await prisma.task.delete({
      where: {
        id: id
      }
    });

    return taskRemovida;
  } catch (error) {
    // Se o registro não for encontrado, retorna null
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}
```

### Controller: `excluirTaskPrisma()`

**Localização:** `backend/src/controllers/tarefaController.js`

```javascript
export async function excluirTaskPrisma(req, res) {
  try {
    const idNumero = Number(req.params.id);

    // Validações...

    const taskRemovida = await TarefaModel.excluirTask(idNumero);

    if (!taskRemovida) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

    res.json({
      mensagem: "Task excluída com sucesso!",
      task: taskRemovida
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao excluir task" });
  }
}
```

### Endpoint

**Rota:** `DELETE /tasks/:id`

**Parâmetro de URL:**

- `id`: ID da task a ser excluída (número inteiro)

**Resposta de Sucesso (200):**

```json
{
  "mensagem": "Task excluída com sucesso!",
  "task": {
    "id": 1,
    "title": "Título da tarefa",
    "description": "Descrição opcional",
    "completed": false,
    "createdAt": "2026-05-11T12:00:00.000Z"
  }
}
```

**Resposta de Erro (404):**

```json
{
  "erro": "Task não encontrada"
}
```

## 3. Query de Listagem (READ - Listar Todas)

### Model: `listarTasks()`

**Localização:** `backend/src/models/tarefaModel.js`

```javascript
export async function listarTasks() {
  const listaTasks = await prisma.task.findMany();

  return listaTasks;
}
```

### Endpoint

**Rota:** `GET /tasks`

**Resposta de Sucesso (200):**

```json
[
  {
    "id": 1,
    "title": "Estudar Node.js",
    "description": "Aprender sobre Prisma ORM",
    "completed": false,
    "createdAt": "2026-05-11T12:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Fazer exercícios",
    "description": null,
    "completed": true,
    "createdAt": "2026-05-12T14:30:00.000Z"
  }
]
```

## 4. Query de Busca por ID (READ - Buscar Uma)

### Model: `buscarTaskPorId()`

**Localização:** `backend/src/models/tarefaModel.js`

```javascript
export async function buscarTaskPorId(id) {
  const task = await prisma.task.findUnique({
    where: {
      id: id
    }
  });

  return task;
}
```

### Controller: `buscarTaskPorIdPrisma()`

**Localização:** `backend/src/controllers/tarefaController.js`

```javascript
export async function buscarTaskPorIdPrisma(req, res) {
  try {
    const idNumero = Number(req.params.id);

    if (isNaN(idNumero)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const task = await TarefaModel.buscarTaskPorId(idNumero);

    if (!task) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar task" });
  }
}
```

### Endpoint

**Rota:** `GET /tasks/:id`

**Parâmetro de URL:**

- `id`: ID da task a ser buscada (número inteiro)

**Resposta de Sucesso (200):**

```json
{
  "id": 1,
  "title": "Estudar Node.js",
  "description": "Aprender sobre Prisma ORM",
  "completed": false,
  "createdAt": "2026-05-11T12:00:00.000Z"
}
```

**Resposta de Erro (404):**

```json
{
  "erro": "Task não encontrada"
}
```

## 5. Query de Atualização (UPDATE)

### Model: `atualizarTask()`

**Localização:** `backend/src/models/tarefaModel.js`

```javascript
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
```

### Controller: `atualizarTaskPrisma()`

**Localização:** `backend/src/controllers/tarefaController.js`

```javascript
export async function atualizarTaskPrisma(req, res) {
  try {
    const idNumero = Number(req.params.id);
    const { title, description, completed } = req.body;

    if (isNaN(idNumero)) {
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
    res.status(500).json({ erro: "Erro ao atualizar task" });
  }
}
```

### Endpoint

**Rota:** `PUT /tasks/:id` ou `PATCH /tasks/:id`

**Parâmetro de URL:**

- `id`: ID da task a ser atualizada (número inteiro)

**Body (JSON) - Todos os campos são opcionais:**

```json
{
  "title": "Novo título",
  "description": "Nova descrição",
  "completed": true
}
```

**Resposta de Sucesso (200):**

```json
{
  "mensagem": "Task atualizada com sucesso!",
  "task": {
    "id": 1,
    "title": "Novo título",
    "description": "Nova descrição",
    "completed": true,
    "createdAt": "2026-05-11T12:00:00.000Z"
  }
}
```

**Resposta de Erro (404):**

```json
{
  "erro": "Task não encontrada"
}
```

## Resumo do CRUD Completo

| Operação          | Método HTTP | Rota         | Query Prisma               | Descrição                |
| ----------------- | ----------- | ------------ | -------------------------- | ------------------------ |
| **CREATE**        | POST        | `/tasks`     | `prisma.task.create()`     | Criar nova task          |
| **READ (listar)** | GET         | `/tasks`     | `prisma.task.findMany()`   | Listar todas as tasks    |
| **READ (buscar)** | GET         | `/tasks/:id` | `prisma.task.findUnique()` | Buscar task por ID       |
| **UPDATE**        | PUT/PATCH   | `/tasks/:id` | `prisma.task.update()`     | Atualizar task existente |
| **DELETE**        | DELETE      | `/tasks/:id` | `prisma.task.delete()`     | Excluir task             |

## Testando o CRUD Completo

### Criar uma Task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar Node.js", "description": "Aprender sobre Prisma ORM"}'
```

### Listar Todas as Tasks

```bash
curl http://localhost:3000/tasks
```

### Buscar uma Task por ID

```bash
curl http://localhost:3000/tasks/1
```

### Atualizar uma Task

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar Node.js Avançado", "completed": true}'
```

### Excluir uma Task

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

- ✅ Retorna 404 se a task não existir
- ✅ Tratamento especial para erro P2025 (registro não encontrado)
- ✅ Tratamento de erros com try-catch

## Observações

1. As queries Prisma retornam Promises, por isso os controllers são `async/await`
2. O campo `completed` tem valor padrão `false` definido no schema
3. O campo `createdAt` é preenchido automaticamente com a data/hora atual
4. Todos os dados são salvos no banco de dados usando Prisma ORM
