import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

const App = () => {
	const [ countries, setCountries ] = useState([]);

	const [ searchQuery, setSearchQuery ] = useState('');

	const [ showView, setShowView ] = useState({ show: false });

	const [ weatherData, setWeatherData ] = useState({
		data: null,
		loaded: false
	});

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

	//reset showView condition on query change to search index of pressed el-t in the new filtered countries list
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

	//Get weather data handler
	const loadWeatherData = async (location) => {
		const config = {
			access_key: process.env.REACT_APP_API_KEY,
			query: location,
			unit: 'm'
		};
		try {
			const res = await axios('http://api.weatherstack.com/current', {
				params: { ...config }
			});
			console.log(res.statusText);
			if (res.statusText === 'OK') {
				setWeatherData({ data: res.data.current, loaded: true });
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Define the Capital for weather  location
	let singleCountryCapital;
	if (
		searchQuery.length > 0 &&
		filteredCountries.length > 0 &&
		filteredCountries.length <= 1
	) {
		singleCountryCapital = filteredCountries[0].capital;
	}

	//Call weather data handler with location =  country's capital
	useEffect(
		() => {
			loadWeatherData(singleCountryCapital);
		},
		[ singleCountryCapital ]
	);

	//Button  Show Country Preview Handler
	const showCountryDetailHandler = (code) => {
		let index = filteredCountries.findIndex(
			(el) => el.numericCode === code
		);
		setShowView({ show: true, code: code, index: index });
	};

	//Country Preview
	let countryView =
		showView.show && showView.index < filteredCountries.length ? (
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
		) : null;

	//Countries List Render
	let countryList = (
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
	);

	if (searchQuery.length > 0 && filteredCountries.length > 10) {
		countryList = <p> too many matches, specify another filter</p>;
	}

	////Single Country Render
	//wether
	let weather =
		weatherData.loaded && weatherData.data ? (
			<div>
				<p>
					<strong>temperature:</strong> {weatherData.data.temperature}{' '}
					Celsius
				</p>
				<p>
					<strong>Wind:</strong> {weatherData.data.wind_speed}{' '}
					Kilometers/Hour
				</p>
				<p>
					<strong>direction:</strong> {weatherData.data.wind_dir}
				</p>
			</div>
		) : null;
	//main
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
				<h2>Weather in {filteredCountries[0].capital}</h2>

				{weather}
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
