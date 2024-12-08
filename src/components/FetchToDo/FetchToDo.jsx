import {useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import AddToDo from '../AddToDo/AddToDo';
import DeleteTodo from '../DeleteTodo/DeleteTodo';

function FetchToDo () {

  const [todoList, setTodoList] = useState([]);
  const [todoStatus, setTodoStatus] = useState('Not Done');
  const [ todoText, setTodoText ] = useState('');

  useEffect(() => {
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
  }, []);


  return (
    <div>
      <AddToDo AddOn={FetchToDo}/>
      <table>
        <thead>
          <tr>
          <th>To-Do Item</th>
          <th>Status</th>
          <th>Delete</th>
          </tr>
        </thead>
        
        {todoList.map((todo)=>(
          <tbody key={todo.id}>
             <tr> 
              <td>{todo.text}</td>
             <td><button>{todoStatus}</button></td>
             <DeleteTodo todo={todo}/>
             </tr> 
             </tbody>
          ))}
        
      </table>
    </div>
  );

}

export default FetchToDo