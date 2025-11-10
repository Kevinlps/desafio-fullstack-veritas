import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';
import { useKanbanDrag } from '../hooks/useKanbanDrag';
import { useTaskStatus } from '../hooks/useTaskStatus';
import { useTaskConfig } from '../hooks/useTaskConfig';

function KanbanBoard({ tasks, setTasks, onDelete, onEdit }) {
  const { onDragEnd } = useKanbanDrag(tasks, setTasks);
  const { updateTaskStatus } = useTaskStatus(setTasks);
  const { columns } = useTaskConfig();

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
            onEdit={onEdit}
            onStatusChange={updateTaskStatus}
          />
        ))}
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;