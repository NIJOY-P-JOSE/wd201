/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todo suite", () => {
  beforeAll(() => {
    const dateToday = new Date();
    add({
      title: "Submit assignment",
      dueDate: new Date(
        new Date().setDate(dateToday.getDate() - 1),
      ).toISOString(),
      completed: false,
    });
  });

  test("Add test", () => {
    let x = all.length;
    expect(x).toBe(1);
    add({
      title: "Submit second assignment",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
    });
    expect(all.length).toBe(x + 1);
  });

  test("mark test", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("overdue test", () => {
    expect(overdue().length).toBe(1);
    const dateToday = new Date();
    add({
      title: "Submit third assignment",
      dueDate: new Date(
        new Date().setDate(dateToday.getDate() - 1),
      ).toISOString(),
      completed: false,
    });
    expect(overdue().length).toBe(2);
  });

  test("dueToday test", () => {
    console.log(dueToday());
    expect(dueToday().length).toBe(1);
    add({
      title: "Submit fourth assignment",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
    });
    expect(dueToday().length).toBe(2);
  });

  test("dueLater test", () => {
    // console.log(dueLater());
    expect(dueLater().length).toBe(0);
    const dateToday = new Date();
    add({
      title: "Submit fifth assignment",
      dueDate: new Date(
        new Date().setDate(dateToday.getDate() + 1),
      ).toISOString(),
      completed: false,
    });
  });
});
