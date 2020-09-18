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
	const [ notification, setNotification ] = useState(null);
	const [ actionResult, setActionResult ] = useState('');

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

	const showNotification = (message, actionResult) => {
		setNotification(message);
		setActionResult(actionResult);
		setTimeout(() => {
			setNotification(null);
		}, 2000);
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
			alert(
				`The name ${newPerson.newName} is alredy added to the phonebook. Do you want to replace it's number?`
			);
			serviceContacts
				.update(matchId, newPerson)
				.then((returnedPerson) => {
					//refresh persons rendered list
					let updatedPersons = persons.map(
						(el) =>
							el.id === returnedPerson.id
								? { ...returnedPerson }
								: el
					);
					setPersons(updatedPersons);
					//notification
					showNotification(
						` person '${returnedPerson.name}' successfully updated`,
						'success'
					);
				})
				.catch((error) =>
					showNotification(`an ${error} occured`, 'fail')
				);
		} else {
			//post to server
			serviceContacts
				.addContact(newPerson)
				.then((returnedContact) => {
					console.log(returnedContact.name, `Person added`);
					//refresh persons rendered list
					const personsCopy = persons.concat(returnedContact);
					setPersons(personsCopy);
					//notification
					showNotification(
						` person '${returnedContact.name}' successfully added`,
						'success'
					);
				})
				.catch((error) =>
					showNotification(`an ${error} occured`, 'fail')
				);
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
				setPersons(newPersons);
				showNotification(
					`contact with id number ${id} deleted `,
					'success'
				);
			})
			.catch((error) => {
				showNotification(
					`contact with id number ${id} has already been deleted `,
					'fail'
				);
			});
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
				message={notification}
				actionResult={actionResult}
			/>
		</div>
	);
};

export default App;
