import React, { useState } from 'react';
import './App.css';

const App = () => {
	const [ persons, setPersons ] = useState([ { name: 'Arto Hellas' } ]);
	const [ newName, setNewName ] = useState('');
	const [ newNumber, setNewNumber ] = useState('');

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
			setPersons([ ...personsCopy ]);
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
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
			<ul>{persons.map((el) => <li key={el.name}>{el.name}</li>)}</ul>
		</div>
	);
};

export default App;
