import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    personServices.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  useEffect(() => {
    const filteredResult = persons.filter((person) =>
      person.name && filterText
        ? person.name.toLowerCase().includes(filterText.toLowerCase())
        : true
    );
    setFilteredPersons(filteredResult);
  }, [filterText, persons]);

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
    console.log(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const matchedPerson = persons.find((person) => person.name === newName);
    console.log("matchedPerson", matchedPerson);
    if (matchedPerson) {
      if (
        window.confirm(
          `${newName} already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personServices
          .update({ ...matchedPerson, number: newNumber })
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === matchedPerson.id ? response.data : person
              )
            );
          });
      }
    } else {
      personServices
        .create({
          name: newName,
          number: newNumber,
          id: uuidv4(),
        })
        .then((response) => {
          setPersons(persons.concat(response.data));
        });

      setNewName("");
      setNewNumber("");
    }
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (personToDelete) {
      if (window.confirm(`Delete ${personToDelete.name}`)) {
        personServices.deletePerson(id).then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        });
      }
    }
  };
  console.log("filteredPersons", filteredPersons);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
