import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import TodoContainer from './todos-container/TodoContainer';

const App = () => {

  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log(process.env);
    fetch(process.env.REACT_APP_API, {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        const newArray = [];
        Object.keys(data).map(item => newArray.push(data[item]));
        setTodos(newArray);
        setLoading(false);
      })
      .catch(error => alert("API not online!"))
  }, []);

  const onTodoListener = (todo) => {
    const newTodos = [...todos];
    newTodos.forEach(todoItem => {if(todoItem.id === todo.id) todoItem.finished = !todoItem.finished});
    setTodos(newTodos);
    
    fetch(`${process.env.REACT_APP_API}/${todo.id}`, {
      method: "PUT",
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({finished: todo.finished})})
     .catch(error => console.log(error));
  };

  const onTodoDelete = (todo) => {
    setTodos(todos.filter(todoItem => todoItem.id !== todo.id));

    fetch(`${process.env.REACT_APP_API}/${todo.id}`, {
      method: "DELETE" })
     .catch(error => console.log(error));
  };

  const onTodoAdd = () => {
    fetch(process.env.REACT_APP_API, {
       method: "POST",
       headers: {'Content-Type': 'application/json',},
       body: JSON.stringify({title: todoInput})})
      .then(response => response.json())
      .then(data => setTodos([...todos, data]))
      .catch(error => console.log(error));
  };

  const renderTopTitle = () => (
    <div>
      <span className="line"/> 
      <label className="title">8200AC TodoList {isLoading ? "- Loading" : ""}</label>
      <span className="line"/>
  
      <input className="todo-input" onChange={event => setTodoInput(event.target.value)} placeholder="Enter your todo here..."></input>
      <button className="insert-button" onClick={onTodoAdd}>Insert Todo</button>
    </div>)

  if(isLoading) return (<div className="App">{renderTopTitle()}</div>);

  return (
    <div className="App">
      {renderTopTitle()}

      <div className="container-splitter">
        <div className="container">
          <label className="container-title">Unfinished Todos</label>
          <TodoContainer eventHandler={onTodoListener} onTodoDelete={onTodoDelete} todos={todos.filter(todo => !todo.finished)}/>
        </div>

        <div className="container">
          <label className="container-title">Finished Todos</label>
          <TodoContainer eventHandler={onTodoListener} onTodoDelete={onTodoDelete} todos={todos.filter(todo => todo.finished)}/>
        </div>
      </div>
    </div>
  );
}

export default App;
