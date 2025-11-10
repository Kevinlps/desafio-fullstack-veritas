import { Draggable } from '@hello-pangea/dnd';
import { useTaskConfig } from '../hooks/useTaskConfig';

function Task({ task, index, onDelete, onStatusChange, onEdit }) {
  const { statusConfig } = useTaskConfig();

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white border-2 rounded-lg p-4 mb-3 "
        >
          <h3 className="font-semibold text-gray-800 mb-3">{task.title}</h3>
          
          {task.description && (
            <p className="text-sm text-gray-600 mb-4">{task.description}</p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task, e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className={`flex-1 text-xs font-semibold px-2 py-2 rounded-md border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${statusConfig[task.status].color}`}
            >
              {Object.entries(statusConfig).map(([value, { label }]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 px-2 py-2 rounded-md text-sm transition-all"
              >
                📝Editar
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-2 rounded-md text-sm transition-all"
              >
                🗑️Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Task;