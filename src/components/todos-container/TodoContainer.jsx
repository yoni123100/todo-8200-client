import React from 'react';
import Todo from '../todo/Todo';

const TodoContainer = (props) => {
    return (
        <div>
            {props.todos.map(todo => <Todo key={todo.id} todo={todo} onTodoDelete={() => props.onTodoDelete(todo)} onTodoClick={() => props.eventHandler(todo)}/>)}
        </div>
    );
}

export default TodoContainer;
