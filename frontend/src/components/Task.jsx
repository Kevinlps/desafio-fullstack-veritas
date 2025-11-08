import { Draggable } from '@hello-pangea/dnd';

function Task({ task, index, onDelete, onStatusChange }) {
  const statusConfig = {
    'todo': { label: '📝 A Fazer', color: 'bg-gray-100 text-gray-700 border-gray-300' },
    'in-progress': { label: '⚡ Em Progresso', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    'done': { label: '✅ Concluído', color: 'bg-green-100 text-green-700 border-green-300' }
  };

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white border-2 rounded-lg p-4 mb-3 transition-all ${
            snapshot.isDragging ? 'shadow-2xl rotate-2 border-blue-400' : 'shadow-sm hover:shadow-md border-gray-200'
          }`}
        >
          <h3 className="font-semibold text-gray-800 mb-3">{task.title}</h3>
          
          {task.description && (
            <p className="text-sm text-gray-600 mb-4">{task.description}</p>
          )}

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task, e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className={`flex-1 text-xs font-semibold px-3 py-2 rounded-md border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${statusConfig[task.status].color}`}
            >
              {Object.entries(statusConfig).map(([value, { label }]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-md text-sm transition-all"
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Task;