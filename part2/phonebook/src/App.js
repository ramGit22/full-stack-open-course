import { useEffect, useState } from "react";
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
      person.name.toLowerCase().includes(filterText.toLowerCase())
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
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} already added to phonebook`);
      setNewName("");
      return;
    }
    personServices
      .create({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      })
      .then((response) => {
        setPersons(persons.concat(response.data));
      });

    setNewName("");
    setNewNumber("");
  };

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
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
