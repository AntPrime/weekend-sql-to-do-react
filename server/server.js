const express = require('express');
const app = express();
const todoRouter = require('./routes/todo.router.js');
const PORT = process.env.PORT || 5001;

// adding Data to align to the DB attributes
const toDoList = [{
    text: "TEXT",
    isComplete: false
  }]

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json()); // needed for axios requests
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/api/todo', todoRouter);
// Adding Get Route
app.get('/todos', (req, res) => {
    console.log(`In /todos GET`);
    res.send(toDoList);
  });
/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});