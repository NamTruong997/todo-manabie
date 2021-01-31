import reducer, { initialState } from "store/reducer";
import { defaultTodo, updatedTodo } from "utils/unittest";
import { CREATE_TODO, DELETE_ALL_TODOS, DELETE_TODO, UPDATE_TODO } from "./actions";

describe("Todo Reducer", () => {
  it("CREATE - Should return new state if receiving type", () => {
    const newState = reducer(initialState, {
      type: CREATE_TODO,
      payload: defaultTodo,
    });
    expect(newState.todos).toEqual([defaultTodo]);
  });

  it("UPDATE - Should return new state with data updated", () => {
    const newState = reducer({todos: [defaultTodo]}, {
      type: UPDATE_TODO,
      payload: updatedTodo,
    });
    expect(newState.todos).toEqual([updatedTodo]);
  });

  it("DELETE - Should return a new state without this data", () => {
    const newState = reducer({todos: [defaultTodo]}, {
      type: DELETE_TODO,
      payload: defaultTodo.id,
    });
     expect(newState.todos).not.toEqual([defaultTodo]);
  });

  it("DELETEALL - Should return a new state which empty data", () => {
    const newState = reducer({todos: [defaultTodo]}, {
      type: DELETE_ALL_TODOS
    });
     expect(newState.todos.length).toBe(0);
  });

});
