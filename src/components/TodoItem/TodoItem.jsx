import {useState} from 'react';
import axios from 'axios'


function TodoItem ({todos, fetchTodos}) {
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
    <tr> 
    <td>👉🏾{todos.text} </td>
   <td>
    <button className={`statusButton ${todos.isComplete ? 'complete' : 'incomplete'}`} 
    onClick={() => toggleComplete(todos.id, todos.isComplete)}>
    {todos.isComplete ? '⊠ Complete' : '▢ Incomplete'}</button>
  </td>
   <td><button className='deleteButton' onClick={()=>DeleteTodo(todos.id)}> ❌ 𝔻𝔼𝕃𝔼𝕋𝔼 </button></td>
   </tr> 
  );

}

export default TodoItem