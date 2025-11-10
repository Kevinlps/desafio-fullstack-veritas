import { useCallback } from 'react';
import { taskService } from '../services/taskService';

export function useKanbanDrag(tasks, setTasks) {
  const onDragEnd = useCallback(async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId && 
        source.index === destination.index) return;

    const taskId = parseInt(draggableId);
    const sourceCol = [...tasks[source.droppableId]];
    const destCol = source.droppableId === destination.droppableId 
      ? sourceCol 
      : [...tasks[destination.droppableId]];

    const [movedTask] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, { ...movedTask, status: destination.droppableId });

    setTasks({
      ...tasks,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    });

    try {
      await taskService.updateTask(taskId, { 
        ...movedTask, 
        status: destination.droppableId 
      });
    } catch (error) {
      console.error('Erro ao mover tarefa:', error);
    }
  }, [tasks, setTasks]);

  return { onDragEnd };
}