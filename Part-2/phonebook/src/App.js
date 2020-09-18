import React, { useEffect, useState } from 'react';
import './App.css';
import Filter from './components/filter';
import PersonForm from './components/PersonForm';
import Numbers from './components/Numbers';
import serviceContacts from './services/contacts';

const App = () => {
	const [ persons, setPersons ] = useState([]);
	const [ newName, setNewName ] = useState('');
	const [ newNumber, setNewNumber ] = useState('');
	const [ filteredPersons, setfilteredPersons ] = useState([]);

	useEffect(() => {
		serviceContacts.getAll().then((returnedContacts) => {
			setPersons(returnedContacts);
		});
	}, []);

	// console.log(persons);
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
		const newPerson = {
			name: newName,
			number: newNumber
		};

		//newName repeating check
		let namesArr = persons.map((el) => el.name);
		let newNameCheck = namesArr.includes(newName);

		if (newNameCheck) {
			let nameMatch = persons.find((el) => el.name === newPerson.name);
			let matchId = nameMatch.id;
			// console.log(matchId);
			alert(
				`The name ${newPerson.newName} is alredy added to the phonebook. Do you want to replace it's number?`
			);
			serviceContacts
				.update(matchId, newPerson)
				.then((returnedPerson) => {
					console.log(returnedPerson.name, `Person updated`);
					//refresh persons rendered list
					let updatedPersons = persons.map(
						(el) =>
							el.id === returnedPerson.id
								? { ...returnedPerson }
								: el
					);
					setPersons(updatedPersons);
				})
				.catch((error) => console.log(error));
		} else {
			//post to server
			serviceContacts
				.addContact(newPerson)
				.then((returnedContact) => {
					console.log(returnedContact.name, `Person added`);
					//refresh persons rendered list
					const personsCopy = persons.concat(returnedContact);
					setPersons(personsCopy);
				})
				.catch((error) => console.log(error));
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

	const deleteContactHandler = (id) => {
		const personsCopy = [ ...persons ];
		const newPersons = personsCopy.filter((el) => el.id !== id);
		serviceContacts
			.deleteContact(id)
			.then((res) => {
				console.log(id, `contact deleted`);
				setPersons(newPersons);
			})
			.catch((error) => console.log(error));
	};

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
			<Numbers
				namesToShow={namesToShow}
				deleteNumber={deleteContactHandler}
			/>
		</div>
	);
};

export default App;
