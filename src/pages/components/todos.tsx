import { useEffect, useState } from "react";
import List from "./list";
import Form from "./form";

export type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
};

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    let initialTodos: Todo[];

    if (window.localStorage.getItem("todos") === null) {
      initialTodos = [];
    } else {
      initialTodos = JSON.parse(window.localStorage.getItem("todos")!);
    }
    setTodos(initialTodos);
  }, []);

  const isChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toggleTodo = todos.map((todo) => {
      if (todo.id === Number(e.target.value)) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(toggleTodo);
    window.localStorage.setItem("todos", JSON.stringify(toggleTodo));
  };

  const deleteTodo = (id: number) => {
    if (!confirm("Sure")) {
      return;
    }
    const newTodo = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodo);
    window.localStorage.setItem("todos", JSON.stringify(newTodo));
  };

  const purgeTodos = () => {
    const newTodos = todos.filter((todo) => {
      return !todo.isCompleted;
    });
    setTodos(newTodos);
    window.localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <div className=" w-[400px] my-4 mx-auto">
      <h1 className=" text-xl border-b border-gray-200 flex justify-between items-center pb-2">
        Todos
        <button
          className=" border border-black rounded-md bg-gray-200 active:bg-gray-300 px-2 text-xl "
          onClick={purgeTodos}
        >
          Purge
        </button>
      </h1>
      <List todos={todos} isChanged={isChanged} deleteTodo={deleteTodo} />
      <Form todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default Todos;
