import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

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
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const showNotification = (message, isError = false) => {
    setMessage(message);
    setError(isError);
    setShow(true);
    setTimeout(() => {
      setMessage(null);
      setShow(false);
    }, 5000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const matchedPerson = persons.find((person) => person.name === newName);
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
            showNotification(`${newName}'s number changed `);
          })
          .catch(() => {
            showNotification(
              `Information of ${newName} has already been removed from server `,
              true
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
          showNotification(`${newName} added`);
        })
        .catch((error) => {
          showNotification(error.response.data.error);
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

  return (
    <div>
      <h2>Phonebook</h2>
      {show ? <Notification message={message} error={error} /> : null}
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
