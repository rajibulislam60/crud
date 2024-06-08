import React, { useEffect, useState } from 'react'
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const App = () => {
  let [task, setTask] = useState('')
  let [allToDo, setAllToDo] = useState([])

  let handleTask =(e)=>{
    setTask(e.target.value);
  }

  let handleSubmit =()=>{
    const db = getDatabase();
    set(push(ref(db, 'todo/')), {
      name: task,
    }).then(()=>{
      setTask('')
      // alert('task added')
    })
  }
  useEffect(()=>{
    const db = getDatabase();
    const todoRef = ref(db, 'todo/');
onValue(todoRef, (snapshot) => {
  let array =[];
  snapshot.forEach((item)=>{
    array.push(item.val())
  });
  setAllToDo(array);
});
  },[])
  console.log(allToDo);
  return (
    <div className='text-center w-[600px] mx-auto mt-[120px] py-[10px] bg-teal-200'>
      <h1 className='text-[24px] font-semibold'>To Do List</h1>
      <input onChange={handleTask} type="text" placeholder='List item....' className='border text-[24px] mt-3' value={task}/><br />
      <button onClick={handleSubmit} className='border rounded-[6px] text-[18px] px-4 py-1 mt-3 bg-green-400 text-white font-semibold'>SUBMIT</button>
      <ul className='w-/100 bg-gray-600 mt-10 text-left px-10 text-white'>
        {allToDo.map((item)=>{
          return <li className='list-disc text-[22px]'>{item.name}</li>
        })}
        
      </ul>
    </div>
  )
}

export default App