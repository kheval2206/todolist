import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValuesType;
}

export function Todolist(props: PropsType) {

  let [title, setTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      props.addTask(title)
      setTitle('')
    }
  }
  const addTask = () => {
    if (title.trim() !== '') {
      props.addTask(title)
      setTitle('')
    } else {
      setError('Title is required!')
    }
  }
  const onAllClickHandler = () => { props.changeFilter('all') }
  const onCompletedClickHandler = () => { props.changeFilter('completed') }
  const onActiveClickHandler = () => { props.changeFilter('active') }

  return (
    <div>
      <h2>{props.title}</h2>
      <div>
        <input
          className={error ? 'error' : ''}
          value={title}
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressHandler} />
        <button onClick={addTask} >+</button>
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map((t) => {

            const onRemoveHandler = () => { props.removeTask(t.id) }
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked)
            }

            return <li className = {t.isDone ? 'is-done' : ''} key={t.id} >
              <input
                type={"checkbox"}
                onChange={onChangeHandler}
                checked={t.isDone}
              /><span>{t.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          })
        }
        <div>
          <button className = {props.filter === 'all' ? 'active-filter' : ''}  onClick={onAllClickHandler} >all</button>
          <button className = {props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler} >completed</button>
          <button className = {props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler} >active</button>
        </div>
      </ul>
    </div>
  )
}

export default Todolist;