import React, { useState } from 'react';
import './App.css';

const App = () => {
	const [ persons, setPersons ] = useState([ { name: 'Arto Hellas' } ]);
	const [ newName, setNewName ] = useState('');

	const setNewnameHandler = (event) => {
		let newName = event.target.value;
		setNewName(newName);
	};

	const addNewnameHandler = (event) => {
		event.preventDefault();
		const personsCopy = persons.concat({ name: newName });

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
			<form onSubmit={addNewnameHandler}>
				<div>
					name: <input onChange={setNewnameHandler} />
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
