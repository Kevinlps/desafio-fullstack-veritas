export function useTaskConfig() {
  const statusConfig = {
    'todo': { 
      label: ' A Fazer', 
      color: 'bg-gray-100 text-gray-700 border-gray-300' 
    },
    'in-progress': { 
      label: ' Em Progresso', 
      color: 'bg-yellow-100 text-yellow-700 border-yellow-300' 
    },
    'done': { 
      label: ' Concluído', 
      color: 'bg-green-100 text-green-700 border-green-300' 
    }
  };

  const columns = [
    { title: 'A Fazer', id: 'todo' },
    { title: 'Em Progresso', id: 'in-progress' },
    { title: 'Concluído', id: 'done' }
  ];

  return { statusConfig, columns };
}