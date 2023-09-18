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

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const person = { name: body.name, number: body.number };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedName) => response.json(updatedName))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  debugger;
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      res.send(person);
    })
    .catch((error) => {
      next(error);
    });
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

app.get("/info", (req, res, next) => {
  const currentTime = new Date();
  Person.countDocuments({})
    .then((count) => {
      res.send(`
  <p>Phonebook has info for ${count} people</p>
  <p>${currentTime}</p>
  `);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
