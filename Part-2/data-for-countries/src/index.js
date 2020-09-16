import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

const App = () => {
	const [ countries, setCountries ] = useState([]);

	const [ searchQuery, setSearchQuery ] = useState('');

	useEffect(() => {
		const loadData = async () => {
			try {
				let res = await axios.get(
					`https://restcountries.eu/rest/v2/all`
				);
				setCountries(res.data);
			} catch (error) {
				console.log(error.message);
			}
		};
		loadData();
	}, []);

	const setSearchQueryHandler = (event) => {
		let inputData = event.target.value;
		setSearchQuery(inputData);
	};

	let filteredCountries = countries.filter((el) =>
		el.name.toLowerCase().includes(searchQuery)
	);

	const countriesToShow =
		searchQuery.length > 0 ? filteredCountries : countries;

	const countryList =
		searchQuery.length > 0 && filteredCountries.length > 10 ? (
			<p> too many matchs, specify another filter</p>
		) : (
			<ul>
				{countriesToShow.map((el) => <li key={el.name}>{el.name}</li>)}
			</ul>
		);

	const contrySingle =
		searchQuery.length > 0 ? (
			<div>
				<h2>{filteredCountries[0].name} </h2>
				<p>capital: {filteredCountries[0].capital}</p>
				<p>population: {filteredCountries[0].population}</p>
				<h2>Languages:</h2>

				<ul>
					{filteredCountries[0].languages.map((el) => (
						<li key={el.iso639_1}>{el.name}</li>
					))}
				</ul>
				<img
					src={filteredCountries[0].flag}
					length='150px'
					height='150px'
					alt='country flag'
				/>
			</div>
		) : null;

	return (
		<div>
			find countries : <input onChange={setSearchQueryHandler} />
			<div>
				<h2>countries</h2>
				{filteredCountries.length > 1 ? countryList : contrySingle}
			</div>
		</div>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.unregister();
