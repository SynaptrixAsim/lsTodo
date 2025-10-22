import React, { useState, useEffect } from "react";
import { FaNotesMedical } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showfinished, setshowfinished] = useState(false);

  useEffect(() => {
    let savetodos = localStorage.getItem("todos");
    if (savetodos) {
      let loadtodos = JSON.parse(savetodos);
      setTodos(loadtodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const togglefinished = (e) => {
    setshowfinished(!showfinished);
  };

  const handleAdd = () => {
    const newtodo = {
      id: uuidv4(),
      todo: todo,
      isComplete: false,
    };
    setTodos([...todos, newtodo]);
    setTodo("");
  };

  const handleEdit = (id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newtodos);
  };

  const handleDelete = (id) => {
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    console.log(newtodos);
    setTodos(newtodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newtodos = [...todos];
    newtodos[index].isComplete = !newtodos[index].isComplete;
    setTodos(newtodos);
  };

  return (
    <div className="w-1/2 bg-purple-100 mx-auto top-full p-4 rounded-2xl max-lg:w-[80%] max-md:w-[95%]">
      <div className="todo text-center font-bold text-2xl flex flex-col align-middle gap-3">
        <span>To Do</span>
        <div className="newtodo text-lg w-full mx-auto font-normal text-white flex justify-evenly align-middle gap-1">
          <input
            type="text"
            className="w-3/4 outline-none bg-white rounded-lg text-purple-700 py-1 px-2 shadow-2xl focus:shadow-purple-600 focus:border-2"
            onChange={handleChange}
            name={todo}
            value={todo}
          />
          <button
            className="bg-purple-800 px-4 py-1 rounded-lg disabled:cursor-default hover:font-bold hover:bg-purple-900 cursor-pointer"
            onClick={handleAdd}
            disabled={todo.length < 2}
          >
            <FaNotesMedical />
          </button>
        </div>

        <div className="font-normal mt-3 text-lg text-purple-900 flex gap-2 relative left-0 w-fit px-2 py-1">
          <input
            type="checkbox"
            name={todos.id}
            onChange={togglefinished}
            checked={showfinished}
          />
          <span>Show Finished</span>
        </div>

        <div className="w-full h-[2px] bg-purple-800"></div>
      </div>

      {todos.length === 0 && (
        <div className="text-center m-6 text-3xl font-bold text-purple-800">
          No ToDo Availabel!
        </div>
      )}
      {todos.map((item) => {
        return (
          (showfinished || !item.isComplete) && (
            <div
              key={item.id}
              className="todos w-[95%] mt-5 mx-4 border-b-2 py-1 border-purple-500 text-slate-700 text-lg flex justify-between align-middle"
            >
              <input
                type="checkbox"
                onChange={handleCheckbox}
                name={item.id}
                checked={item.isComplete}
              />
              <div
                className={`${
                  item.isComplete ? "line-through" : ""
                } w-3/4 ml-4 wrap-anywhere`}
              >
                {item.todo}
              </div>
              <div className="btn mx-1 pl-2 flex gap-3 text-white">
                <button
                  className="bg-purple-800 h-fit py-3 px-3.5 rounded-lg hover:font-bold hover:bg-purple-950 cursor-pointer"
                  onClick={() => {
                    handleEdit(item.id);
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-purple-800 h-fit py-3 px-3.5 rounded-lg hover:font-bold hover:bg-purple-950 cursor-pointer"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default Todo;
