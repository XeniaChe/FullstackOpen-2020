import React, { useEffect, useState } from 'react';
import './App.css';
import Filter from './components/filter';
import PersonForm from './components/PersonForm';
import Numbers from './components/Numbers';
import axios from 'axios';

const App = () => {
	// const [ persons, setPersons ] = useState([ { name: 'Arto Hellas' } ]);
	const [ persons, setPersons ] = useState([]);
	const [ newName, setNewName ] = useState('');
	const [ newNumber, setNewNumber ] = useState('');
	const [ filteredPersons, setfilteredPersons ] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then((res) => {
			console.log(res);
			setPersons(res.data);
		});
	}, []);

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
			<Filter onInput={setFilterHandler} />
			<h2>add new</h2>
			<PersonForm
				submit={addNewContactHandler}
				inputName={setNewNameHandler}
				inputNumber={setNewNumberHandler}
			/>
			<h2>Numbers</h2>
			<Numbers namesToShow={namesToShow} />
		</div>
	);
};

export default App;
