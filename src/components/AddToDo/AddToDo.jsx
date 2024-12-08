import {useState} from 'react';
import axios from 'axios'


function AddToDo ({AddOn}) {

  const [ todoText, setTodoText ] = useState('');

  const todoPost = () =>{
    
    const [todoStatus, setTodoStatus] = useState(false);

    let todoPosting = {
      text: todoText,
      isComplete: todoStatus
    }
    axios({
      method: "POST",
      url: "/api/todo",
      data: todoPosting
    })
      .then((response) => {
        console.log("POST worked! Woot woot")
      
       FetchToDo();
       setTodoText("");
        
      })
      .catch((error) => {
        console.error("POST /api/todo is broken",error)

      })
  }

  return (
    <div>
      <input id='todo' onChange={(e)=>setTodoText(e.target.value)} type="text" placeholder='To-Do' />
      <button onClick={AddToDo}>Add</button>
    </div>
  );

}

export default AddToDo