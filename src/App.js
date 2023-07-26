import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import TodoiItem from "./components/TodoiItem";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  bg: "h-screen w-screen p-4 bg-gradient-to-r from-blue-500 to-blue-600",
  container:
    "bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4",
  heading: "text-3xl font-bold text-center text-gray-800 p-2",
  form: "flex justify-between items-center h-[70px]",
  input: "border p-2 w-full h-[40px] text-xl rounded-md",
  button:
    "border p-2 ml-2 bg-blue-300 text-slate-100 rounded-full  flex justify-center items-center",
  count: "text-center p-2",
};

function App() {
  //our useState used:
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //créer tache:
  const addTodo = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      texte: input,
      fait: false,
    });
    setInput("");
  };

  //lire tache from db:
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsuscribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArr = [];
      QuerySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsuscribe();
  }, []);
  //maj tache from db
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      fait: !todo.fait,
    });
  };
  //supprimer tache
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={addTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add Todo"
            className={style.input}
          />
          <button className={style.button}>
            <AiOutlinePlus size={20} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <TodoiItem
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
      ``
    </div>
  );
}

export default App;
