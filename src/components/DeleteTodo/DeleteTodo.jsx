import {useState} from 'react';
import axios from 'axios'

function DeleteTodo ( id, todo ) {
console.log('Deleting...')

const deletedId = {
  id: id
}
  axios({
    method: 'DELETE',
    url: `/api/todo/${id}`,
    data: deletedId
  })
    .then(() => {
      
    })
    .catch((error) => {
      console.log('Error deleting todo', error);
    });

  return (
    <td><button onClick={()=> DeleteTodo(todo.todo.id)}>DELETE</button></td>
  );

}

export default DeleteTodo