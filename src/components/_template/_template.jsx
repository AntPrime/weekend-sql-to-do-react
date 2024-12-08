import {useState} from 'react';
import axios from 'axios'

function _template () {

  const [ hook, setHook ] = useState('');

  return (
    <div>
      <h1> To-do _template</h1>
    </div>
  );

}

export default _template