import React, { useEffect, useState, useCallback } from 'react';
import Todo from './components/Todo';
import useCurrentPage from "./hooks/useCurrentPage";;

const renderTodo = (setTodos, currentPage) =>(todoItem) => {
  return <Todo item={todoItem} setTodos={setTodos} currentPage={currentPage}></Todo>;
}

export async function fetchTodos(currentPage, setTodos){
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${currentPage}&_limit=10`);
  const todoList = await response.json();
  setTodos(todoList);
}

export default function App() {
  const [todos, setTodos] = useState([]);

  const { currentPage, setCurrentPage } = useCurrentPage();

  const navigateToPrevPage = useCallback(() => {
    if(currentPage!=1){
      setCurrentPage(prevPage => prevPage - 1);
    }
  }, currentPage)

  const navigateToNextPage = useCallback(() => {
    if(currentPage!=10){
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [currentPage])


  useEffect(() => {
    fetchTodos(currentPage, setTodos);
  }, [currentPage])

  return (
      <div className="App">
        {
          todos.map(renderTodo(setTodos, currentPage))
        }
        <button onClick={navigateToNextPage}>Next</button>
        <button onClick={navigateToPrevPage}>Prev</button>
      </div>
  );
}
