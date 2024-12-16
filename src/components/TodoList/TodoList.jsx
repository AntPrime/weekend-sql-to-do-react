import {useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import AddToDo from '../AddToDo/AddToDo';
import TodoItem from '../TodoItem/TodoItem';

function FetchToDo () {

  const [todoList, setTodoList] = useState([]);
  const [ todoText, setTodoText ] = useState('');

  const fetchTodos = () =>{
    axios({
      method: 'GET',
      url: '/api/todo'
    })
      .then((response) => {
        console.log('Got To-do', response.data);
        setTodoList(response.data);
      })
      .catch((error) => {
        console.log('error in artist get', error);
      });
  };
  
  useEffect(() => {
    fetchTodos();
  }, []);


  return (
    <div>
      <AddToDo AddOn={fetchTodos}/>
      <table>
        <thead>
          <tr>
          <th>To-Do Item</th>
          <th>Status</th>
          <th>Remove</th>
          </tr>
        </thead>
        <tbody>
        {todoList.map((todos,index)=>(
          <TodoItem key={index} todos={todos} fetchTodos={fetchTodos}/> 
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FetchToDo