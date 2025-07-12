import Task from './Task';
import React from 'react';
import PropTypes from 'prop-types';

const Tasks = ({ tasks, onDelete, onToggle }) => {
  console.log(tasks);
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};
Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onToggle: PropTypes.func,
};

export default Tasks;

// <<< Simplified version: >>>
// import Task from './Task'

// const Tasks = ({tasks}) => {

//   return (
//     <>
//       {tasks.map((task) => (
//         <Task key={task.id} task={task} />
//       ))}
//     </>
//   );
// };
