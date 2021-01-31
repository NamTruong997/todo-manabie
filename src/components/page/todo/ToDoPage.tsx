import iconClose from "assets/images/icon-close.png";
import { Modal } from "components/common/modal/Modal";
import { Todo, TodoStatus } from "models/todo";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import Service from "service";
import { createTodo, setTodos, updateTodo } from "store/actions";
import reducer, { initialState } from "store/reducer";
import ToDoList from "./todoList/TodoList";
import TodoToolbar from "./todoToolbar/TodoToolbar";
import "./ToDoPage.scss";

export interface ModalDataType {
  show: boolean;
  todo: Todo | null;
}

const ToDoPage = ({ history }: RouteComponentProps | any) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<TodoStatus>(TodoStatus.ALL);
  const [modal, setModal] = useState<ModalDataType>({
    show: false,
    todo: null,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  // FIXME: Init local storage. If storage have some old data => Binding data to React store
  useEffect(() => {
    let dataStored = localStorage.getItem("todos") || "";

    if (dataStored.length) {
      dispatch(setTodos(JSON.parse(dataStored) as Todo[]));
    } else {
      localStorage.setItem("todos", "");
    }
  }, []);

  // When todos change => Logging data into Local Storage
  useEffect(() => {
    if (todos.length) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      localStorage.setItem("todos", "");
    }
  }, [todos]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    //OPTIMIZE: Check empty value of input
    if (
      e.key === "Enter" &&
      inputRef.current &&
      inputRef.current.value.length
    ) {
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        dispatch(createTodo(resp));
        inputRef.current.value = "";
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/");
        }
      }
    }
  };

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  // FIXME: For the meantime, updateTodo is not async function. So, this codes belows still working fine.
  // Need to impove in the future.
  const onEditTodo = () => {
    dispatch(updateTodo(modal.todo!));
    setModal({ todo: null, show: false });
  };

  return (
    <section data-test="ToDo">
      <h2 className="ToDo__header">TODO APP</h2>
      <div className="ToDo__container">
        <div className="Todo__creation">
          <input
            ref={inputRef}
            className="Todo__input"
            autoFocus
            placeholder="What need to be done?"
            onKeyDown={onCreateTodo}
          />
        </div>
        {/* Should move this section on top to improve UX.
            When the list is empty it is not necessary to display
        */}
        {todos.length > 0 && (
          <TodoToolbar
            todos={todos}
            dispatch={dispatch}
            filterByType={setShowing}
          />
        )}
        <ToDoList todos={showTodos} dispatch={dispatch} setModal={setModal} />

        {/* Modal popup */}
        <Modal
          isOpen={modal.show}
          onBackClick={() => setModal({ show: false, todo: null })}
          onKeyEcs={() => setModal({ show: false, todo: null })}
        >
          <img
            src={iconClose}
            loading="lazy"
            alt="close"
            className="modal__iconClose"
            onClick={() => setModal({ show: false, todo: null })}
          />

          <h3 className="modal__title">Edit todo</h3>
          <div className="modal__wraper">
            <input
              autoFocus
              value={modal.todo?.content}
              onChange={(e) => {
                setModal({
                  show: true,
                  todo: { ...modal.todo!, content: e.target.value },
                });
              }}
              onKeyDown={(
                e: React.KeyboardEvent<HTMLInputElement> &
                  React.ChangeEvent<HTMLInputElement>
              ) => {
                if (e.key === "Enter" && e.target.value.length) {
                  onEditTodo();
                }
              }}
              className="Todo__input"
            />
            <button className="Action__btn" onClick={onEditTodo}>
              Edit
            </button>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default ToDoPage;
