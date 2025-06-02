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
  beforeAll(() => {
    add({
      title: "Submit assignment",
      dueDate: today,
      completed: false,
    });
  });

  test("Add test", () => {
    add({
      title: "Submit assignment",
      dueDate: yesterday,
      completed: false,
    });
    expect(all.length).toBe(2);
  });

  test("mark test", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("overdue test", () => {
    expect(overdue().length).toBe(1);
  });

  test("dueToday test", () => {
    expect(dueToday().length).toBe(1);
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
