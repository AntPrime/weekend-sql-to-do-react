import {useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import AddToDo from '../AddToDo/AddToDo';


function FetchToDo () {

  const [todoList, setTodoList] = useState([]);
  const [todoStatus, setTodoStatus] = useState('Not Done');
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
  
  function DeleteTodo ( id ) {
    
    console.log('Deleting to do with Id:', id)
    
      axios({
        method: 'DELETE',
        url: `/api/todo/${id}`
      })
        .then(() => {
          console.log('Deleted Todo successfully!');
          fetchTodos();
        })
        .catch((error) => {
          console.log('Error deleting todo', error);
        });
      }
    
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
          <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {todoList.map((todo)=>(
             <tr key={todo.id}> 
              <td>{todo.text}</td>
             <td><button>{todoStatus}</button></td>
             <td><button onClick={()=>DeleteTodo(todo.id)}>DELETE</button></td>
             </tr> 
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default FetchToDo