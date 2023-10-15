import logo from './logo.svg';
import './App.css';
import { useState } from "react";



function App() {

  const [getTasks, setTasks] = useState([]);

  const [newCompletedTask, setNewCompletedTask] = useState(false);
  const [newPendingTask, setNewPendingTask] = useState(false);
  const [getError, setError] = useState(false);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  
  const [index, incrementIndex] = useState(0);

  function addPendingTask(event)
  {
    event.preventDefault();
    if (taskTitle === '' || taskDescription === '')
    {
      console.log("error\n");
      setError(true);
      return ;
    }
    incrementIndex(index + 1);
    const newTask = { id: index, 
                      title: taskTitle, 
                      description: taskDescription,
                      status: 'pending'
                    }
    setTasks([...getTasks ,newTask]);
    changeStateNewTask('pending');
    resetValue(setTaskTitle, setTaskDescription);
    return ;
  }

  function addCompletedTasks(event)
  {
    event.preventDefault();
    if (taskTitle === '' || taskDescription === '')
    {
      console.log("error\n");
      setError(true);
      return ;
    }
    incrementIndex(index + 1);
    const newTask = { id: index, 
                      title: taskTitle, 
                      description: taskDescription,
                      status: 'completed'
                    }
    setTasks([...getTasks ,newTask]);
    changeStateNewTask('completed');
    resetValue(setTaskTitle, setTaskDescription);
    return ;
  }

  function getTaskTitle(value)
  {
    setTaskTitle(value.target.value);
    console.log(taskTitle);
    return ;
  }

  function getTaskDescription(value)
  {
    setTaskDescription(value.target.value);
    console.log(taskDescription);
    return ;
  }

  function changeStateNewTask(sectionValue)
  {
    if (sectionValue === 'pending')
      setNewPendingTask(!newPendingTask);
    else
      setNewCompletedTask(!newCompletedTask)
    resetValue();
    return ;
  }

  function changeStateNewCompletedTask()
  {
    setNewCompletedTask(!newCompletedTask);
    setError(false);
    console.log(newCompletedTask);
    return ;
  }

  function resetValue()
  {
    setError(false);
    setTaskTitle('');
    setTaskDescription('');
    return ;
  }

  function changeTaskStatut(id, nouvelleValeur)
  {
    const nouveauxTasks = getTasks.map(task =>
      task.id === id ? { ...task, status: nouvelleValeur } : task
    );
    setTasks(nouveauxTasks);
    console.table(getTasks);
    return ;
  }

  const deleteElementById = (id) => {
    const nouveauxTasks = getTasks.filter(task => task.id !== id);
    setTasks(nouveauxTasks);
  };

  return ( 
    <div className="App">
      <div className="title">Task Manager</div>
      <div className="section-container">

        <div className="section">
          <div className="section-title">Pending <img onClick={() => changeStateNewTask('pending')} className="add-task" src={require('./add.png')}></img></div>
          { 
            newPendingTask ?(
              <div className="card">  
                <div className="card-title">
                  <input className="card-title-input" onChange={getTaskTitle} placeholder="Task name" maxLength="20"></input>
                </div>
                <div className="card-description">
                  <input onChange={getTaskDescription} placeholder="Description" className="card-description-input"></input>
                </div>
              {
                getError ?(<div className="error">Error: Empty task name or description.</div>) : (<div></div>)
              }
                <div className="button-container">
                  <div onClick={addPendingTask} className="save-button">Add card</div>
                  <img className="cancel-button" onClick={() => changeStateNewTask('pending')} src={require('./close.png')}></img>
                </div>
              </div>
            ) : ( <div></div> )
          }

          {
            getTasks.filter((task) => task.status === 'pending').map((task) => (
              <div key={task.id} className="card">
                <div className="card-title-container">
                  <b><div className="card-title">{task.title}</div></b>
                  <div className="effect-button-container">
                    <img className="effect-button" onClick={() => changeTaskStatut(task.id, 'completed')} src={require('./done.png')} alt="done"></img>
                    <img className="effect-button" src={require('./delete.png')} onClick={() => deleteElementById(task.id)} alt="delete"></img>
                  </div>
                </div>
                <div className="card-description">{task.description}</div>
              </div>
          ))}
        </div>

        <div className="section">
        <div className="section-title">Completed <img onClick={() => changeStateNewTask('completed')} className="add-task" src={require('./add.png')}></img></div>
          { newCompletedTask ?(
            <div className="card">  
              <div className="card-title">
                <input onChange={getTaskTitle} placeholder="Title" className="card-title-input" maxLength="20"></input>
              </div>
              <div className="card-description">
                <input onChange={getTaskDescription} placeholder="Description" className="card-description-input"></input>
              </div>
              {
                getError ?(<div className="error">Error: Empty task name or description.</div>) : (<div></div>)
              }
              <div className="button-container">
                <div onClick={addCompletedTasks} className="save-button">Add card</div>
                <img className="cancel-button" onClick={() => changeStateNewTask('completed')} src={require('./close.png')}></img>
              </div>
            </div>
          )
          :
          (
            <div></div>
          )}
          {getTasks.filter((task) => task.status === 'completed').map((task) => (
            <div key={task.id} className="card">
              <div className="card-title-container">
              <b><div className="card-title">{task.title}</div></b>
              <div className="effect-button-container">
                <img className="effect-button" onClick={() => changeTaskStatut(task.id, 'pending')} src={require('./undo.png')} alt="done"></img>
                <img className="effect-button" src={require('./delete.png')} onClick={() => deleteElementById(task.id)}   alt="delete"></img>
              </div>
            </div>
            <div className="card-description">{task.description}</div>
    </div>
))}
        </div>
      </div>
    </div>
  );
}

export default App;
