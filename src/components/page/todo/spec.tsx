import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import ToDoPage from "./ToDoPage";
import { findByTestAtrr } from "utils/unittest";

const init = (props={}) => {
  const component = shallow(<ToDoPage history={null}/>);
  return component;
};

describe("Todopage Component", () => {
  let component: ShallowWrapper;

  beforeEach(()=>{
    component = init();
  })

  it("Should render without errors", () => {
    const wrapper = findByTestAtrr(component, 'ToDo');
    expect(wrapper.length).toBe(1)
  });

});
