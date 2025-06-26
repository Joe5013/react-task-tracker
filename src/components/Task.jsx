import { FaTimes } from 'react-icons/fa';
//use rafce to create a functional component with an export statement

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;

// <<< Simplified version: >>>
// const Task = () => {
//   return (
//     <div className='task'>
//       <h3>My Task</h3>
//     </div>
//   );
// }

// export default Task;
