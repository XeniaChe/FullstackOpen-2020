import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

const App = () => {
	const [ countries, setCountries ] = useState([]);

	const [ searchQuery, setSearchQuery ] = useState('');

	const [ showView, setShowView ] = useState({ show: false });

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

	//reset showView condition on query change to search index of pressed el-t in refreshed  filtered countries list
	useEffect(
		() => {
			return setShowView({ show: false });
		},
		[ searchQuery ]
	);

	const setSearchQueryHandler = (event) => {
		let inputData = event.target.value;
		setSearchQuery(inputData);
	};

	//Filter countries after query set
	let filteredCountries = countries.filter((el) =>
		el.name.toLowerCase().includes(searchQuery)
	);

	//Button to Show Country Preview Handler
	const showCountryDetailHandler = (code) => {
		let index = filteredCountries.findIndex(
			(el) => el.numericCode === code
		);
		setShowView({ show: true, code: code, index: index });
	};

	//Country Preview
	let countryView = null;
	if (showView.show && showView.index < filteredCountries.length) {
		countryView = (
			<div>
				<h2>{filteredCountries[showView.index].name} </h2>
				<p>capital: {filteredCountries[showView.index].capital}</p>
				<p>
					population: {filteredCountries[showView.index].population}
				</p>
				<h2>Languages:</h2>

				<ul>
					{filteredCountries[showView.index].languages.map((el) => (
						<li key={el.iso639_1}>{el.name}</li>
					))}
				</ul>
				<img
					src={filteredCountries[showView.index].flag}
					length='150px'
					height='150px'
					alt='country flag'
				/>
			</div>
		);
	}

	//Countries List Render
	let countryList =
		filteredCountries.length > 0 ? (
			<ul>
				{filteredCountries.map((el) => (
					<li key={el.numericCode}>
						{el.name} {' '}
						{searchQuery.length > 0 ? (
							<button
								onClick={() =>
									showCountryDetailHandler(el.numericCode)}
							>
								show
							</button>
						) : null}
						{showView.code === el.numericCode ? countryView : null}
					</li>
				))}
			</ul>
		) : null;

	if (searchQuery.length > 0 && filteredCountries.length > 10) {
		countryList = <p> too many matches, specify another filter</p>;
	}

	//Single Country Render
	let contrySingle =
		filteredCountries.length > 0 && searchQuery.length > 0 ? (
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
