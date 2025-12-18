const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./user-model");

const setupDatabaseConnection = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://sj_db_user:HdCbhm46LTTZiZGG@cluster0.ehh0ohd.mongodb.net/"
    );
    console.log("connected to DB");
    const db = mongoose.connection;
    db.once("open", async () => {
      if ((await userModel.countDocuments().exec()) > 0) {
        console.log("users already in db, not adding them anymore");
        return;
      }

      await Promise.all([
        userModel.create({ name: "user1" }),
        userModel.create({ name: "user2" }),
        userModel.create({ name: "user3" }),
        userModel.create({ name: "user4" }),
        userModel.create({ name: "user5" }),
        userModel.create({ name: "user6" }),
        userModel.create({ name: "user7" }),
        userModel.create({ name: "user8" }),
        userModel.create({ name: "user9" }),
        userModel.create({ name: "user10" }),
        userModel.create({ name: "user11" }),
        userModel.create({ name: "user12" }),
        userModel.create({ name: "user13" }),
        userModel.create({ name: "user14" }),
        userModel.create({ name: "user15" }),
        userModel.create({ name: "user16" }),
        userModel.create({ name: "user17" }),
        userModel.create({ name: "user18" }),
        userModel.create({ name: "user19" }),
        userModel.create({ name: "user20" }),
        userModel.create({ name: "user21" }),
        userModel.create({ name: "user22" }),
      ]).then(() => {
        console.log("added users");
      });
    });
  } catch (e) {
    console.log("Error Occured", e);
  }
};

// instead of doing that userModel.create so many times u can also do this
// const users = Array.from({ length: 22 }, (_, i) => ({
//         name: `user${i + 1}`,
//       }));

// await userModel.insertMany(users);
// console.log("Users seeded");





app.get("/users", paginatedResults(userModel), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

  // http://localhost:3000/users?page=1&limit=5
  // to find start Index you do page - 1 * limit
  // to find endIndex ou do page * limit 

    const total = await model.countDocuments();


    if (endIndex < total) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
    } catch (e) {
      console.log("error occured while fetching from DB");
    }

    next();
  };
}

const startServer = async () => {
  await setupDatabaseConnection();

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

startServer();
