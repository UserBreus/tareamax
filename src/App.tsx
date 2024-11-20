import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [showPending, setShowPending] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Tareas</h1>
      <div className="flex justify-between mb-4">
        <button
          className="bg-gray-800 hover:bg-gray-900 text-gray-200 font-bold py-1 px-2 rounded-full transition duration-300 ease-in-out mr-4 shadow-md"
          onClick={() => setShowPending(true) & setShowCompleted(false)}
        >
          Pendientes
        </button>
        <button
          className="bg-gray-800 hover:bg-gray-900 text-gray-200 font-bold py-1 px-2 rounded-full transition duration-300 ease-in-out mr-4 shadow-md"
          onClick={() => setShowCompleted(true) & setShowPending(false)}
        >
          Completadas
        </button>
        <button
          className="bg-gray-800 hover:bg-gray-900 text-gray-200 font-bold py-1 px-2 rounded-full transition duration-300 ease-in-out shadow-md"
          onClick={() => setShowPending(false) & setShowCompleted(false)}
        >
          Agregar
        </button>
      </div>
      {(!showPending && !showCompleted) && (
        <div className="mb-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-gray-500"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Agregar tarea"
            rows={3}
          />
          <button
            className="bg-gray-800 hover:bg-gray-900 text-gray-200 font-bold py-1 px-2 rounded-full transition duration-300 ease-in-out shadow-md"
            onClick={addTask}
          >
            Agregar
          </button>
        </div>
      )}
      {showPending && (
        <ul className="list-none mb-4">
          {tasks.filter(task => !task.completed).map(task => (
            <li key={task.id} className="flex items-start mb-2">
              <input
                type="checkbox"
                className="mr-2 mt-1"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className={`text-lg ${task.completed ? 'text-green-500' : 'text-gray-600'} break-all`}>{task.text}</span>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full transition duration-300 ease-in-out ml-4 shadow-md"
                onClick={() => deleteTask(task.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      {showCompleted && (
        <ul className="list-none mb-4">
          {tasks.filter(task => task.completed).map(task => (
            <li key={task.id} className="flex items-start mb-2">
              <input
                type="checkbox"
                className="mr-2 mt-1"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className={`text-lg ${task.completed ? 'text-green-500' : 'text-gray-600'} break-all`}>{task.text}</span>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full transition duration-300 ease-in-out ml-4 shadow-md"
                onClick={() => deleteTask(task.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;