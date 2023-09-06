const express = require("express");
const app = express();
const port = 3000;

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
