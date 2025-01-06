import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.send(newTea).status(201);
});

app.get("/teas", (req, res) => {
  res.send(teaData);
  res.status(200);
});

app.listen(port, () => {
  console.log(`Sever is running at Port: ${port}`);
});
