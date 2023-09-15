const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("build"));

morgan.token("req-body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status :req-body"));

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  debugger;
  Person.findByIdAndDelete(id).then(() => {
    res.status(204).end();
  });
});

app.get("/info", (req, res) => {
  const currentTime = new Date();
  res.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${currentTime}</p>
  `);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.send(person);
  } else {
    res.status(404).send({ error: "Person not found" });
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const personExist = persons.some((person) => person.id === id);
  const filteredArray = persons.filter((p) => p.id !== id);
  if (personExist) {
    res.send(filteredArray);
  } else {
    res.status(404).send({ error: "Person not found" });
  }
});

// app.post("/api/persons", (req, res) => {
//   const data = req.body;
//   if (data.name === "" || data.number === "") {
//     res.status(404).send({ error: "name or number is missing" });
//   } else if (persons.some((p) => p.name === data.name)) {
//     res.status(404).send({ error: "name already exists" });
//   } else {
//     const newPerson = {
//       id: Math.floor(Math.random() * 1000000),
//       name: data.name,
//       number: data.number,
//     };
//     persons.push(newPerson);
//     res.json(persons);
//   }
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
