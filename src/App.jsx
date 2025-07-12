import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Tasks from './components/Tasks.jsx';
import AddTask from './components/AddTask.jsx';
import About from './components/About.jsx';
import React from 'react'; // Required for class-based ErrorBoundary

import PropTypes from 'prop-types';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:3001/tasks');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Fetch tasks failed:', error);
      return [];
    }
  };

  // Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // Add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <ErrorBoundary>
        <div className="container">
          <Header
            title={'Task Tracker'}
            onAdd={() => setShowAddTask(!showAddTask)}
            showAdd={showAddTask}
          />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {showAddTask && <AddTask onAdd={addTask} />}
                  {tasks.length > 0 ? (
                    <Tasks
                      tasks={tasks}
                      onDelete={deleteTask}
                      onToggle={toggleReminder}
                    />
                  ) : (
                    'No Tasks To Show'
                  )}
                </>
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
