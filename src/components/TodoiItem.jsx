import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const style = {
  li: "flex justify-between bg-slate-200 p-4 my-2 capitalize",
  liComplete: "flex justify-between bg-slate-200 p-4 my-2 capitalize",
  row: "flex ",
  checkbox: "cursor-pointer",
  text: " ml-2  ",
  textComplete: "ml-2 line-through ",
  button: "cursor-pointer flex items-center",
};

const TodoiItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={todo.fait ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          type="checkbox"
          onChange={() => toggleComplete(todo)}
          className={style.checkbox}
          checked={todo.fait ? "checked" : ""}
        />
        <p
          onClick={() => toggleComplete(todo)}
          className={todo.fait ? style.textComplete : style.text}>
          {todo.texte}
        </p>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button>
    </li>
  );
};

export default TodoiItem;
