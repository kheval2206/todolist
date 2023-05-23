import React, { useState } from 'react';
import './App.css';
import Todolist, { TaskType } from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all'| 'completed' | 'active' 

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: 'HTML', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'React', isDone: false},
    {id: v1(), title: 'CSS', isDone: true}
  ])

  let [filter, setFilter] = useState<FilterValuesType>('all') ;

  function removeTask (id: string) {
    let filteredTasks = tasks.filter ((t) => t.id !== id);
    setTasks (filteredTasks)
  }

  let tasksForTodoList  = tasks;
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter ((t) => t.isDone === true)
  }
  if (filter === 'active') {
    tasksForTodoList = tasks.filter ((t) => t.isDone === false)
  }

  function changeFilter (value: FilterValuesType) {
    setFilter(value)
  }

  function addTask (title: string) {
    let newTask = {id: v1(), title: title, isDone: true}
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  function changeStatus (taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    setTasks([...tasks])
  }

  return (
    <div className="App">
      <div>
        <Todolist 
        title = 'What to learn?' 
        tasks = {tasksForTodoList}
        removeTask = {removeTask}
        changeFilter = {changeFilter}
        addTask = {addTask}
        changeTaskStatus = {changeStatus}
        filter = {filter}
        />
      </div>
    </div>
  );
}

export default App;
