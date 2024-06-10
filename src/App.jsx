import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";

const App = () => {
  let [task, setTask] = useState("");
  let [allToDo, setAllToDo] = useState([]);
  let [editModal, setEditModal] = useState(false);
  let [updateTask, setUpdateTask] = useState("");
  let [id, setId] = useState("");

  let handleTask = (e) => {
    setTask(e.target.value);
  };

  let handleSubmit = () => {
    const db = getDatabase();
    set(push(ref(db, "todo/")), {
      name: task,
    }).then(() => {
      setTask("");
      // alert('task added')
    });
  };
  useEffect(() => {
    const db = getDatabase();
    const todoRef = ref(db, "todo/");
    onValue(todoRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({ ...item.val(), id: item.key });
      });
      setAllToDo(array);
    });
  }, []);

  let handleDelete = (id) => {
    const db = getDatabase();
    remove(ref(db, "todo/" + id));
  };

  let handleUpdate = (id) => {
    setId(id);
    setEditModal(true);
  };

  let handleUpdateTask = (e) => {
    setUpdateTask(e.target.value);
  };
  let handleUpdateBtn = () => {
    const db = getDatabase();
    update(ref(db, "todo/" + id), {
      name: updateTask,
    }).then(() => {
      setEditModal(false);
    });
  };
  return (
    <div className="text-center w-[600px] mx-auto mt-[120px] py-[10px] bg-teal-200">
      <h1 className="text-[24px] font-semibold">To Do List</h1>
      <input
        onChange={handleTask}
        type="text"
        placeholder="List item...."
        className="border text-[24px] mt-3"
        value={task}
      />
      <br />
      <button
        onClick={handleSubmit}
        className="border rounded-[6px] text-[18px] px-4 py-1 mt-3 bg-green-400 text-white font-semibold"
      >
        SUBMIT
      </button>
      <ul className="w-[100%] bg-gray-600 mt-10 text-left px-10 text-white">
        {allToDo.map((item) => {
          return (
            <li className="list-disc text-[22px] mt-2">
              {item.name}
              <button className="ml-[20px]" onClick={() => handleUpdate(item.id)}>
                <i class="fa-solid fa-file-pen"></i>
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className=" text-white px-2 rounded-full"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </li>
          );
        })}

        {editModal && (
          <div className="w-[600px] absolute top-0 left-2/4 translate-x-[-50%] bg-blue-500 text-center mt-[120px] py-[75px]">
            <button
              onClick={() => setEditModal(false)}
              className="bg-red-500 px-2 rounded-full absolute top-2 right-4"
            >
              X
            </button>

            <input
              onChange={handleUpdateTask}
              type="text"
              placeholder="update task...."
              className="mx-auto text-black text-[24px]"
            />
            <button
              onClick={handleUpdateBtn}
              className="text-[24px] bg-green-500 px-2 mx-3"
            >
              Submit
            </button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default App;
