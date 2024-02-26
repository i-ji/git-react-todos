import { Todo } from "./todos";
type ListProps = {
  todos: Todo[];
  isChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteTodo: (id: number) => void;
};

const List: React.FC<ListProps> = ({ todos, isChanged, deleteTodo }) => {
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <li className="flex justify-between items-start mt-4" key={todo.id}>
            <label>
              <input
                type="checkbox"
                value={todo.id}
                checked={todo.isCompleted}
                onChange={isChanged}
              />
              {todo.isCompleted ? (
                <span className=" line-through text-gray-400">
                  {todo.title}
                </span>
              ) : (
                <span>{todo.title}</span>
              )}
            </label>
            <button
              className=" border border-black rounded-md bg-gray-200 active:bg-gray-300 px-2 "
              onClick={() => deleteTodo(todo.id)}
            >
              x
            </button>
          </li>
        );
      })}
    </ul>
  );
};
export default List;
