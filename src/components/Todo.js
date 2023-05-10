import React, { useCallback } from 'react';
import {fetchTodos} from "../App";

const Todo = ({ item, setTodos, currentPage }) => {
    const { title, completed, id } = item;

    // The API call works but the resource is not updated on server. JSONPlaceholder doesn't actually update data on server, src -> https://jsonplaceholder.typicode.com/guide/
    const toggleCompleted = useCallback(async () => {
        const payload = {
            ...item,
            completed : !completed,
        };
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: "PUT", body : JSON.stringify(payload)});
        // Improve and optimize
        await fetchTodos(currentPage, setTodos);
    }, [currentPage, item])

    return (
        <div>
            {title}
            <input type="checkbox" value={completed} onClick={toggleCompleted}></input>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}

export default Todo;