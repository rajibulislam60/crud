import React, { useState } from 'react'
import { getDatabase, ref, set } from "firebase/database";

const App = () => {
  let [task, setTask] = useState('')

  let handleTask =(e)=>{
    setTask(e.target.value);
  }

  let handleSubmit =()=>{
    const db = getDatabase();
    set(ref(db, 'todo/'), {
      name: task,
    }).then(()=>{
      alert('task added')
    })
  }
  return (
    <div className='text-center w-[600px] mx-auto'>
      <h1 className='text-[24px] font-semibold'>To Do List</h1>
      <input onChange={handleTask} type="text" placeholder='List item....' className='border text-[24px] mt-3' /><br />
      <button onClick={handleSubmit} className='border rounded-[6px] text-[18px] px-4 py-1 mt-3'>SUBMIT</button>
    </div>
  )
}

export default App