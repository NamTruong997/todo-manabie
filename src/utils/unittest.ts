import { ShallowWrapper } from "enzyme";
import { Todo, TodoStatus } from "models/todo";

export const findByTestAtrr = (component: ShallowWrapper, attr: string) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const defaultTodo: Todo = {
  id: "1",
  user_id: "abc",
  content: "default",
  status: TodoStatus.ACTIVE,
  created_date: "Date",
};

export const updatedTodo: Todo = {
  id: "1",
  user_id: "abc",
  content: "updated",
  status: TodoStatus.ACTIVE,
  created_date: "DateUpdated",
};
