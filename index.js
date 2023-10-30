import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var tasks = [];
var otherTasks = [];
var indexToChange = 0;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    items: tasks,
  });
});

// Handles when a user submits a new task
app.post("/submit", (req, res) => {
  tasks.push(req.body["task"]);
  res.render("index.ejs", {
    items: tasks,
  });
});

// Gets the post of the index the user enters
app.post("/edit", (req, res) => {
  indexToChange = req.body["index"] - 1;
  res.render("index.ejs", {
    items: tasks,
    postBody: tasks[indexToChange],
    taskNumber: req.body["index"],
  });
});

// Edits the post
app.post("/change", (req, res) => {
  tasks[indexToChange] = String(req.body["change"]);
  res.render("index.ejs", {
    items: tasks,
  });
});

// Detects which checkboxes where clicked and deletes them
app.post("/delete", (req, res) => {
  for (let i = tasks.length; i > 0; i--) {
    var toGet = "post" + i;
    if (req.body[toGet] === "on") {
      tasks.splice(i - 1, 1);
    }
  }
  res.render("index.ejs", {
    items: tasks,
  });
});

// Doing all things with the alternative list
app.get("/other", (req, res) => {
  res.render("index2.ejs", {
    items: otherTasks,
  });
});

// Handles when a user submits a new task
app.post("/submitother", (req, res) => {
  otherTasks.push(req.body["otherTask"]);
  res.render("index2.ejs", {
    items: otherTasks,
  });
});

// Gets the post of the index the user enters
app.post("/editother", (req, res) => {
  indexToChange = req.body["otherIndex"] - 1;
  res.render("index2.ejs", {
    items: otherTasks,
    postBody: otherTasks[indexToChange],
    taskNumber: req.body["otherIndex"],
  });
});

// Edits the post
app.post("/changeother", (req, res) => {
  otherTasks[indexToChange] = String(req.body["otherChange"]);
  res.render("index2.ejs", {
    items: otherTasks,
  });
});

// Detects which checkboxes where clicked and deletes them
app.post("/deleteother", (req, res) => {
  for (let i = tasks.length; i > 0; i--) {
    var toGet = "otherPost" + i;
    if (req.body[toGet] === "on") {
      otherTasks.splice(i - 1, 1);
    }
  }
  res.render("index2.ejs", {
    items: otherTasks,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
