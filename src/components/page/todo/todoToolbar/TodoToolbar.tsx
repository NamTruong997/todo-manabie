import { Todo, TodoStatus } from "models/todo";
import React, { SetStateAction } from "react";
import { AppActions, deleteAllTodos, toggleAllTodos } from "store/actions";
import { isTodoCompleted } from "utils";
import "./TodoToolbar.scss";

export interface TodoToolbarProps {
  todos: Todo[];
  filterByType: (type: SetStateAction<TodoStatus>) => void;
  dispatch: React.Dispatch<AppActions>;
}

const TodoToolbar: React.FC<TodoToolbarProps> = (props) => {
  const { todos, filterByType, dispatch } = props;

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <section className="todoToolbar">
      <input
        type="checkbox"
        checked={activeTodos === 0}
        onChange={onToggleAllTodo}
      />
      <div className="todoToolbar__tabs">
        <button
          className="todoToolbar__btn"
          onClick={() => filterByType(TodoStatus.ALL)}
        >
          All
          <span className="todoToolbar__btn--label">{todos.length}</span>
        </button>
        <button
          className="todoToolbar__btn"
          onClick={() => filterByType(TodoStatus.ACTIVE)}
        >
          Active
          <span className="todoToolbar__btn--label">
            {todos.filter((item) => item.status === TodoStatus.ACTIVE).length}
          </span>
        </button>
        <button
          className="todoToolbar__btn"
          onClick={() => filterByType(TodoStatus.COMPLETED)}
        >
          Completed
          <span className="todoToolbar__btn--label">
            {
              todos.filter((item) => item.status === TodoStatus.COMPLETED).length
            }
          </span>
        </button>
        <button
          className="todoToolbar__btn--delete"
          onClick={onDeleteAllTodo}
        >
          Clear all
        </button>
      </div>
    </section>
  );
};

export default TodoToolbar;
