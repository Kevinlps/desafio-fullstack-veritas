# 🧩 Desafio Fullstack – Mini Kanban  (React + Go)

Este projeto foi desenvolvido como parte do **Desafio Fullstack – Veritas**, com o objetivo de construir uma aplicação **fullstack simples** composta por um **frontend em React** e um **backend em Go (Gin Gonic)**.

A aplicação consiste em um **mini Kanban**, com três colunas fixas:  
- **A Fazer (To Do)**  
- **Em Progresso (In Progress)**  
- **Concluídas (Done)**  

O sistema permite **criar, editar, mover e excluir tarefas**, com persistência dos dados em um arquivo JSON.
---

## ⚙️ Instruções para Rodar o Projeto

### 🖥️ Backend (Go)

#### 📋 Pré-requisitos
- [Go 1.22+](https://go.dev/dl/)
- Porta padrão: `8080`

#### ▶️ Executando o servidor

- cd backend

- go run .  

**(go run main.go não funciona bem, pois os arquivos estão fora de pacotes como manda a estrtura de entrega)**

O servidor iniciará em http://localhost:8080.

📡 Endpoints RESTful
Método	Rota	Descrição

GET	/tasks	Retorna todas as tarefas

POST	/tasks	Cria uma nova tarefa

PUT	/tasks/:id	Atualiza uma tarefa existente

DELETE	/tasks/:id	Remove uma tarefa

Os dados são persistidos no arquivo tasks.json, armazenado no diretório backend/.

---

### 🌐Frontend (React + Vite)
📋 Pré-requisitos
Node.js 18+

NPM ou Yarn

▶️ Instalação e execução

- cd frontend

- npm install

- npm run dev

O frontend estará disponível em http://localhost:5173.

### 🧠 Decisões Técnicas
- Go + Gin Gonic: escolhido pela simplicidade e desempenho na criação de APIs REST.

- Persistência em JSON: implementada para garantir que os dados sejam mantidos entre execuções, sem necessidade de banco de dados.

- React + Vite: pela rapidez na configuração e build do projeto.

- Tailwind CSS: para estilização rápida e moderna.

- @hello-pangea/dnd: para permitir movimentação intuitiva de tarefas via drag and drop.

- Arquitetura limpa: API separada em camadas (handlers, models) e frontend modularizado em componentes.

### 🧭 Fluxo de Uso (User Flow)
O diagrama do fluxo de uso está localizado em:
📄 /docs/user-flow.png

Resumo do comportamento:

1. O usuário acessa a tela principal.

2. Cria uma nova tarefa (título obrigatório, descrição opcional).

3. Move as tarefas entre colunas por drag and drop.

4. Pode editar ou excluir tarefas existentes.

5. Todas as alterações são refletidas em tempo real e salvas no tasks.json.

### ⚠️ Limitações Conhecidas
- Não há autenticação de usuários.

- Não há paginação nem busca de tarefas.

- O sistema não trata concorrência no arquivo tasks.json (em acessos simultâneos).

- Validações simples (apenas título e status).

### 🚧 Melhorias Futuras
- Implementar autenticação JWT e associação de tarefas por usuário.

- Adicionar testes automatizados (Go e Jest).

- Adicionar notificação visual (toast) para feedbacks de sucesso/erro.

- Persistência em banco de dados real (SQLite ou PostgreSQL).

- Containerização com Docker.

### 🧾 Documentação
Documento	Descrição
User Flow	Mostra o passo a passo de interação do usuário no sistema.

### 💻 Autor
Kevin Lopes Costa
📍 Terenos - MS
💻 Estudante de Sistemas para Internet (FAM)
📧 Contato: kevinlopes3012@gmail.com

### 🏁 Licença
Este projeto foi desenvolvido exclusivamente para fins acadêmicos e de avaliação técnica.
Sinta-se à vontade para utilizá-lo como referência educacional.

✨ Desenvolvido com React + Go (Gin Gonic) e muito café ☕
