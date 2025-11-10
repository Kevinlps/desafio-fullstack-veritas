import { useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard";
import { useTaskManager } from "./hooks/useTaskManager";

function App() {
  const {
    tasks,
    loading,
    showForm,
    title,
    description,
    editingTask,
    setTasks,
    setShowForm,
    setTitle,
    setDescription,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    startEditing,
    resetForm,
  } = useTaskManager();

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  if (loading) return <div className="p-8 text-center">Carregando...</div>;

    return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Kanban Veritas</h1>
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
                onClick={editingTask ? updateTask : createTask}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {editingTask ? 'Atualizar' : 'Criar'}
              </button>
              <button
                onClick={resetForm}
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
          onEdit={startEditing}
        />
      </div>
    </div>
  );
}

export default App;
