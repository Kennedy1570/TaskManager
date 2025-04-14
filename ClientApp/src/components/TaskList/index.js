import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const TaskList = (props) => {
  const [tasks, setTasks] = useState(props.initialTasks || []);
  const [loading, setLoading] = useState(!props.initialTasks);

  useEffect(() => {
    // If we don't have initial tasks, fetch them from the API
    if (!props.initialTasks) {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/Tasks/GetTasksJson');
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 0: return 'badge bg-secondary'; // NotStarted
      case 1: return 'badge bg-primary';   // InProgress
      case 2: return 'badge bg-warning';   // OnHold
      case 3: return 'badge bg-success';   // Completed
      case 4: return 'badge bg-danger';    // Cancelled
      default: return 'badge bg-secondary';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 0: return 'badge bg-secondary'; // Low
      case 1: return 'badge bg-info';      // Medium
      case 2: return 'badge bg-warning';   // High
      case 3: return 'badge bg-danger';    // Urgent
      default: return 'badge bg-secondary';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return (
    <div className="task-list">
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{formatDate(task.dueDate)}</td>
                  <td>
                    <span className={getPriorityBadgeClass(task.priority)}>
                      {['Low', 'Medium', 'High', 'Urgent'][task.priority]}
                    </span>
                  </td>
                  <td>
                    <span className={getStatusBadgeClass(task.status)}>
                      {['Not Started', 'In Progress', 'On Hold', 'Completed', 'Cancelled'][task.status]}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <a href={`/Tasks/Details/${task.id}`} className="btn btn-outline-primary">Details</a>
                      <a href={`/Tasks/Edit/${task.id}`} className="btn btn-outline-secondary">Edit</a>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No tasks available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Check if the mounting point exists in the DOM before rendering
const mountPoint = document.getElementById('react-task-list');
if (mountPoint) {
  // Parse initialTasks data if it exists
  let initialTasks = null;
  if (mountPoint.dataset.tasks) {
    try {
      initialTasks = JSON.parse(mountPoint.dataset.tasks);
    } catch (e) {
      console.error('Error parsing initial tasks data', e);
    }
  }

  ReactDOM.render(<TaskList initialTasks={initialTasks} />, mountPoint);
}

export default TaskList;