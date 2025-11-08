import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';

const API = 'http://localhost:8000';

function KanbanBoard({ tasks, setTasks, onDelete }) {
  const updateTaskStatus = (task, newStatus) => {
    if (task.status === newStatus) return;

    setTasks(prev => {
      const updated = { ...prev };
      // Remove da coluna antiga
      Object.keys(updated).forEach(col => {
        updated[col] = updated[col].filter(t => t.id !== task.id);
      });
      // Adiciona na nova
      updated[newStatus].push({ ...task, status: newStatus });
      return updated;
    });

    fetch(`${API}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, status: newStatus })
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const taskId = parseInt(draggableId);
    const sourceCol = [...tasks[source.droppableId]];
    const destCol = source.droppableId === destination.droppableId ? sourceCol : [...tasks[destination.droppableId]];

    const [movedTask] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, { ...movedTask, status: destination.droppableId });

    setTasks({
      ...tasks,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    });

    fetch(`${API}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...movedTask, status: destination.droppableId })
    });
  };

  const columns = [
    { title: 'A Fazer', id: 'todo' },
    { title: 'Em Progresso', id: 'in-progress' },
    { title: 'Concluído', id: 'done' }
  ];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(col => (
          <Column
            key={col.id}
            title={col.title}
            id={col.id}
            tasks={tasks[col.id]}
            onDelete={onDelete}
            onStatusChange={updateTaskStatus}
          />
        ))}
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;