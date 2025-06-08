// models/todo.js
"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const od = await Todo.overdue();
      od.map((task) => console.log(task.displayableString()));

      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const dt = await Todo.dueToday();
      dt.map((task) => console.log(task.displayableString()));

      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const dl = await Todo.dueLater();
      dl.map((task) => console.log(task.displayableString()));
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const today = new Date().toISOString().split("T")[0];
      const od = await Todo.findAll(
        {
          where: {
            dueDate: {
              [Op.lt]: today,
            },
          },
        },
        {
          order: [["id", "ASC"]],
        },
      );
      return od;
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const today = new Date().toISOString().split("T")[0];
      const dt = await Todo.findAll(
        {
          where: {
            dueDate: today,
          },
        },
        {
          order: [["id", "ASC"]],
        },
      );
      return dt;
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const today = new Date().toISOString().split("T")[0];
      const dl = await Todo.findAll(
        {
          where: {
            dueDate: {
              [Op.gt]: today,
            },
          },
        },
        {
          order: [["id", "ASC"]],
        },
      );
      return dl;
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      await Todo.update(
        {
          completed: true,
        },
        {
          where: {
            id: id,
          },
        },
      );
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
