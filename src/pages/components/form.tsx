import { useState } from "react";
import { Todo } from "./todos";

type FormProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const Form: React.FC<FormProps> = ({ todos, setTodos }) => {
  const [enteredVal, setEnteredVal] = useState("");

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (enteredVal === "") return;
    const todo = {
      id: Math.random() * 10e5,
      title: enteredVal,
      isCompleted: false,
    };

    setEnteredVal("");

    const newTodos = [...todos, todo];
    setTodos(newTodos);

    window.localStorage.setItem("todos", JSON.stringify(newTodos));
  };
  return (
    <form className="flex gap-2 mt-4" onSubmit={addTodo}>
      <input
        className="border border-black rounded-md flex-1 p-1"
        value={enteredVal}
        onChange={(e) => setEnteredVal(e.target.value)}
      />
      <button className=" border border-black rounded-md bg-gray-200 active:bg-gray-300 px-2 ">
        add
      </button>
    </form>
  );
};

export default Form;
