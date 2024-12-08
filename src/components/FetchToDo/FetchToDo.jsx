import {useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios'

function FetchToDo () {

  const [todoList, setTodoList] = useState([]);

  axios({
    method: 'GET',
    url: '/api/todo'
  }).then(function(response) {
    console.log('Got To-do', response.data);
     setTodoList(response.data)
  }).catch(function (error) {
    console.log('error in artist get', error);
  });


  return (
    <div>
      <h1> To-do FetchToDo</h1>
    </div>
  );

}

export default FetchToDo