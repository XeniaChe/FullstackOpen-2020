import axios from 'axios';

const baseUrl = 'http://localhost:3003/persons';

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const addContact = (newContact) =>
	axios.post(baseUrl, newContact).then((result) => result.data);

const deleteContact = (id) => axios.delete(`${baseUrl}/${id}`);

const update = (id, newContact) =>
	axios.put(`${baseUrl}/${id}`, newContact).then((result) => result.data);

export default { getAll, addContact, deleteContact, update };
