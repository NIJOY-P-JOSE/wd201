/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
const formattedDate = (d) => d.toISOString().split("T")[0];
const today = formattedDate(new Date());
const yesterday = formattedDate(
  new Date(new Date().setDate(new Date().getDate() - 1)),
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(new Date().getDate() + 1)),
);

describe("Todo suite", () => {
  //beforeAll(() => {
  // const dateToday = new Date();
  //    add({
  //    title: "Submit assignment",
  //  dueDate: new Date(
  //  new Date().setDate(dateToday.getDate() - 1),
  ///      ).toISOString(),
  //   completed: false,
  // });
  // });

  test("Add test", () => {
    let x = all.length;
    expect(x).toBe(0);
    add({
      title: "Submit assignment",
      dueDate: today,
      completed: false,
    });
    expect(all.length).toBe(x + 1);
  });

  test("mark test", () => {
    add({
      title: "Submit second assignment",
      dueDate: today,
      completed: false,
    });
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("overdue test", () => {
    expect(overdue().length).toBe(0);
    add({
      title: "Submit third assignment",
      dueDate: yesterday,
      completed: false,
    });
    expect(overdue().length).toBe(1);
  });

  test("dueToday test", () => {
    console.log(dueToday());
    expect(dueToday().length).toBe(2);
    add({
      title: "Submit fourth assignment",
      dueDate: today,
      completed: false,
    });
    expect(dueToday().length).toBe(3);
  });

  test("dueLater test", () => {
    expect(dueLater().length).toBe(0);
    add({
      title: "Submit fifth assignment",
      dueDate: tomorrow,
      completed: false,
    });
  });
});
