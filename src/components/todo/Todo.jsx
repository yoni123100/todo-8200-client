import React from 'react';
import { useState } from 'react';
import styles from "./Todo.module.css";

const Todo = (props) => {
    
    const [todo] = useState(props.todo);

    return (
        <div className={styles.todo}>
            <button onClick={() => props.onTodoDelete(todo)} className={styles.button}>Delete</button>
            <h1 className={todo.finished ? styles.finished : styles.unfinished} 
                onClick={() => props.onTodoClick(todo)}>{todo.title}</h1>
        </div>
    )
}
 
export default Todo;
