import React, { useState } from 'react';
import './App.css';

const App = () => {
	// const [ persons, setPersons ] = useState([ { name: 'Arto Hellas' } ]);
	const [ persons, setPersons ] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	]);
	const [ newName, setNewName ] = useState('');
	const [ newNumber, setNewNumber ] = useState('');
	const [ filteredPersons, setfilteredPersons ] = useState([]);

	const setNewNameHandler = (event) => {
		let newName = event.target.value;
		setNewName(newName);
	};

	const setNewNumberHandler = (event) => {
		const newNumber = event.target.value;
		setNewNumber(newNumber);
	};

	const addNewContactHandler = (event) => {
		event.preventDefault();
		const personsCopy = persons.concat({
			name: newName,
			number: newNumber
		});

		//newName repeating check
		let namesArr = persons.map((el) => el.name);
		let newNameCheck = namesArr.includes(newName);
		console.log(newNameCheck);

		if (newNameCheck) {
			alert(`The name ${newName} is alredy added to the phonebook`);
		} else {
			setPersons(personsCopy);
		}
	};

	const setFilterHandler = (event) => {
		let newNameFilter = event.target.value;
		let filtered = persons.filter(
			(el) => el.name.toLowerCase() === newNameFilter
		);
		setfilteredPersons(filtered);
	};

	let namesToShow = filteredPersons.length >= 1 ? filteredPersons : persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with: <input onChange={setFilterHandler} />
			</div>
			<h2>add new</h2>
			<form onSubmit={addNewContactHandler}>
				<div>
					name: <input onChange={setNewNameHandler} />
				</div>
				<div>
					number: <input onChange={setNewNumberHandler} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
				<div>debug: {newName}</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{namesToShow.map((el) => (
					<li key={el.name}>
						{el.name} : {el.number}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
