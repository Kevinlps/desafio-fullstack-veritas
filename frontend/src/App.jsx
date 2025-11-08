import { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';

const API = 'http://localhost:8000';

function App() {
  const [tasks, setTasks] = useState({ todo: [], 'in-progress': [], done: [] });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Buscar tarefas
  useEffect(() => {
    fetch(`${API}/tasks`)
      .then(res => res.json())
      .then(data => {
        const organized = { todo: [], 'in-progress': [], done: [] };
        data.forEach(task => {
          if (organized[task.status]) {
            organized[task.status].push(task);
          }
        });
        setTasks(organized);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Criar nova tarefa
  const createTask = () => {
    if (!title) return;

    fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, status: 'todo' })
    })
      .then(res => res.json())
      .then(newTask => {
        setTasks(prev => ({
          ...prev,
          todo: [...prev.todo, newTask]
        }));
        setTitle('');
        setDescription('');
        setShowForm(false);
      });
  };

  // Excluir tarefa
  const deleteTask = (id, status) => {
    fetch(`${API}/tasks/${id}`, { method: 'DELETE' })
      .then(() => {
        setTasks(prev => ({
          ...prev,
          [status]: prev[status].filter(t => t.id !== id)
        }));
      });
  };

  // Mover tarefa
  const updateTaskStatus = (taskId, movedTask, source, destination) => {
    fetch(`${API}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...movedTask, status: destination.droppableId })
    });
  };
  

  if (loading) return <div className="p-8 text-center">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Kanban Board</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Nova Tarefa
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título da tarefa"
              className="w-full border px-3 py-2 rounded mb-3"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição (opcional)"
              className="w-full border px-3 py-2 rounded mb-3 h-24"
            />
            <div className="flex gap-2">
              <button
                onClick={createTask}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Criar
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setTitle('');
                  setDescription('');
                }}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <KanbanBoard
          tasks={tasks}
          setTasks={setTasks}
          onDelete={deleteTask}
          onUpdate={updateTaskStatus}
        />
      </div>
    </div>
  );
}

export default App;
