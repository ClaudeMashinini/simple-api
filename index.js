const Sequelize = require("sequelize");
const sequelize = new Sequelize("db", "user", "pass", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});

sequelize.authenticate().then(() => {
  console.log("Success!");
  const Visitors = sequelize.define(
    "visitors",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true
      },
      visitor_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      visitor_age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date_of_visit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      time_of_visit: {
        type: Sequelize.TIME,
        allowNull: false
      },
      assistant: {
        type: Sequelize.STRING,
        allowNull: false
      },
      visit_comments: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      freezelogName: true
    }
  );

  const addNewVisitor = async (
    visitor_name,
    visitor_age,
    date_of_visit,
    time_of_visit,
    assistant,
    visit_comments
  ) => {
    Visitors.sync({ alter: true }).then(function() {
      return Visitors.create({
        visitor_name: visitor_name,
        visitor_age: visitor_age,
        date_of_visit: date_of_visit,
        time_of_visit: time_of_visit,
        assistant: assistant,
        visit_comments: visit_comments
      });
    });
    console.error;
  };

  const viewAll = async () => {
    let array = [];
    await Visitors.findAll({}).then(data => {
      console.log(data);
    });
    console.error;
  };

  const viewVisitor = async id => {
    await Visitors.findAll({
      where: {
        id: id
      }
    }).then(data => {
      console.log(data);
    });
    console.error;
  };

  const deleteVisitor = async id => {
    await Visitors.destroy({
      where: {
        id: id
      }
    }).then(data => {
      console.log("Visitor removed from database");
    });
    console.error;
  };
  const updateVisitor = async (
    id,
    visitor_name,
    visitor_age,
    date_of_visit,
    time_of_visit,
    assistant,
    visit_comments
  ) => {
    await Visitors.update(
      {
        visitor_name: visitor_name,
        visitor_age: visitor_age,
        date_of_visit: date_of_visit,
        time_of_visit: time_of_visit,
        assistant: assistant,
        visit_comments: visit_comments
      },
      {
        where: {
          id: id
        }
      }
    );
    console.error;
  };

  const deleteAll = async () => {
    await Visitors.destroy({
      truncate: true
    }).then(console.log("Database emptied"));
    console.error;
  };

  module.exports = {
    deleteAll: truncate,
    deleteVisitor: remove,
    updateVisitor: update,
    addNewVisitor: add,
    viewVisitor: view1,
    viewAll: view
  };
});
