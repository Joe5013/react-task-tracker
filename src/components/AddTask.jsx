import { useState } from 'react';

const AddTask = ({ onAdd }) => {
  //onAdd is a parameter prop passing addTask function from App component
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    // onSubmit runs when the Save Task button is clicked
    e.preventDefault(); // prevents the default form submission behavior (page reload)

    if (!text) {
      alert('Please add a task');
      return;
    }

    if (!day) {
      alert('Please add a day and time');
      return;
    }

    onAdd({ text, day, reminder }); //onAdd={addTask} function from App component
    // thus text, day, and reminder are passed to addTask function
    // thus setTasks updates the tasks array now includes the new task object

    // Clear the form fields after submission
    setText('');
    setDay('');
    setReminder(false);
  };

  return (
    //return renders the on screen form
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
