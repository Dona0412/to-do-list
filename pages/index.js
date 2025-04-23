import React, { useState } from 'react';
import styles from './index.module.css'; // Importa los estilos

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Mi Lista de Tareas</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Agregar nueva tarea"
          className={styles.input}
        />
        <button onClick={handleAddTask} className={styles.addButton}>Agregar</button>
      </div>
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id} className={styles.taskItem}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
              className={styles.checkbox}
            />
            <span className={`${styles.taskText} ${task.completed ? styles.completed : ''}`}>
              {task.text}
            </span>
            <button onClick={() => handleDeleteTask(task.id)} className={styles.deleteButton}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )};