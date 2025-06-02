const todoList = require("../todo");

const { all, markAsComplete, add } = todoList();

describe("Todo suite", () => {
  beforeAll(() => {
    add({
      title: "Submit assignment",
      dueDate: "yesterday",
      completed: false,
    });
  });

  test("Add test", () => {
    let x = all.length;
    expect(x).toBe(1);
    add({
      title: "Submit second assignment",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    expect(all.length).toBe(x + 1);
  });

  test("mark test", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
});
