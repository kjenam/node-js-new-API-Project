const express = require("express");

const app = express();

const users = [
  {
    id: 1,
    name: "user1",
  },
  {
    id: 2,
    name: "user2",
  },
  {
    id: 3,
    name: "user3",
  },
  {
    id: 4,
    name: "user4",
  },
  {
    id: 5,
    name: "user5",
  },
  {
    id: 6,
    name: "user6",
  },
  {
    id: 7,
    name: "user7",
  },
  {
    id: 8,
    name: "user8",
  },
  {
    id: 9,
    name: "user9",
  },
  {
    id: 10,
    name: "user10",
  },
  {
    id: 11,
    name: "user11",
  },
];

app.get("/users", (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < users.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.result = users.slice(startIndex, endIndex);

  res.json(results);
});

app.listen(3000);

// i wanna do something like
// http://localhost:3000/users?page=1&limit=5

// done, but if i have another thingy called posts i need to paginate, then ill have to rewrite all this again

// this is why we need a middleware so we can quickly get all this up and running


