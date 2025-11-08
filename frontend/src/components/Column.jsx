import { Droppable } from '@hello-pangea/dnd';
import Task from './Task';

function Column({ title, id, tasks, onDelete, onStatusChange }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b font-bold">{title} ({tasks.length})</div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-4 min-h-[400px]"
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                onDelete={() => onDelete(task.id, id)}
                onStatusChange={onStatusChange}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
