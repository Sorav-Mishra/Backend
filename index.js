import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// create a tea order
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.send(newTea).status(201);
});

// get all the teas
app.get("/teas", (req, res) => {
  res.send(teaData);
  res.status(200);
});

// get teas with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.status(404).send("tea not found");
  }
  res.status(200).send(tea);
});

// updated tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.status(404).send("Not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// detele tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  console.log(index);
  if (index === -1) {
    return res.status(404).send("Not found");
  }
  teaData.splice(index, 1);
  return res.status(200).send(teaData);
});

app.listen(port, () => {
  console.log(`Sever is running at Port: ${port}`);
});
