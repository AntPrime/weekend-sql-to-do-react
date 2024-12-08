import {useState} from 'react';
import axios from 'axios'


function AddToDo ({AddOn}) {

  const [ todoText, setTodoText ] = useState('');
  const [todoStatus, setTodoStatus] = useState(false);

  const todoPost = () =>{
   

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
      
       AddOn();
       setTodoText("");
        
      })
      .catch((error) => {
        console.error("POST /api/todo is broken",error)

      })
      console.log(todoText)
  }

  return (
    <div>
      <input value={todoText} onChange={(e)=>setTodoText(e.target.value)} type="text" placeholder='To-Do' />
      <button onClick={todoPost}>Add</button>
    </div>
  );

}

export default AddToDo