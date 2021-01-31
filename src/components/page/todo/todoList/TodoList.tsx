import iconDelete from "assets/images/icon-delete.svg";
import { Todo } from "models/todo";
import React from "react";
import { AppActions, deleteTodo, updateTodoStatus } from "store/actions";
import { isTodoCompleted } from "utils";
import { ModalDataType } from "../ToDoPage";
import "./TodoList.scss";

export interface TodoListProps {
  todos: Todo[];
  setModal: (obj: ModalDataType) => void;
  dispatch: React.Dispatch<AppActions>;
}

const ToDoList: React.FC<TodoListProps> = (props) => {
  const { todos, setModal, dispatch } = props;

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  return (
    <>
      <section className="todoList" data-test="todoList">
        {todos.length ? (
          todos.map((todo, index) => (
            <div
              key={index}
              className="todoList__item"
              //Handle DoubleClick for desktop device
              onDoubleClick={(e) => {
                if (window.innerWidth >= 1025) {
                  setModal({ show: true, todo });
                }
              }}
              //Handle click for mobile device
              onClick={(e) => {
                if (window.innerWidth < 1025) setModal({ show: true, todo });
              }}
            >
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <span>{todo.content}</span>
              <img
                src={iconDelete}
                alt="delete"
                className="todoList__delete"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteTodo(todo.id));
                }}
              />
            </div>
          ))
        ) : (
          <div className="todoList__empty" data-test="todoEmpty">
            <h3>Empty list!</h3>
          </div>
        )}
      </section>
      <section className="todoList__description">
        {todos.length ? (
          <p>Double-click on the todo item to edit</p>
        ) : (
          <p>
            Input something that need to be done on the textbox above. Then
            press <b>ENTER</b> to save it.
          </p>
        )}
      </section>
    </>
  );
};

export default ToDoList;
