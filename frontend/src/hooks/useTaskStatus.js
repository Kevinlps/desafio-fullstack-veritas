import { useCallback } from 'react';
import { taskService } from '../services/taskService';

export function useTaskStatus(setTasks) {
  const updateTaskStatus = useCallback(async (task, newStatus) => {
    if (task.status === newStatus) return;

    try {
      await taskService.updateTask(task.id, { ...task, status: newStatus });
      setTasks(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(col => {
          updated[col] = updated[col].filter(t => t.id !== task.id);
        });
        updated[newStatus].push({ ...task, status: newStatus });
        return updated;
      });
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  }, [setTasks]);

  return { updateTaskStatus };
}