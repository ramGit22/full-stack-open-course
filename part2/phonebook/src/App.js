import { useEffect, useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

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
    setPersons([
      ...persons,
      { name: newName, number: newNumber, id: persons.length + 1 },
    ]);

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilterChange} />
      </div>
      <br />

      <div>
        <h2>Add a new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            name: <input value={newName} onChange={handleNameChange} />{" "}
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>

      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person) => (
          <div key={person.id}>
            {person.name} {person.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
