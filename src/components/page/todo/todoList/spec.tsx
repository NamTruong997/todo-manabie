import { shallow, ShallowWrapper } from "enzyme";
import { TodoStatus } from "models/todo";
import React from "react";
import { findByTestAtrr } from "utils/unittest";
import TodoList, { TodoListProps } from "./TodoList";

const init = (props: TodoListProps) => {
  const component = shallow(<TodoList {...props} />);
  return component;
};

describe("TodoList Component", () => {

  describe("Have props", () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      const props: TodoListProps = {
        todos: [
          {
            id: "1",
            user_id: "xyz",
            content: "abc",
            status: TodoStatus.ACTIVE,
            created_date: "test Date",
          },
        ],
        setModal: () => {},
        dispatch: () => {},
      };
      wrapper = init(props);
    });

    it("Should render without errors", () => {
      const component = findByTestAtrr(wrapper, "todoList");
      expect(component.length).toBe(1);
    });

    it("Should not render empty text", () => {
      const emptyElm = findByTestAtrr(wrapper, "todoEmpty");
      expect(emptyElm.length).toBe(0);
    });
  });

});
