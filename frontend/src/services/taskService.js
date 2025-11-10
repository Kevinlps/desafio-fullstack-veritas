const API = 'http://localhost:8000';

export const taskService = {
  // Buscar todas as tarefas
  async fetchTasks() {
    const response = await fetch(`${API}/tasks`);
    const data = await response.json();
    
    // Organiza as tarefas por status
    const organized = { todo: [], 'in-progress': [], done: [] };
    data.forEach(task => {
      if (organized[task.status]) {
        organized[task.status].push(task);
      }
    });
    return organized;
  },

  // Criar nova tarefa
  async createTask(title, description) {
    const response = await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, status: 'todo' })
    });
    return await response.json();
  },

  // Atualizar tarefa
  async updateTask(taskId, updatedTask) {
    const response = await fetch(`${API}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    });
    return await response.json();
  },

  // Deletar tarefa
  async deleteTask(taskId) {
    await fetch(`${API}/tasks/${taskId}`, { 
      method: 'DELETE' 
    });
  }
};