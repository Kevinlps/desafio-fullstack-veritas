import { useState, useCallback } from 'react';
import { taskService } from '../services/taskService';

export function useTaskManager() {
  const [tasks, setTasks] = useState({ todo: [], 'in-progress': [], done: [] });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null); 

  const loadTasks = useCallback(async () => {
    try {
      const data = await taskService.fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async () => {
    if (!title) return;
    
    try {
      const newTask = await taskService.createTask(title, description);
      setTasks(prev => ({
        ...prev,
        todo: [...prev.todo, newTask]
      }));
      setTitle('');
      setDescription('');
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  }, [title, description]);

  const deleteTask = useCallback(async (id, status) => {
    try {
      await taskService.deleteTask(id);
      setTasks(prev => ({
        ...prev,
        [status]: prev[status].filter(t => t.id !== id)
      }));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  }, []);

  const startEditing = useCallback((task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || '');
    setShowForm(true);
  }, []);

  const updateTask = useCallback(async () => {
    if (!title || !editingTask) return;
    
    try {
      const updatedTask = await taskService.updateTask(editingTask.id, {
        ...editingTask,
        title,
        description
      });

      setTasks(prev => ({
        ...prev,
        [updatedTask.status]: prev[updatedTask.status].map(task =>
          task.id === updatedTask.id ? updatedTask : task
        )
      }));

      resetForm();
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  }, [title, description, editingTask]);

  const resetForm = useCallback(() => {
    setShowForm(false);
    setTitle('');
    setDescription('');
    setEditingTask(null);
  }, []);

  return {
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
    startEditing,
    deleteTask,
    resetForm
  };
}
