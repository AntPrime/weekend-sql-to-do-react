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


  const toggleComplete = (id, currentStatus)=>{
    const updatedStatus = (() => {
      console.log('clicked to update status')
      switch (currentStatus) {
        case true:
          return false;
        case false:
          return true;
        default:
          return false;
      }
    }) ();
    // PUTting axios here 
    axios({
      method:'PUT',
      url:`/api/todo/${id}`,
      data:{isComplete: updatedStatus}
    })
    .then(()=> {
      console.log('Successfully Updated Task');
      fetchTodos();
    }).catch((error)=>{
      console.log('Error updating isComplete', error)
    });
  };
  

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
        {todoList.map((todos)=>(
             <tr key={todos.id}> 
              <td>👉🏾{todos.text} </td>
             <td>
              <button className={`statusButton ${todos.isComplete ? 'complete' : 'incomplete'}`} 
              onClick={() => toggleComplete(todos.id, todos.isComplete)}>
              {todos.isComplete ? '⊠ Complete' : '▢ Incomplete'}</button>
            </td>
             <td><button className='deleteButton' onClick={()=>DeleteTodo(todos.id)}> ❌ 𝔻𝔼𝕃𝔼𝕋𝔼 </button></td>
             </tr> 
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default FetchToDo